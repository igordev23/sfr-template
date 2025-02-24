import { Evento } from "../event/evento";
import { Refeitorio } from "../refeitorio";

import { MaquinaEventos } from "../maquinadeeventos";

class EventoAtendimentoParaMesa extends Evento {
    constructor(refeitorio: Refeitorio, timestamp: number, maquina: MaquinaEventos) {
        super(refeitorio, timestamp, maquina);
    }

    /**
     * Processa o evento, movendo um aluno do atendimento para a mesa.
     */
    processaEvento(): void {
        console.log(`Processando evento: Aluno movido da fila interna para o atendimento no instante ${this.getTimestamp()}`);
        this.refeitorio.processaAtendimento()
    }
}