import { Evento } from "./evento";
import { Aluno } from "../system/aluno";

export class EventoLiberacaoMesa extends Evento {
    aluno: Aluno;

    constructor(refeitorio, timestamp, maquina, aluno) {
        super(refeitorio, timestamp, maquina);
        this.aluno = aluno;
    }

    processaEvento(): void {
        console.log(`Aluno ${this.aluno.getMatricula()} terminou a refeição e liberou uma mesa.`);
        
        // Liberar a mesa diretamente, utilizando o método da classe Mesas.
        this.refeitorio.getMesas().liberarMesa();
    }
}
