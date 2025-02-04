import { Aluno } from "./aluno";

export class FilaExterna {
    alunos: Aluno[];

    constructor() {
        this.alunos = [];
    }

    /**
     * Adiciona um novo aluno à fila externa.
     * O aluno é criado no momento da adição e recebe um horário de chegada.
     * Em caso de erro, lança uma exceção informando que a adição falhou.
     */
    adicionarAluno(): void {
        try {
            // Cria uma nova instância da classe Aluno, que representará um aluno na fila.
            const aluno = new Aluno();

            // Adiciona o aluno recém-criado ao array `alunos`.
            this.alunos.push(aluno);

            // Exibe no console a confirmação da adição, incluindo o horário de chegada.
            console.log(`Aluno adicionado às ${aluno.getArrivalTime().toLocaleTimeString()}`);
        } catch (error) {
            // Caso ocorra algum erro no processo de adição, lança uma exceção informando o problema.
            throw new Error("Erro ao adicionar aluno à fila externa.");
        }
    }

    /**
     * Remove um aluno específico da fila externa.
     * Se a fila estiver vazia, um erro será lançado informando que não há alunos para remover.
     * Se o aluno não for encontrado, um erro será lançado informando que o aluno não está na fila.
     * @param aluno - Instância do aluno a ser removido.
     * @returns Retorna o aluno removido ou `undefined` caso ocorra um erro.
     */
    removerAluno(aluno: Aluno): Aluno | undefined {
        try {
            // Verifica se a fila está vazia antes de tentar remover um aluno.
            if (this.alunos.length === 0) {
                throw new Error("A fila está vazia. Nenhum aluno para remover.");
            }

            for (let i = 0; i < this.alunos.length; i++) {
                if (this.alunos[i] === aluno) {
                    console.log(`Aluno removido às ${aluno.getArrivalTime().toLocaleTimeString()}`);
                    return this.alunos.splice(i, 1)[0];
                }
            }

            throw new Error("Aluno não encontrado na fila.");
        } catch (error) {
            // Caso ocorra um erro durante a remoção, exibe a mensagem de erro no console.
            console.error(error);
            return undefined; // Retorna `undefined` para indicar falha na remoção.
        }
    }

    /**
     * Lista todos os alunos presentes na fila externa.
     * Exibe a ordem de chegada de cada aluno no console.
     * Se a fila estiver vazia, lança um erro informando que não há alunos na fila.
     */
    listarAlunos(): void {
        try {
            // Exibe um cabeçalho no console para indicar que os alunos estão sendo listados.
            console.log("Alunos na fila externa:");

            // Verifica se a fila está vazia antes de listar os alunos.
            if (this.alunos.length === 0) {
                throw new Error("Nenhum aluno na fila.");
            }

            for (let i = 0; i < this.alunos.length; i++) {
                console.log(`${i + 1}. Chegada: ${this.alunos[i].getArrivalTime().toLocaleTimeString()}`);
            }
        } catch (error) {
            // Caso ocorra um erro ao listar os alunos, exibe a mensagem de erro no console.
            console.error(error);
        }
    }

    /**
     * Retorna a quantidade total de alunos na fila externa.
     * Se a fila estiver vazia, lança um erro informando que não há alunos na fila.
     * @returns O número total de alunos na fila. Se houver erro, retorna 0.
     */
    quantidadeAlunos(): number {
        try {
            // Verifica se a fila está vazia antes de contar os alunos.
            if (this.alunos.length === 0) {
                throw new Error("A fila está vazia.");
            }

            return this.alunos.length;
        } catch (error) {
            // Caso ocorra um erro, exibe a mensagem de erro no console.
            console.error(error);

            // Retorna `0` para indicar que não há alunos na fila.
            return 0;
        }
    }
}

