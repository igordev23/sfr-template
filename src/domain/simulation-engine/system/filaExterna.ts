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
    adicionarAluno(quantidadeDeAlunos: number): void {
        if (quantidadeDeAlunos <= 0 || isNaN(quantidadeDeAlunos)) {
            throw new Error("Quantidade de alunos inválida. Deve ser um número positivo.");
        }

        for (let i = 0; i < quantidadeDeAlunos; i++) {
            let novoAluno = new Aluno(); // Cria uma nova instância de Aluno
            this.alunos.push(novoAluno); // Adiciona à fila

            // Exibe a mensagem de adição com a data formatada
            console.log(`Aluno adicionado à fila externa. Chegada: ${novoAluno.getArrivalTime().toLocaleString("pt-BR")}`);
        }
    }
    
   
    /**
     * Remove um aluno específico da fila externa.
     * Se a fila estiver vazia, um erro será lançado informando que não há alunos para remover.
     * Se o aluno não for encontrado, um erro será lançado informando que o aluno não está na fila.
     * @param aluno - Instância do aluno a ser removido.
     * @returns Retorna o aluno removido ou `undefined` caso ocorra um erro.
     */
    removerAluno(): Aluno | undefined {
        if (this.alunos.length === 0) {
            console.error("A fila está vazia. Nenhum aluno para remover.");
            return undefined;
        }

        // Ordena a fila com base no arrivalTime e remove o primeiro aluno
        this.alunos.sort((a, b) => a.getArrivalTime() - b.getArrivalTime());
        const alunoRemovido = this.alunos.shift();

        if (alunoRemovido) {
            console.log(`Aluno removido às ${new Date(alunoRemovido.getArrivalTime()).toLocaleString()}`);
        }

        return alunoRemovido;
    }

    /**
     * Lista todos os alunos presentes na fila externa.
     * Exibe a ordem de chegada de cada aluno no console.
     * Se a fila estiver vazia, lança um erro informando que não há alunos na fila.
     */
    listarAluno(): Aluno[] {
        if (this.alunos.length === 0) {
            console.warn("Nenhum aluno na fila.");
        }
        return this.alunos;
    }

    /**
     * Retorna a quantidade total de alunos na fila externa.
     * Se a fila estiver vazia, lança um erro informando que não há alunos na fila.
     * @returns O número total de alunos na fila. Se houver erro, retorna 0.
     */
    quantidadeAluno(): number {
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