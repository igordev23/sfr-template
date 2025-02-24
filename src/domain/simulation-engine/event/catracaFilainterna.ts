import { MaquinaEventos } from "../maquinadeeventos";
import { Refeitorio } from "../refeitorio";
import { Evento } from "./evento";

export class CatracaFilainterna extends Evento{
    

    constructor(refeitorio: Refeitorio, timestamp: number, maquina: MaquinaEventos){
        super(refeitorio,timestamp,maquina);
    }

    public processaEvento(): void {
        console.log(`Evento - Catraca > Fila Interna ${this.timestamp}`);
        this.refeitorio.processaCatraca();
    }
}