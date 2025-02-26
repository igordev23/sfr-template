import { SimulatorI } from "@/adapter/interfaces/simulator-interface";
import { ObservarTamanhoFila } from "./simulation-engine/event/observarTamanhoDaFila";
import { MaquinaEventos } from "./simulation-engine/maquina-de-eventos/maquinadeeventos";
import { Refeitorio } from "./simulation-engine/system/refeitorio";
import { Simulation } from "./data-management/Entities/simulation";
import { SimulationResults, MetricOverTime } from "@/domain/data-management/Entities/simulation-results";

export class Simulador implements SimulatorI {
    refeitorio: Refeitorio;
    maquina: MaquinaEventos;
    simulacao: Simulation;
    private isRunning: boolean = false;
    private intervalId?: number;
    private currentProgress = 0;

    constructor(refeitorio: Refeitorio, maquina: MaquinaEventos) {
        this.refeitorio = refeitorio;
        this.maquina = maquina;
    }

    private configurarObservacaoFilas() {
        const intervaloEntreObservacoes = 10;
        const quantidadeDeObservacoes = Math.floor(this.simulacao.parameters.internalQueueLimit / intervaloEntreObservacoes);

        for (let i = 0; i < quantidadeDeObservacoes; i++) {
            const instanteObservacao = (i + 1) * intervaloEntreObservacoes;
            const observacao = new ObservarTamanhoFila(this.refeitorio, instanteObservacao, this.maquina);
            this.maquina.adicionaEvento(observacao);
        }
    }

    public startSimulation(
        simulation: Simulation,
        onProgressUpdate: (progress: number) => void,
        onError: (error: Error) => void
    ): () => void {
        if (this.isRunning) {
            console.warn("A simulação já está em execução.");
            return () => {};
        }

        this.simulacao = simulation;
        this.simulacao.status = "running";
        this.isRunning = true;
        this.currentProgress = 0;

        this.configurarObservacaoFilas();
        const totalEventos = this.maquina.eventos.length || 1;

        this.intervalId = window.setInterval(() => {
            const progressoReal = Math.floor((this.maquina.eventosProcessados / totalEventos) * 100);
            const novoProgresso = Math.floor(progressoReal / 10) * 10;
            if (novoProgresso > this.currentProgress) {
                this.currentProgress = Math.min(novoProgresso, 99);
                onProgressUpdate(this.currentProgress);
            }
        }, 1000);

        this.executarSimulacao(onProgressUpdate, onError);

        return this.cancelSimulation.bind(this);
    }

    private async executarSimulacao(
        onProgressUpdate: (progress: number) => void,
        onError: (error: Error) => void
    ) {
        try {
            await this.processaEventosComAtraso();
            this.gerarResultados();
            this.finalizarSimulacao(onProgressUpdate);
        } catch (error) {
            this.cancelSimulation();
            onError(error as Error);
        }
    }

    private async processaEventosComAtraso() {
        const totalEventos = this.maquina.eventos.length;
        for (let i = 0; i < totalEventos; i++) {
            await new Promise(resolve => setTimeout(resolve, 1000));
            this.maquina.processaEventos();
        }
    }

    private gerarResultados() {
        const resultadosRaw = this.maquina.observador.computarResultados();
        this.simulacao.results = new SimulationResults(
            resultadosRaw.intertalQueueSizeOverTime.map(({ timestamp, value }: { timestamp: number, value: number }) => new MetricOverTime(timestamp, value)),
            resultadosRaw.externalQueueSizeOverTime.map(({ timestamp, value }: { timestamp: number, value: number }) => new MetricOverTime(timestamp, value)),
            resultadosRaw.tableOccupancyOverTime.map(({ timestamp, value }: { timestamp: number, value: number }) => new MetricOverTime(timestamp, value)),
            resultadosRaw.averageWaitTime,
            resultadosRaw.avgExternalQueue,
            resultadosRaw.avgInternalQueue,
            resultadosRaw.maxTableOccupancy,
            resultadosRaw.simulationDuration,
            resultadosRaw.simulationDurationReal
        );
    }

    private finalizarSimulacao(onProgressUpdate: (progress: number) => void) {
        window.clearInterval(this.intervalId);
        this.simulacao.status = "completed";
        this.simulacao.completedAt = new Date().toISOString();
        this.isRunning = false;
        onProgressUpdate(100);
        console.log("Simulação finalizada com sucesso!", this.simulacao.results);
    }

    private cancelSimulation(): void {
        window.clearInterval(this.intervalId);
        this.isRunning = false;
        this.simulacao.status = "not_started";
        this.currentProgress = 0;
        console.log("Simulação cancelada.");
    
    }
}
