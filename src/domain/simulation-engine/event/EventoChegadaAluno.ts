import { Evento } from "./evento";
import { Aluno } from "../system/aluno";
import { EventoDigitacaoMatricula } from "./EventoDigitacaoMatricula";

export class EventoChegadaAluno extends Evento {
    matricula: number;

    constructor(refeitorio, timestamp, maquina, matricula) {
        super(refeitorio, timestamp, maquina, );
        this.matricula = matricula;
    }

    processaEvento(): void {
        console.log(`Processando evento de chegada do aluno ${this.matricula}`);

        // Chama diretamente o método chegadaAluno do Refeitorio
        this.refeitorio.chegadaAluno(this.matricula);
        if (this.refeitorio) {
            this.maquinadeeventos.observador.observarChegadaAluno
            console.log(`Aluno ${this.matricula} chegou com sucesso no refeitório.`);
        }
        // Verifica se a máquina de eventos está definida
        if (!this.maquinadeeventos) {
            console.error("Erro: máquina de eventos não inicializada.");
            return;
        }

        // Agendar evento de digitação da matrícula na catraca
        const tempoDigitacao = this.refeitorio.getTMDM();
        this.maquinadeeventos.adicionaEvento(new EventoDigitacaoMatricula(
            this.refeitorio,
            this.timestamp + tempoDigitacao,
            this.maquinadeeventos,
            new Aluno(this.matricula)
        ));
    }
}
