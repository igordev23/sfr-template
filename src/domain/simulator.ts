
import { SimulatorI } from "@/adapter/interfaces/simulator-interface";
import { ObservarTamanhoFila } from "./simulation-engine/event/observarTamanhoDaFila";
import { MaquinaEventos } from "./simulation-engine/maquina-de-eventos/maquinadeeventos";
import { Refeitorio } from "./simulation-engine/system/refeitorio";
import { GaussianRandom, RandomGeneratorI } from "./simulation-engine/util/random-generators";
import { Simulation } from "./data-management/Entities/simulation";


import { SimulationResults } from "@/domain/data-management/Entities/simulation-results";

export class Simulador implements SimulatorI {
    refeitorio: Refeitorio;
    maquina: MaquinaEventos;
    simulacao: Simulation;
    private isRunning: boolean = false;

    constructor(refeitorio: Refeitorio, maquina: MaquinaEventos) {
        this.refeitorio = refeitorio;
        this.maquina = maquina;
    }

    private configurarObservacaoFilas() {
        const intervaloEntreObservacoes = 10;
        const quantidadeDeObservacoes = Math.floor(this.simulacao.parameters.internalQueueLimit / intervaloEntreObservacoes);
    
        for (let i = 0; i < quantidadeDeObservacoes; i++) {
            const instanteObservacao = (i + 1) * intervaloEntreObservacoes;
            console.log(`Instante de observação: ${instanteObservacao}`);
            const observacao = new ObservarTamanhoFila(this.refeitorio, instanteObservacao, this.maquina);
            this.maquina.adicionaEvento(observacao);
        }
    }

    public startSimulation(
        simulation: Simulation,
        onProgressUpdate: (progress: number) => void,
        onError: (error: Error) => void
    ): () => void {
        console.log("Tentando iniciar a simulação. Estado atual:", this.isRunning);
    
        if (this.isRunning) {
            console.warn("A simulação já está em execução.");
            return () => {};
        }
    
        this.simulacao = simulation;
        this.simulacao.status = "running";
        this.isRunning = true;
        console.log("Simulação iniciada!");
    
        try {
            this.configurarObservacaoFilas();
            this.maquina.processaEventos();
            const resultadosRaw = this.maquina.observador.computarResultados();
            
            this.simulacao.results = new SimulationResults(
                resultadosRaw.intertalQueueSizeOverTime,
                resultadosRaw.externalQueueSizeOverTime,
                resultadosRaw.tableOccupancyOverTime,
                resultadosRaw.averageWaitTime,
                resultadosRaw.avgExternalQueue,
                resultadosRaw.avgInternalQueue,
                resultadosRaw.maxTableOccupancy,
                resultadosRaw.simulationDuration,
                resultadosRaw.simulationDurationReal
            );
    
            this.simulacao.status = "completed";
            this.simulacao.completedAt = new Date().toISOString();
            onProgressUpdate(100);
        } catch (error) {
            this.simulacao.status = "not_started";
            onError(error as Error);
        } finally {
            this.isRunning = false;
            console.log("Simulação finalizada ou erro ocorreu. isRunning redefinido para false.");
        }
    
        return () => {
            this.isRunning = false;
            this.simulacao.status = "not_started";
            console.log("Simulação cancelada.");
        };
    }
    
}






