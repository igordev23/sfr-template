import { Aluno } from "./aluno";


/**
 * Classe Table representa uma mesa onde alunos podem se sentar.
 */
class Table {
    /** Lista de alunos atualmente na mesa */
    private alunoNaMesa: Aluno[];

    /** Número máximo de alunos que podem ocupar a mesa */
    private quantidadeMaxima: number;

    /** Número de mesas ocupadas no momento */
    private mesaOcupada: number;

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
    verificarAlunoNaMesa(aluno: Aluno): Aluno | undefined {
        for (let i = 0; i < this.alunoNaMesa.length; i++) {
            if (this.alunoNaMesa[i] === aluno) {
                return aluno;
            }
        }
        return undefined;
    }

    /**
     * Adiciona um aluno à mesa, se houver espaço disponível e ele ainda não estiver presente.
     * @param aluno - O aluno que deseja ocupar a mesa.
     * @throws Erro caso todas as mesas estejam ocupadas ou o aluno já esteja na mesa.
     */
    ocuparMesa(aluno: Aluno | undefined) {
        if (this.mesaOcupada == this.quantidadeMaxima) {
            throw Error('Todas as mesas estão ocupadas.');
        } else {
            if (this.verificarAlunoNaMesa(aluno!) == undefined) {
                this.alunoNaMesa.push(aluno!);
                this.mesaOcupada++;
            } else {
                throw Error('O aluno já está na mesa.');
            }
        }
    }

    /**
     * Descobre a posição do aluno com menor tempo de permanência na mesa.
     * @returns A posição do aluno com menor tempo de permanência ou null caso a mesa esteja vazia.
     */
    descobrirOLigeirinho(): number | null {
        if (this.alunoNaMesa.length === 0) {
            return null;
        }

        let posicaoDoLigeirinho: number = 0; // Índice do primeiro aluno
        for (let posicaoAtual = 1; posicaoAtual < this.alunoNaMesa.length; posicaoAtual++) {
            if (this.alunoNaMesa[posicaoAtual].getTempoPermanencia()! < this.alunoNaMesa[posicaoDoLigeirinho].getTempoPermanencia()!) {
                posicaoDoLigeirinho = posicaoAtual;
            }
        }
        return posicaoDoLigeirinho;
    }

    /**
     * Remove um aluno da mesa, dando preferência ao que permaneceu por menos tempo.
     * @throws Erro caso não haja alunos na mesa ou ocorra um erro ao tentar remover.
     */
    liberarMesa() {
        if (this.alunoNaMesa.length == 0) {
            throw Error('Não há alunos na mesa.');
        }

        let alunoQueVaiSair: number | null = this.descobrirOLigeirinho();
        if (alunoQueVaiSair == null || this.alunoNaMesa[alunoQueVaiSair] == null) {
            throw Error('Erro ao remover aluno: referência inválida.');
        }

        this.alunoNaMesa.splice(alunoQueVaiSair, 1);
        this.mesaOcupada--;
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
