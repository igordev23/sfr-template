import { GaussianRandom, RandomGeneratorI } from "../util/random-generators";
import { Aluno } from "./aluno";
import { Atendimento } from "./atendimento";
import { Catraca } from "./Catraca";
import { FilaExterna } from "./filaExterna";
import { FilaInterna } from "./filaInterna";
import { Mesas } from "./mesa";


export class Refeitorio {
    private filaExterna: FilaExterna;
    private filaInterna: FilaInterna;
    private catraca: Catraca;
    private mesa: Mesas;
    private LFI: number;
    private LM: number;
    private QAL: number;
    private TMDM: number;
    private TMPSC: number;
    private TMPNM: number;
    private randomGenerators: RandomGeneratorI[];
    private atendimento: Atendimento;

    constructor(
        LFI: number = 0,
        QAL: number = 0,
        LM: number = 0,
        TMDM: number = 0,
        TMPSC: number = 0,
        TMPNM: number = 0,
        randomGenerators: RandomGeneratorI[] = [new GaussianRandom()]
    ) {
        this.LFI = LFI;
        this.QAL = QAL;
        this.LM = LM;
        this.TMDM = TMDM;
        this.TMPSC = TMPSC;
        this.TMPNM = TMPNM;
        this.randomGenerators = randomGenerators;

        this.filaExterna = new FilaExterna();
        this.filaInterna = new FilaInterna(this.LFI);
        this.catraca = new Catraca();
        this.mesa = new Mesas(this.LM);
        this.atendimento = new Atendimento(this);
    }

    public configurarParametros(
        LFI: number,
        QAL: number,
        LM: number,
        TMDM: number,
        TMPSC: number,
        TMPNM: number,
        randomGenerators: RandomGeneratorI[] = [new GaussianRandom()]
    ) {
        this.LFI = LFI;
        this.QAL = QAL;
        this.LM = LM;
        this.TMDM = TMDM;
        this.TMPSC = TMPSC;
        this.TMPNM = TMPNM;
        this.randomGenerators = randomGenerators;

        this.filaInterna = new FilaInterna(this.LFI);
        this.mesa = new Mesas(this.LM);
        console.log("Parâmetros do refeitório configurados.");
    }


    chegadaAluno(matricula: number, distribuidor: RandomGeneratorI = this.randomGenerators[0]) {
        const aluno = new Aluno(matricula);
        this.filaExterna.adicionarAluno(aluno);
        console.log(`Aluno ${matricula} chegou e entrou na fila externa.`);

        // Escolher a distribuição para o tempo de chegada do aluno
        const tempoChegada = distribuidor.next();
        setTimeout(() => {
            this.tentarLiberarCatraca();
        }, tempoChegada * 1000); // Tempo de chegada convertido para milissegundos
    }

    tentarLiberarCatraca() {
        if (this.filaInterna.quantidadeAtual() >= this.LFI) {
            this.catraca.bloquearCatraca();
        }

        while (this.filaExterna.quantidadeAluno() > 0 && this.catraca.getStatus()) {
            if (this.temVagasSuficientesNaFilaInterna()) {
                this.moverAlunoParaFilaInterna();
            } else {
                console.log(`Aguardando ${this.QAL} vagas na fila interna para liberar a catraca.`);
                break;
            }
        }
    }

    temVagasSuficientesNaFilaInterna(): boolean {
        return this.LFI - this.filaInterna.quantidadeAtual() >= this.QAL;
    }

    moverAlunoParaFilaInterna() {
        const aluno = this.filaExterna.removerAluno();
        if (aluno) {
            const tempoDigitacao = this.randomGenerators[0].next(); // Usando distribuição configurada
            setTimeout(() => {
                if (this.filaInterna.quantidadeAtual() < this.LFI) {
                    this.filaInterna.adicionarAluno(aluno);
                    console.log(`Aluno ${aluno.getMatricula()} passou pela catraca.`);

                    if (this.filaInterna.quantidadeAtual() < this.LFI - this.QAL) {
                        this.catraca.liberarCatraca();
                    }

                    this.iniciarAtendimentoAluno();
                    // Usando a classe Atendimento para iniciar o atendimento
                }
            }, tempoDigitacao * 1000); // Convertendo para segundos, multiplicando por 1000
        }
    }

    iniciarAtendimentoAluno(){
        this.atendimento.iniciarAtendimentoAluno();
    }

     // Métodos para obter o tamanho das filas
     getTamanhoFilaInterna(): number {
        return this.filaInterna.quantidadeAtual();
    }

    getTamanhoFilaExterna(): number {
        return this.filaExterna.quantidadeAluno();
    }

    // Método para obter a quantidade de mesas ocupadas
    getMesasOcupadas(): number {
        return this.mesa.getMesasOcupadas();
    }
    // Métodos públicos para acessar atributos privados
    getFilaInterna(): FilaInterna {
        return this.filaInterna;
    }

    getFilaExterna(): FilaExterna {
        return this.filaExterna;
    }

    getCatraca(): Catraca {
        return this.catraca;
    }

    getMesas(): Mesas {
        return this.mesa;
    }

    getLFI(): number {
        return this.LFI;
    }

    getLM(): number {
        return this.LM;
    }

    getQAL(): number {
        return this.QAL;
    }

    getTMDM(): number {
        return this.TMDM;
    }

    getTMPSC(): number {
        return this.TMPSC;
    }

    getTMPNM(): number {
        return this.TMPNM;
    }
}









