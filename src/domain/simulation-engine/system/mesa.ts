import { ReceiptRussianRuble } from "lucide-react";
import { Aluno } from "./aluno";


/**
 * Classe Table representa uma mesa onde alunos podem se sentar.
 */
export class Table {
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
     * Inicializa uma nova mesa sem alunos, com quantidade máxima, mesas ocupadas e tempo de permanência zerados.
     */
    constructor() {
        this.alunoNaMesa = [];
        this.quantidadeMaxima = 0;
        this.mesaOcupada = 0;
        this.tempoDePermanencia = 0;
    }




    /**
     * Verifica se um aluno está presente na mesa.
     * @param aluno - O aluno a ser verificado.
     * @returns O aluno encontrado ou undefined caso ele não esteja na mesa.
     */
    verificarAlunoNaMesa(aluno: Aluno): number{
        for (let i = 0; i < this.alunoNaMesa.length; i++) {
            if (this.alunoNaMesa[i] === aluno) {
                return i;
            }
        }
        return undefined;
    }

    /**
     * Adiciona um aluno à mesa, se houver espaço disponível e ele ainda não estiver presente.
     * @param aluno - O aluno que deseja ocupar a mesa.
     * @throws Erro caso todas as mesas estejam ocupadas ou o aluno já esteja na mesa.
     */
    ocuparMesa(aluno: Aluno) : void {
        if (this.mesaOcupada == this.quantidadeMaxima) {
            throw Error('Todas as mesas estão ocupadas.');
        } else {
            if (this.verificarAlunoNaMesa(aluno) == undefined) {
                this.alunoNaMesa.push(aluno);
                this.mesaOcupada++;
            } else {
                throw Error('O aluno já está na mesa.');
            }
        }
    }

    /**
     * Remove um aluno da mesa.
     * @throws Erro caso não haja alunos na mesa ou ocorra um erro ao tentar remover.
     */
    liberarMesa(alunoQueVaiSair: Aluno) : Aluno {
        if (this.alunoNaMesa.length == 0) {
            throw Error('Não há alunos na mesa.');
        }
        let posicaoDoAluno = this.verificarAlunoNaMesa(alunoQueVaiSair)

        this.alunoNaMesa.splice(posicaoDoAluno, 1);
        this.mesaOcupada--;
        
        return alunoQueVaiSair
    }

    /**
     * Define o tempo máximo de permanência dos alunos na mesa.
     * @param tMPNM - Tempo máximo de permanência (em minutos).
     */
    setTMPNM(tMPNM: number) {
        this.tempoDePermanencia = tMPNM;
    }

    /**
     * Define a quantidade máxima de alunos que podem ocupar a mesa.
     * @param lM - Número máximo de alunos permitidos.
     */
    setLM(lM: number) {
        this.quantidadeMaxima = lM;
    }
};
