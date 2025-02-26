import { Evento } from "./evento";
import { Aluno } from "../system/aluno";

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
     * @param maquina - Máquina que registrou a digitação da matrícula.
     * @param aluno - Objeto Aluno que realizou a digitação.
     */
    constructor(refeitorio, timestamp, maquina, aluno) {
        super(refeitorio, timestamp, maquina);
        this.aluno = aluno;
    }

    /**
     * Processa o evento de digitação da matrícula.
     * Registra a ação no console e delega a lógica de movimentação do aluno para o refeitório.
     */
    processaEvento(): void {
        console.log(`Aluno ${this.aluno.getMatricula()} digitou a matrícula.`);

        // Delega a lógica de passagem pela catraca para o Refeitório
        this.refeitorio.moverAlunoParaFilaInterna();
    }
}
