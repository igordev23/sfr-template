import { Aluno } from "./aluno";

export class FilaInterna {
    private alunos: Aluno[];
    private quantidadeMax: number;
    private quantidadeAtual: number;

    /**
     * Cria uma nova instância da fila interna com uma capacidade máxima definida.
     * @param quantidadeMax - Número máximo de alunos permitidos na fila interna (padrão: 5).
     */
    constructor(quantidadeMax: number = 5) {
        this.alunos = [];
        this.quantidadeMax = quantidadeMax;
        this.quantidadeAtual = 0;  // Começa com 0 alunos.
    }

    /**
     * Adiciona um aluno à fila interna.
     * Se a fila estiver cheia, lança um erro.
     * @param aluno - O aluno a ser adicionado.
     */
    public adicionarAluno(aluno: Aluno): void {
        if (this.quantidadeAtual >= this.quantidadeMax) {
            throw new Error("A fila interna está cheia. Não é possível adicionar mais alunos.");
        }

        // A quantidade atual de alunos só é incrementada depois de adicionar um aluno.
        this.alunos.push(aluno);
        this.quantidadeAtual++;
        console.log(`Aluno adicionado à fila interna às ${aluno.getArrivalTime().toLocaleString()}`);
    }

    /**
     * Remove um aluno da fila interna.
     * Se a fila estiver vazia, lança um erro.
     * @returns O aluno removido ou `undefined` caso ocorra um erro.
     */
    public removerAluno(): Aluno | undefined {
        if (this.quantidadeAtual === 0) {
            throw new Error("A fila interna está vazia. Nenhum aluno para remover.");
        }

        const alunoRemovido = this.alunos.shift();
        if (alunoRemovido) {
            this.quantidadeAtual--;
            console.log(`Aluno removido da fila interna às ${alunoRemovido.getArrivalTime().toLocaleString()}`);
        }

        return alunoRemovido;
    }

     /**
    * Lista todos os alunos presentes na fila interna.
    * Se a fila estiver vazia, exibe uma mensagem informando que não há alunos na fila.
    */
   listarAlunos(): Aluno[] {
    if (this.alunos.length === 0) {
        console.warn("Nenhum aluno na fila.");
    }
    return this.alunos;
}

    /**
     * Retorna a quantidade total de alunos na fila interna.
     * @returns O número total de alunos na fila.
     */
    public getQuantidadeAtual(): number {
        return this.quantidadeAtual;
    }

    /**
     * Retorna a capacidade máxima da fila interna.
     * @returns O número máximo de alunos que a fila pode comportar.
     */
    public getQuantidadeMax(): number {
        return this.quantidadeMax;
    }

    /**
     * Define um novo limite máximo de alunos na fila interna.
     * @param novaQuantidadeMax - Novo limite máximo de alunos.
     * @throws Lança um erro se o valor for menor que o número de alunos atualmente na fila.
     */
    public setQuantidadeMax(novaQuantidadeMax: number): void {
        if (novaQuantidadeMax < this.quantidadeAtual) {
            throw new Error("O novo limite não pode ser menor que a quantidade atual de alunos na fila.");
        }

        this.quantidadeMax = novaQuantidadeMax;
    }
    
}
