// Importa a classe Aluno, que será usada para representar os alunos na fila
import { Aluno } from "./aluno";

// Classe FilaInterna, que gerencia uma fila de alunos com capacidade limitada
export class FilaInterna {
    private alunos: Aluno[] = []; // Atributo privado que armazena a lista de alunos na fila

    // Construtor da classe, que recebe a quantidade máxima de alunos permitidos na fila
    constructor(private quantidadeMax: number) {}

    // Método para adicionar um aluno à fila
    public adicionarAluno(aluno: Aluno): void {
        // Verifica se a fila está cheia, comparando com a quantidade máxima
        if (this.alunos.length >= this.quantidadeMax) {
            throw new Error("A fila interna está cheia."); // Lança um erro caso a fila esteja cheia
        }
        this.alunos.push(aluno); // Adiciona o aluno à fila
        console.log(`Aluno ${aluno.getMatricula()} entrou na fila interna.`); // Exibe mensagem no console
    }

    // Método para remover o primeiro aluno da fila (FIFO - First In, First Out)
    public removerAluno(): Aluno | undefined {
        return this.alunos.shift(); // Remove e retorna o primeiro aluno da fila
    }

    // Método para obter a quantidade atual de alunos na fila
    public quantidadeAtual(): number {
        return this.alunos.length; // Retorna o número de alunos na fila
    }

    // Método para obter o número de vagas disponíveis na fila
    public vagasDisponiveis(): number {
        return this.quantidadeMax - this.alunos.length; // Retorna a diferença entre a capacidade máxima e a quantidade atual
    }
}
