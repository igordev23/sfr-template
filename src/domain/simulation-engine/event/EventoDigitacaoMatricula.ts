import { Evento } from "./evento";
import { Aluno } from "../system/aluno";


export class EventoDigitacaoMatricula extends Evento {
    aluno: Aluno;

    constructor(refeitorio, timestamp, maquina, aluno) {
        super(refeitorio, timestamp, maquina);
        this.aluno = aluno;
    }

    processaEvento(): void {
        console.log(`Aluno ${this.aluno.getMatricula()} digitou a matrícula.`);

        // Delega a lógica de passagem pela catraca para o Refeitório
        this.refeitorio.moverAlunoParaFilaInterna();
    }
}
