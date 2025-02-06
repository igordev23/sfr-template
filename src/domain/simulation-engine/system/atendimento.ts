import { Aluno } from "./aluno"

/**
 * Classe Atendimento
 *
 * Representa um atendimento realizado para um aluno. A classe gerencia o estado do atendimento,
 * o aluno sendo atendido, o tempo médio do atendimento e o status (ativo ou inativo).
 */
class Atendimento {
    aluno: Aluno | undefined; // Aluno atualmente sendo atendido
    tempoMedio: number; // Tempo médio do atendimento em minutos
    status: boolean; // Indica se o atendimento está ativo (true) ou inativo (false)

    /**
     * Construtor da classe Atendimento.
     * Inicializa o tempo médio como 0 e o status como falso (inativo).
     */
    constructor() {
        this.tempoMedio = 0;
        this.status = false;
    }

    /**
     * Define o tempo médio do atendimento.
     * @param tempoMedio - Tempo médio do atendimento em minutos.
     */
    setTempoMedio(tempoMedio: number): void {
        this.tempoMedio = tempoMedio;
    }

    /**
     * Alterna o status do atendimento entre ativo e inativo.
     * @param status - Estado atual do atendimento.
     */
    mudarStatus(status: boolean): void {
        this.status = !status;
    }

    /**
     * Inicia o atendimento para um aluno específico.
     * @param aluno1 - O aluno que deseja ser atendido.
     * @throws Erro caso o aluno informado não esteja sendo atendido ou se não houver aluno para atendimento.
     */
    iniciarAtendimento(aluno1: Aluno): void {
        if (this.aluno != aluno1) {
            throw Error("Este aluno não está sendo atendido.");
        }
        if (this.aluno == undefined) {
            throw Error("Não há aluno para ser atendido.");
        }
        this.mudarStatus(this.status);
        console.log(`O aluno ${JSON.stringify(this.aluno)} está sendo atendido`);
    }

    /**
     * Finaliza o atendimento de um aluno.
     * @param aluno1 - O aluno cujo atendimento será finalizado.
     * @throws Erro caso o aluno informado não esteja sendo atendido ou se não houver aluno sendo atendido.
     */
    finalizarAtendimento(aluno1: Aluno): void {
        if (this.aluno != aluno1) {
            throw Error("Este aluno não está sendo atendido.");
        }
        if (this.aluno == undefined) {
            throw Error("Não há aluno sendo atendido.");
        }
        this.aluno = undefined;
        this.mudarStatus(this.status);
        console.log("Atendimento finalizado.");
    }

    /**
     * Adiciona um aluno ao atendimento.
     * @param aluno1 - O aluno a ser atendido.
     * @throws Erro caso já exista um aluno sendo atendido.
     */
    adicionarAluno(aluno1: Aluno): void {
        if (this.aluno != undefined) {
            throw Error("Existe um aluno sendo atendido.");
        }
        this.aluno = aluno1;
    }

    /**
     * Remove um aluno do atendimento.
     * @param aluno1 - O aluno que será removido.
     * @throws Erro caso o aluno informado não esteja sendo atendido ou se não houver aluno sendo atendido.
     */
    removerAluno(aluno1: Aluno): void {
        if (this.aluno != aluno1) {
            throw Error("Este aluno não está sendo atendido.");
        }
        if (this.aluno == undefined) {
            throw Error("Não há aluno sendo atendido.");
        }
        this.aluno = undefined;
    }
}

