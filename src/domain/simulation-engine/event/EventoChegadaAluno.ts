import { Evento } from "./evento";
import { Aluno } from "../system/aluno";
import { EventoDigitacaoMatricula } from "./EventoDigitacaoMatricula";

/**
 * Classe que representa um evento de chegada de um aluno ao refeitório.
 * Esse evento é disparado quando um aluno chega ao local e deve ser processado pelo sistema.
 */
export class EventoChegadaAluno extends Evento {
    matricula: number;

    /**
     * Construtor da classe EventoChegadaAluno.
     * @param refeitorio - Referência ao refeitório onde o evento ocorre.
     * @param timestamp - Momento em que o evento acontece.
     * @param maquina - Máquina de eventos responsável pelo agendamento.
     * @param matricula - Número de matrícula do aluno que está chegando.
     */
    constructor(refeitorio, timestamp, maquina, matricula) {
        super(refeitorio, timestamp, maquina);
        this.matricula = matricula;
    }

    /**
     * Processa o evento de chegada do aluno.
     * Registra a ação no console, notifica o refeitório sobre a chegada e agenda o próximo evento.
     */
    processaEvento(): void {
        console.log(`Processando evento de chegada do aluno ${this.matricula}`);

        // Notifica o refeitório sobre a chegada do aluno
        this.refeitorio.chegadaAluno(this.matricula);

        // Verifica se o refeitório está definido antes de registrar a chegada
        if (this.refeitorio) {
            console.log(`Aluno ${this.matricula} chegou com sucesso no refeitório.`);
        }

        // Verifica se a máquina de eventos está inicializada antes de continuar
        if (!this.maquinadeeventos) {
            console.error("Erro: máquina de eventos não inicializada.");
            return;
        }

        // Obtém o tempo médio necessário para a digitação da matrícula
        const tempoDigitacao = this.refeitorio.getTMDM();

        // Agenda um novo evento de digitação da matrícula na máquina de eventos
        this.maquinadeeventos.adicionaEvento(new EventoDigitacaoMatricula(
            this.refeitorio,                 // Referência ao refeitório
            this.timestamp + tempoDigitacao, // Timestamp atualizado com o tempo de digitação
            this.maquinadeeventos,           // Máquina de eventos responsável
            new Aluno(this.matricula)        // Criação de um novo objeto Aluno com a matrícula informada
        ));
    }
}
