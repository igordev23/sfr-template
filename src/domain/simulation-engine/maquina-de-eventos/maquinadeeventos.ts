import { Evento } from "../event/evento";
import { Observador } from "../event/observador";  

export class MaquinaEventos {
    eventos: Evento[] = [];
    instanteDaSimulacao: number;
    observador: Observador = new Observador();
    instanteInicial: number;
    eventosProcessados: number = 0; // Adiciona contador de eventos processados

    constructor(instanteInicial: number = 0) {
        this.instanteInicial = instanteInicial;
        this.instanteDaSimulacao = instanteInicial;
    }

    /**
     * Processa todos os eventos da fila de eventos em ordem cronológica.
     */
    processaEventos(): void {
        while (this.eventos.length > 0) {
            this.eventos.sort((a, b) => a.getTimestamp() - b.getTimestamp());

            const eventoAtual = this.eventos.shift();
            if (eventoAtual) {
                this.instanteDaSimulacao = eventoAtual.getTimestamp();
                eventoAtual.processaEvento();
                this.eventosProcessados++; // Atualiza o contador a cada evento processado
            }
        }

        // Definir duração da simulação ao final do processamento
        this.observador.definirDuracaoSimulacao(this.instanteInicial, this.instanteDaSimulacao);
    }

    /**
     * Adiciona um novo evento à fila de eventos.
     * @param novoEvento O evento a ser adicionado.
     */
    adicionaEvento(novoEvento: Evento): void {
        this.eventos.push(novoEvento);
    }

    /**
     * Obtém o instante atual da simulação.
     */
    getInstanteAtual(): number {
        return this.instanteDaSimulacao;
    }
}
