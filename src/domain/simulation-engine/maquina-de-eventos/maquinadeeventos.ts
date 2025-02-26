import { Evento } from "../event/evento";

import { Observador } from "../event/observador";  // Importando a classe Observador

export class MaquinaEventos {
    eventos: Evento[] = [];
    instanteDaSimulacao: number;
    observador: Observador = new Observador() // Adicionando o observador

    constructor(instanteInicial: number = 0,) {
        this.instanteDaSimulacao = instanteInicial;
        // Inicializando o observador
    }

    /**
     * Processa todos os eventos da fila de eventos em ordem cronológica.
     */
    processaEventos(): void {
        while (this.eventos.length > 0) {
            // Ordena os eventos pelo timestamp
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
     * Obtém o instante atual da simulação.
     */
    getInstanteAtual(): number {
        return this.instanteDaSimulacao;
    }
}
