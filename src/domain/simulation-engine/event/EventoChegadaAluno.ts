// EventoChegadaAluno.ts
import { Evento } from "./evento";
import { Aluno } from "../system/aluno";
import { EventoDigitacaoMatricula } from "./EventoDigitacaoMatricula";

export class EventoChegadaAluno extends Evento {
    matricula: number;

    constructor(refeitorio, timestamp, maquina, matricula) {
        super(refeitorio, timestamp, maquina);
        this.matricula = matricula;
    }

    processaEvento(): void {
        console.log(`Executando processaEvento para EventoChegadaAluno: ${this.matricula}`);

        if (!this.refeitorio) {
            console.error("Erro: Refeitório não definido.");
            return;
        }

        this.refeitorio.chegadaAluno(this.matricula);
        console.log(`Aluno ${this.matricula} chegou ao refeitório.`);

        if (!this.maquinadeeventos) {
            console.error("Erro: Máquina de eventos não inicializada.");
            return;
        }

        const tempoDigitacao = this.refeitorio.getTMDM();

        console.log(`Agendando EventoDigitacaoMatricula para ${this.matricula} em ${this.timestamp + tempoDigitacao}`);

        this.maquinadeeventos.adicionaEvento(new EventoDigitacaoMatricula(
            this.refeitorio,
            this.timestamp + tempoDigitacao,
            this.maquinadeeventos,
            new Aluno(this.matricula)
        ));
    }
}