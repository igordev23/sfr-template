import { Aluno } from "./aluno";

export class  FilaInterna {
    private alunos: Aluno[] = [];

    constructor(private quantidadeMax: number) {}

    public adicionarAluno(aluno: Aluno): void {
        if (this.alunos.length >= this.quantidadeMax) {
            throw new Error("A fila interna está cheia.");
        }
        this.alunos.push(aluno);
        console.log(`Aluno ${aluno.getMatricula()} entrou na fila interna.`);
    }

    public removerAluno(): Aluno | undefined {
        return this.alunos.shift();
    }

    public quantidadeAtual(): number {
        return this.alunos.length;
    }

    public vagasDisponiveis(): number {
        return this.quantidadeMax - this.alunos.length;
    }
}