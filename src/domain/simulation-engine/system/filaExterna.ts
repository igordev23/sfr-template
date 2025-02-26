import { Aluno } from "./aluno"; // Importa a classe Aluno para ser utilizada na fila externa.

export class FilaExterna {
    private alunos: Aluno[] = []; // Declara um array privado de alunos para armazenar os estudantes na fila.

    adicionarAluno(aluno: Aluno): void {
        this.alunos.push(aluno); // Adiciona um novo aluno ao final da fila.
        console.log(`Aluno ${aluno.getMatricula()} entrou na fila externa.`); // Exibe no console a matrícula do aluno adicionado.
    }

    removerAluno(): Aluno | undefined {
        return this.alunos.shift(); // Remove e retorna o primeiro aluno da fila (ou undefined se a fila estiver vazia).
    }

    quantidadeAluno(): number {
        return this.alunos.length; // Retorna a quantidade de alunos na fila.
    }
}
