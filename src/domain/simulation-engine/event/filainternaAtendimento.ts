import { Evento } from "../event/evento";
import { Refeitorio } from "../refeitorio";


import { MaquinaEventos } from "../maquinadeeventos";

/**
 * Evento responsável por mover um aluno da fila interna para o atendimento.
 */
export class EventoFilaInternaParaAtendimento extends Evento {
    constructor(refeitorio: Refeitorio, timestamp: number, maquina: MaquinaEventos) {
        super(refeitorio, timestamp, maquina);
    }

    /**
     * Processa o evento, movendo um aluno da fila interna para o atendimento.
     */
    processaEvento(): void {
        console.log(`Processando evento: Aluno movido da fila interna para o atendimento no instante ${this.getTimestamp()}`);
        this.refeitorio.iniciarAtendimento();
    }
}
