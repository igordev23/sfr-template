import { Refeitorio } from "../refeitorio";
import { MaquinaEventos } from "../maquinadeeventos";

export abstract class Evento {
    refeitorio: Refeitorio;
    timestamp: number;
    maquinadeeventos: MaquinaEventos;

    constructor(refeitorio: Refeitorio, timestamp: number, maquina: MaquinaEventos) {
        this.refeitorio = refeitorio;
        this.timestamp = timestamp;
        this.maquinadeeventos = maquina;
    }

    getTimestamp(): number {
        return this.timestamp;
    }

    abstract processaEvento(): void;
}
