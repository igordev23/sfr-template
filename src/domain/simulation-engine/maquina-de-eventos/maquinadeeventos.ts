import { Evento } from "./event/evento";

export class MaquinaEventos {
    eventos: Evento[] = [];
    instanteDaSimulacao: number;

    constructor(instanteInicial: number = 0) {
        this.instanteDaSimulacao = instanteInicial;
    }

    /**
     * Processa todos os eventos da fila de eventos em ordem cronológica.
     */
    processaEventos(): void {
        while (this.eventos.length > 0) {
            // Ordena os eventos pelo timestamp (caso tenham sido adicionados fora de ordem)
            this.eventos.sort((a, b) => a.getTimestamp() - b.getTimestamp());

            // Remove e processa o próximo evento
            const eventoAtual = this.eventos.shift();
            if (eventoAtual) {
                this.instanteDaSimulacao = eventoAtual.getTimestamp();
                eventoAtual.processaEvento();
            }
        }
    }

    /**
     * Adiciona um novo evento à fila de eventos.
     * @param novoEvento O evento a ser adicionado.
     */
    adicionaEvento(novoEvento: Evento): void {
        this.eventos.push(novoEvento);
    }

    /**
     * Atualiza o instante da simulação.
     * @param novoInstante O novo instante a ser definido.
     */
    atualizaInstanteDeSimulacao(novoInstante: number): void {
        this.instanteDaSimulacao = novoInstante;
    }
}
