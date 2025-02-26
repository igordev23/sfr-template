import { Aluno } from "./aluno";

export class FilaExterna {
    private alunos: Aluno[] = [];

    adicionarAluno(aluno: Aluno): void {
        this.alunos.push(aluno);
        console.log(`Aluno ${aluno.getMatricula()} entrou na fila externa.`);
    }

    removerAluno(): Aluno | undefined {
        return this.alunos.shift();
    }

    quantidadeAluno(): number {
        return this.alunos.length;
    }
}