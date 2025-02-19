import { Aluno } from "./aluno";

/**
 * Classe que representa uma Catraca, responsável por controlar a passagem de alunos.
 */
export class Catraca {
    private aluno: Aluno | null = null; // Inicia como null para evitar undefined
    private status: boolean; // Status da catraca (true = aberta, false = bloqueada)
    private tempoMedioDigitacao: number; // Tempo médio de digitação do aluno

    /**
     * Construtor da classe Catraca.
     * @param status - O status inicial da catraca (padrão: aberta).
     * @param tempoMedioDigitacao - Tempo médio de digitação do aluno (padrão: 0 segundos).
     */
    constructor(status: boolean = true, tempoMedioDigitacao: number = 0) {
        this.status = status;
        this.tempoMedioDigitacao = tempoMedioDigitacao;
    }

    /**
     * Obtém o aluno registrado na catraca.
     * @returns O aluno se presente, ou null se não houver aluno.
     */
    getAluno(): Aluno | null {
        return this.aluno;
    }

    /**
     * Obtém o status da catraca.
     * @returns true se a catraca estiver aberta, false se estiver bloqueada.
     */
    getStatus(): boolean {
        return this.status;
    }

    /**
     * Obtém o tempo médio de digitação do aluno.
     * @returns O tempo médio de digitação em segundos.
     */
    getTempoMedioDigitacao(): number {
        return this.tempoMedioDigitacao;
    }

    /**
     * Verifica se há um aluno presente na catraca e exibe uma mensagem no console.
     */
    verificarAluno(): void {
        console.log(this.aluno ? "Aluno presente na catraca" : "Nenhum aluno presente");
    }

    /**
     * Adiciona um aluno à catraca e bloqueia a passagem.
     * Se já houver um aluno registrado, lança um erro.
     * @param aluno - O aluno a ser registrado na catraca.
     * @throws Lança um erro se já houver um aluno na catraca.
     */
    adicionarAluno(aluno: Aluno): void {
        if (!aluno) {
            throw new Error("Aluno inválido.");
        }
        if (this.aluno) {
            throw new Error("Já existe um aluno na catraca");
        }

        this.aluno = aluno;
        this.status = false;
        console.log("Aluno adicionado à catraca. Catraca BLOQUEADA.");
    }

    /**
     * Remove o aluno da catraca e libera a passagem.
     * Se não houver aluno registrado, lança um erro.
     * @throws Lança um erro se não houver aluno para remover.
     */
    removerAluno(): Aluno {
        let alunoNaCatraca: Aluno;
        if (!this.aluno) {
            throw new Error("Não há aluno na catraca, impossível remover.");
        }

        alunoNaCatraca = this.aluno
        console.log("Aluno removido da catraca.");
        this.aluno = null; // Agora a catraca está vazia
        this.status = true; // Catraca desbloqueia ao remover aluno

        console.log("Catraca LIBERADA.");
        return alunoNaCatraca;
    }
}
