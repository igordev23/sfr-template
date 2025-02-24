import { Evento } from "../event/evento";
import { Refeitorio } from "../refeitorio";
import { MaquinaEventos } from "../maquinadeeventos";

/**
 * Evento responsável por mover um aluno da fila externa para a catraca.
 */
export class EventoFilaExternaParaCatraca extends Evento {
    constructor(refeitorio: Refeitorio, timestamp: number, maquina: MaquinaEventos) {
        super(refeitorio, timestamp, maquina);
    }

    /**
     * Processa o evento, movendo um aluno da fila externa para a catraca.
     */
    processaEvento(): void {
        console.log(`Processando evento: Aluno movido da fila externa para a catraca no instante ${this.getTimestamp()}`);
        this.refeitorio.chegadaAluno();
    }
}
