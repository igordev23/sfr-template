import { Aluno } from "./aluno"; // Importa a classe Aluno

/**
 * Classe que representa uma Catraca, responsável por controlar a passagem de alunos.
 */
export class Catraca {
    private aluno?: Aluno; // Aluno atualmente na catraca (opcional)
    private status: boolean; // Status da catraca (true = aberta, false = bloqueada)
    private tempoMedioDigitacao: number; // Tempo médio de digitação do aluno

    /**
     * Construtor da classe Catraca.
     * @param aluno - O aluno a ser registrado na catraca (opcional).
     * @param status - O status inicial da catraca (padrão: aberta).
     * @param tempoMedioDigitacao - Tempo médio de digitação do aluno (padrão: 0 segundos).
     */
    constructor(aluno?: Aluno, status: boolean = true, tempoMedioDigitacao: number = 0) {
        this.aluno = aluno;
        this.status = aluno ? false : status; // Se houver aluno, a catraca começa bloqueada
        this.tempoMedioDigitacao = tempoMedioDigitacao;
    }

    /**
     * Obtém o aluno registrado na catraca.
     * @returns O aluno se presente, ou null se não houver aluno.
     */
    getAluno(): Aluno | null {
        return this.aluno ?? null;
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
     * @param aluno - O aluno a ser verificado (não é utilizado dentro do método).
     */
    verificarAluno(aluno: Aluno): void {
        if (this.aluno) {
            console.log("Aluno presente na catraca");
        } else {
            console.log("Nenhum aluno presente");
        }
    }

    /**
     * Adiciona um aluno à catraca e bloqueia a passagem.
     * Se já houver um aluno registrado, lança um erro.
     * @param aluno - O aluno a ser registrado na catraca.
     * @throws Lança um erro se já houver um aluno na catraca.
     */
    adicionarAluno(aluno: Aluno): void {
        if (this.aluno) {
            throw new Error("Já existe um aluno na catraca");
        }
        this.aluno = aluno;
        this.status = false; // Catraca bloqueia ao adicionar aluno
        console.log(`Aluno ${JSON.stringify(aluno)} adicionado à catraca. Catraca BLOQUEADA.`);
    }

    /**
     * Remove o aluno da catraca e libera a passagem.
     * Se não houver aluno registrado, lança um erro.
     * @throws Lança um erro se não houver aluno para remover.
     */
    removerAluno(): void {
        if (!this.aluno) {
            throw new Error("Não há aluno na catraca, impossível remover.");
        }

        console.log(`Aluno ${JSON.stringify(this.aluno)} removido da catraca.`);
        this.aluno = undefined;
        this.status = true; // Catraca desbloqueia ao remover aluno
        console.log("Catraca LIBERADA.");
    }
}
