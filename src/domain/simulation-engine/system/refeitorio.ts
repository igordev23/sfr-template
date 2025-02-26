import { GaussianRandom, RandomGeneratorI } from "../util/random-generators"; // Importa geradores de números aleatórios
import { Aluno } from "./aluno"; // Importa a classe Aluno
import { Atendimento } from "./atendimento"; // Importa a classe Atendimento
import { Catraca } from "./Catraca"; // Importa a classe Catraca, que controla a entrada no refeitório
import { FilaExterna } from "./filaExterna"; // Importa a fila externa do refeitório
import { FilaInterna } from "./filaInterna"; // Importa a fila interna do refeitório
import { Mesas } from "./mesa"; // Importa a classe Mesas, que gerencia os lugares disponíveis

export class Refeitorio {
    private filaExterna: FilaExterna; // Gerencia os alunos que aguardam do lado de fora
    private filaInterna: FilaInterna; // Gerencia os alunos que aguardam do lado de dentro
    private catraca: Catraca; // Controla o acesso dos alunos ao refeitório
    private mesa: Mesas; // Representa as mesas disponíveis no refeitório
    private LFI: number; // Limite de alunos na fila interna
    private LM: number; // Limite de mesas no refeitório
    private QAL: number; // Quantidade mínima de alunos necessária para liberar a catraca
    private TMDM: number; // Tempo médio de duração da refeição
    private TMPSC: number; // Tempo médio para passar pela catraca
    private TMPNM: number; // Tempo médio para pegar a refeição no balcão
    private randomGenerators: RandomGeneratorI[]; // Lista de geradores de números aleatórios
    private atendimento: Atendimento; // Responsável pelo atendimento dos alunos no refeitório

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

        // Inicializa as estruturas do refeitório
        this.filaExterna = new FilaExterna();
        this.filaInterna = new FilaInterna(this.LFI);
        this.catraca = new Catraca();
        this.mesa = new Mesas(this.LM);
        this.atendimento = new Atendimento(this);
    }

    // Método para configurar os parâmetros do refeitório após a inicialização
    public configurarParametros(
        LFI: number,
        QAL: number,
        LM: number,
        TMDM: number,
        TMPSC: number,
        TMPNM: number,
        randomGenerators: RandomGeneratorI[] = [new GaussianRandom()]
    ): void {
        this.LFI = LFI;
        this.QAL = QAL;
        this.LM = LM;
        this.TMDM = TMDM;
        this.TMPSC = TMPSC;
        this.TMPNM = TMPNM;
        this.randomGenerators = randomGenerators;

        // Atualiza as filas e mesas com os novos parâmetros
        this.filaInterna = new FilaInterna(this.LFI);
        this.mesa = new Mesas(this.LM);
        console.log("Parâmetros do refeitório configurados.");
    }

    // Método chamado quando um aluno chega ao refeitório
    chegadaAluno(matricula: number, distribuidor: RandomGeneratorI = this.randomGenerators[0]): void {
        const aluno = new Aluno(matricula);
        this.filaExterna.adicionarAluno(aluno); // Adiciona o aluno à fila externa
        console.log(`Aluno ${matricula} chegou e entrou na fila externa.`);

        // Define um tempo aleatório para a chegada do aluno à catraca
        const tempoChegada = distribuidor.next();
        setTimeout(() => {
            this.tentarLiberarCatraca();
        }, tempoChegada * 1000); // Converte para milissegundos
    }

    // Método que verifica se a catraca pode liberar alunos para a fila interna
    tentarLiberarCatraca(): void {
        // Se a fila interna estiver cheia, a catraca é bloqueada
        if (this.filaInterna.quantidadeAtual() >= this.LFI) {
            this.catraca.bloquearCatraca();
        }

        // Enquanto houver alunos na fila externa e a catraca estiver liberada
        while (this.filaExterna.quantidadeAluno() > 0 && this.catraca.getStatus()) {
            if (this.temVagasSuficientesNaFilaInterna()) {
                this.moverAlunoParaFilaInterna();
            } else {
                console.log(`Aguardando ${this.QAL} vagas na fila interna para liberar a catraca.`);
                break;
            }
        }
    }

    // Método para verificar se há vagas suficientes na fila interna
    temVagasSuficientesNaFilaInterna(): boolean {
        return this.LFI - this.filaInterna.quantidadeAtual() >= this.QAL;
    }

    // Método para mover um aluno da fila externa para a fila interna
    moverAlunoParaFilaInterna(): void {
        const aluno = this.filaExterna.removerAluno();
        if (aluno) {
            // Tempo aleatório para a digitação do aluno na catraca
            const tempoDigitacao = this.randomGenerators[0].next();
            setTimeout(() => {
                // Se ainda houver espaço na fila interna, o aluno pode entrar
                if (this.filaInterna.quantidadeAtual() < this.LFI) {
                    this.filaInterna.adicionarAluno(aluno);
                    console.log(`Aluno ${aluno.getMatricula()} passou pela catraca.`);

                    // Se ainda há espaço suficiente, a catraca é liberada para mais alunos
                    if (this.filaInterna.quantidadeAtual() < this.LFI - this.QAL) {
                        this.catraca.liberarCatraca();
                    }

                    // Inicia o atendimento do aluno na fila interna
                    this.iniciarAtendimentoAluno();
                }
            }, tempoDigitacao * 1000); // Converte para milissegundos
        }
    }
    

    // Método para iniciar o atendimento de um aluno na fila interna
    iniciarAtendimentoAluno() {
        this.atendimento.iniciarAtendimentoAluno();
    }

    public ocuparMesa(aluno: Aluno): boolean {
        if (this.mesa.ocuparMesa()) {
            console.log(`Aluno ${aluno.getMatricula()} ocupou uma mesa.`);
            return true;
        }
        console.log(`Aluno ${aluno.getMatricula()} não conseguiu uma mesa, aguardando.`);
        return false;
    }

    public liberarMesa(): void {
        this.mesa.liberarMesa();
        console.log("Uma mesa foi liberada.");
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
