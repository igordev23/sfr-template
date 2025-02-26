
import { ObservarTamanhoFila } from "./simulation-engine/event/observarTamanhoDaFila";
import { MaquinaEventos } from "./simulation-engine/maquina-de-eventos/maquinadeeventos";
import { Refeitorio } from "./simulation-engine/system/refeitorio";
import { GaussianRandom, RandomGeneratorI } from "./simulation-engine/util/random-generators";


export class Simulador {
    refeitorio: Refeitorio;
    maquina: MaquinaEventos;
    simulacao: Simulacao;

    constructor(refeitorio: Refeitorio, maquina: MaquinaEventos, simulacao: Simulacao) {
        this.refeitorio = refeitorio;
        this.maquina = maquina;
        this.simulacao = simulacao;
        this.configurarObservacaoFilas();
    }

    configurarObservacaoFilas() {
        const intervaloEntreObservacoes = 10;
        const quantidadeDeObservacoes = Math.floor(this.simulacao.parametros.internalQueueLimit / intervaloEntreObservacoes);
    
        for (let i = 0; i < quantidadeDeObservacoes; i++) {
            const instanteObservacao = (i + 1) * intervaloEntreObservacoes;
            console.log(`Instante de observação: ${instanteObservacao}`);
            const observacao = new ObservarTamanhoFila(this.refeitorio, instanteObservacao, this.maquina);
            this.maquina.adicionaEvento(observacao);
        }
    }

    escolherDistribuicao(tipo: string): RandomGeneratorI {
        switch (tipo) {
            case "gaussiana":
                return new GaussianRandom();
            case "uniforme":
                return { next: () => Math.random() * 10 };
            case "exponencial":
                return { next: () => -Math.log(1 - Math.random()) * 5 };
            default:
                throw new Error("Distribuição não suportada");
        }
    }

    public executarSimulacao() {
        this.maquina.processaEventos();
        const resultados = this.maquina.observador.computarResultados();
        this.simulacao.resultados = resultados;
    }
}


export class Simulacao {
    parametros: SimulationParameters;
    resultados: ResultadosSimulacao;

    constructor(parametros: SimulationParameters,resultados: ResultadosSimulacao) {
        this.parametros = parametros
        this.resultados = resultados
    }
}

export class SimulationParameters {
    internalQueueLimit: number;
    tableLimit: number;
    registrationTime: number;
    servingTime: number;
    tableTime: number;
    turnstileLimit: number;
    studentCount: number;
    serviceInterval: number;
    arrivalDistribution: "normal" | "exp" | "uniform";

    constructor(
        internalQueueLimit: number,
        tableLimit: number,
        registrationTime: number,
        servingTime: number,
        tableTime: number,
        turnstileLimit: number,
        studentCount: number,
        serviceInterval: number,
        arrivalDistribution: "normal" | "exp" | "uniform"
    ) {
        const validatePositive = (value: number, name: string) => {
            if (typeof value !== 'number' || value <= 0) {
                throw new Error(`${name} deve ser um número maior que 0`);
            }
        };

        validatePositive(internalQueueLimit, 'internalQueueLimit');
        validatePositive(tableLimit, 'tableLimit');
        validatePositive(registrationTime, 'registrationTime');
        validatePositive(servingTime, 'servingTime');
        validatePositive(tableTime, 'tableTime');
        validatePositive(turnstileLimit, 'turnstileLimit');
        validatePositive(studentCount, 'studentCount');
        validatePositive(serviceInterval, 'serviceInterval');

        if (!["normal", "exp", "uniform"].includes(arrivalDistribution)) {
            throw new Error('Distribuição de chegada inválida');
        }

        this.internalQueueLimit = internalQueueLimit;
        this.tableLimit = tableLimit;
        this.registrationTime = registrationTime;
        this.servingTime = servingTime;
        this.tableTime = tableTime;
        this.turnstileLimit = turnstileLimit;
        this.studentCount = studentCount;
        this.serviceInterval = serviceInterval;
        this.arrivalDistribution = arrivalDistribution;
    }
}
export class ResultadosSimulacao {
    tamanhoFilaInternaAoLongoDoTempo: MetricOverTime[];
    tamanhoFilaExternaAoLongoDoTempo: MetricOverTime[];
    ocupacaoMesasAoLongoDoTempo: MetricOverTime[];
    tempoMedioEspera: number;
    mediaFilaExterna: number;
    mediaFilaInterna: number;
    ocupacaoMaximaMesas: number;
    duracaoSimulacao: number;
    duracaoRealSimulacao: number;

    constructor(
        tamanhoFilaInternaAoLongoDoTempo: MetricOverTime[],
        tamanhoFilaExternaAoLongoDoTempo: MetricOverTime[],
        ocupacaoMesasAoLongoDoTempo: MetricOverTime[],
        tempoMedioEspera: number,
        mediaFilaExterna: number,
        mediaFilaInterna: number,
        ocupacaoMaximaMesas: number,
        duracaoSimulacao: number,
        duracaoRealSimulacao: number
    ) {
        this.tamanhoFilaInternaAoLongoDoTempo = tamanhoFilaInternaAoLongoDoTempo;
        this.tamanhoFilaExternaAoLongoDoTempo = tamanhoFilaExternaAoLongoDoTempo;
        this.ocupacaoMesasAoLongoDoTempo = ocupacaoMesasAoLongoDoTempo;
        this.tempoMedioEspera = this.validarNaoNegativo(tempoMedioEspera, 'tempoMedioEspera');
        this.mediaFilaExterna = this.validarNaoNegativo(mediaFilaExterna, 'mediaFilaExterna');
        this.mediaFilaInterna = this.validarNaoNegativo(mediaFilaInterna, 'mediaFilaInterna');
        this.ocupacaoMaximaMesas = this.validarNaoNegativo(ocupacaoMaximaMesas, 'ocupacaoMaximaMesas');
        this.duracaoSimulacao = this.validarNaoNegativo(duracaoSimulacao, 'duracaoSimulacao');
        this.duracaoRealSimulacao = this.validarNaoNegativo(duracaoRealSimulacao, 'duracaoRealSimulacao');
    }

    private validarNaoNegativo(valor: number, nomeCampo: string): number {
        if (typeof valor !== 'number' || isNaN(valor) || valor < 0) {
            throw new Error(`Valor inválido para ${nomeCampo}: deve ser um número não negativo.`);
        }
        return valor;
    }
}

/**
 * Representa uma métrica ao longo do tempo.
 */
export class MetricOverTime {
    timestamp: number;
    valor: number;

    /**
     * Cria uma instância de MetricOverTime.
     * @param timestamp - O timestamp da métrica.
     * @param valor - O valor da métrica.
     */
    constructor(timestamp: number, valor: number) {
        this.timestamp = this.validarNaoNegativo(timestamp, 'timestamp');
        this.valor = this.validarNaoNegativo(valor, 'valor');
    }

    private validarNaoNegativo(valor: number, nomeCampo: string): number {
        if (typeof valor !== 'number' || isNaN(valor) || valor < 0) {
            throw new Error(`Valor inválido para ${nomeCampo}: deve ser um número não negativo.`);
        }
        return valor;
    }
}
