import { Evento } from "./evento";
import { Aluno } from "../system/aluno";
import { EventoAtendimentoAluno } from "./EventoAtendimentoAluno";

/**
 * Classe que representa um evento de digitação da matrícula por um aluno.
 * Esse evento ocorre quando um aluno insere sua matrícula no sistema para acessar o refeitório.
 */
export class EventoDigitacaoMatricula extends Evento {
    aluno: Aluno;

    /**
     * Construtor da classe EventoDigitacaoMatricula.
     * @param refeitorio - Referência ao refeitório onde o evento ocorre.
     * @param timestamp - Momento em que o evento acontece.
     * @param maquina - Máquina de eventos responsável pelo agendamento.
     * @param aluno - Objeto Aluno que realizou a digitação.
     */
    constructor(refeitorio, timestamp, maquina, aluno) {
        super(refeitorio, timestamp, maquina);
        this.aluno = aluno;
    }

    /**
     * Processa o evento de digitação da matrícula.
     * Registra a ação no console, move o aluno para a fila e agenda o próximo evento de atendimento.
     */
    processaEvento(): void {
        console.log(`Aluno ${this.aluno.getMatricula()} digitou a matrícula.`);

        // Move o aluno para a fila interna
        this.refeitorio.moverAlunoParaFilaInterna();

        // Verifica se a máquina de eventos está disponível
        if (!this.maquinadeeventos) {
            console.error("Erro: máquina de eventos não inicializada.");
            return;
        }

        // Agenda o próximo evento de atendimento do aluno
        const tempoRegistro = this.refeitorio.getTempoRegistro();
        this.maquinadeeventos.adicionaEvento(new EventoAtendimentoAluno(
            this.refeitorio,                 // Referência ao refeitório
            this.timestamp + tempoRegistro,  // Tempo do próximo evento
            this.maquinadeeventos,           // Máquina de eventos
            this.aluno                       // Aluno a ser atendido
        ));

        console.log(`Evento de atendimento agendado para o aluno ${this.aluno.getMatricula()} em ${this.timestamp + tempoRegistro}.`);
    }
}
