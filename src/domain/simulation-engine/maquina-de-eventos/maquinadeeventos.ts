import { Evento } from "../event/evento";
import { Observador } from "../event/observador";  

export class MaquinaEventos {
    eventos: Evento[] = [];
    instanteDaSimulacao: number;
    observador: Observador = new Observador();
    instanteInicial: number;
    eventosProcessados: number = 0;

    constructor(instanteInicial: number = 0) {
        this.instanteInicial = instanteInicial;
        this.instanteDaSimulacao = instanteInicial;
    }

    processaEventos(): void {
        while (this.eventos.length > 0) {
            this.eventos.sort((a, b) => a.getTimestamp() - b.getTimestamp());

            const eventoAtual = this.eventos.shift();
            if (eventoAtual) {
                this.instanteDaSimulacao = eventoAtual.getTimestamp();
                eventoAtual.processaEvento();
                this.eventosProcessados++;

                console.log(`Evento processado: ${eventoAtual.constructor.name}, Tempo: ${this.instanteDaSimulacao}`);
            }
        }

        this.observador.definirDuracaoSimulacao(this.instanteInicial, this.instanteDaSimulacao);
    }

    adicionaEvento(novoEvento: Evento): void {
        this.eventos.push(novoEvento);
    }

    getInstanteAtual(): number {
        return this.instanteDaSimulacao;
    }
}

