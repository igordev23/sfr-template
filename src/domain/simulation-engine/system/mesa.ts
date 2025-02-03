import { Aluno } from "./aluno";


/**
 * Classe Table representa uma mesa onde alunos podem se sentar.
 */
class Table {
    /** Lista de alunos atualmente na mesa */
    alunoNaMesa: Aluno[];
    
    /** Número máximo de alunos que podem ocupar a mesa */
    quantidadeMaxima: number;
    
    /** Número de mesas ocupadas no momento */
    mesaOcupada: number;
    
    /** Tempo máximo que um aluno pode permanecer na mesa (em minutos) */
    tempoDePermanencia: number;

    /**
     * Construtor da classe Table.
     * @param numeroDeMesa - Número máximo de alunos permitidos na mesa.
     * @param mesasOcupadas - Número de mesas já ocupadas.
     * @param tempoDePermanencia - Tempo máximo de permanência dos alunos na mesa.
     */
    constructor(numeroDeMesa: number, mesasOcupadas: number, tempoDePermanencia: number) {
        this.alunoNaMesa = [];
        this.quantidadeMaxima = numeroDeMesa;
        this.mesaOcupada = mesasOcupadas;
        this.tempoDePermanencia = tempoDePermanencia;
    }

    /**
     * Verifica se um aluno está na mesa.
     * @param aluno - O aluno a ser verificado.
     * @returns O aluno encontrado ou undefined se ele não estiver na mesa.
     */
    verificarAlunoNaMesa(aluno: Aluno): Aluno | undefined {
        for (let i = 0; i < this.alunoNaMesa.length; i++) {
            if (this.alunoNaMesa[i] === aluno) {
                return aluno;
            }
        }
        return undefined;
    }

    /**
     * Adiciona um aluno à mesa, se ele ainda não estiver presente.
     * @param aluno - O aluno que deseja ocupar a mesa.
     * @throws Erro caso o aluno já esteja na mesa.
     */
    ocuparMesa(aluno: Aluno) {
        if (this.verificarAlunoNaMesa(aluno) === undefined) {
            this.alunoNaMesa.push(aluno);
        } else {
            throw new Error("O aluno já está na mesa.");
        }
    }

    /**
     * Remove um aluno da mesa, caso ele esteja presente.
     * @param aluno - O aluno que deseja sair da mesa.
     * @throws Erro caso o aluno não esteja na mesa.
     */
    liberarMesa(aluno: Aluno) {
        if (this.verificarAlunoNaMesa(aluno) !== undefined) {
            for (let i = 0; i < this.alunoNaMesa.length; i++) {
                if (this.alunoNaMesa[i] === aluno) {
                    this.alunoNaMesa.splice(i, 1);
                    return;
                }
            }
        } else {
            throw new Error('O aluno não está na mesa.');
        }
    }
};