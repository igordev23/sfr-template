import { MetricOverTime, SimulationResults } from "@/domain/data-management/Entities/simulation-results";

/**
 * Classe responsável por observar e coletar métricas durante a simulação do refeitório.
 * Registra dados como tempo de espera, ocupação de mesas e tamanhos das filas ao longo do tempo.
 */
export class Observador {
    duracaoSimulacao: number; // Duração total da simulação em unidades de tempo.
    duracaoRealSimulacao: number; // Duração real da simulação considerando tempo de processamento.
    ocupacaoMaximaMesas: number; // Número máximo de mesas ocupadas simultaneamente.
    somatorioDosTemposDeEspera: number; // Soma total dos tempos de espera dos alunos.
    tamanhosDaFila: number[]; // Lista com os tamanhos da fila ao longo do tempo.
    filaInternaAoLongoDoTempo: MetricOverTime[]; // Histórico da fila interna.
    filaExternaAoLongoDoTempo: MetricOverTime[]; // Histórico da fila externa.
    ocupacaoMesasAoLongoDoTempo: MetricOverTime[]; // Histórico de ocupação das mesas.

    /**
     * Construtor da classe Observador.
     * Inicializa todas as métricas com valores padrão.
     */
    constructor() {
        this.duracaoSimulacao = 0;
        this.duracaoRealSimulacao = 0;
        this.ocupacaoMaximaMesas = 0;
        this.somatorioDosTemposDeEspera = 0;
        this.tamanhosDaFila = [];
        this.filaInternaAoLongoDoTempo = [];
        this.filaExternaAoLongoDoTempo = [];
        this.ocupacaoMesasAoLongoDoTempo = [];
    }

    /**
     * Define a duração total da simulação com base no tempo inicial e final.
     * @param tempoInicial - Momento em que a simulação começou.
     * @param tempoFinal - Momento em que a simulação terminou.
     */
    public definirDuracaoSimulacao(tempoInicial: number, tempoFinal: number) {
        this.duracaoSimulacao = tempoFinal - tempoInicial;
        this.duracaoSimulacao = Math.max(this.duracaoSimulacao, 0);
        console.log(`Duração da simulação: ${this.duracaoSimulacao}`);
    }

    /**
     * Computa os resultados finais da simulação e retorna um objeto SimulationResults.
     * @returns Um objeto contendo todas as métricas finais da simulação.
     */
    public computarResultados(): SimulationResults {
        if (this.duracaoSimulacao <= 0) {
            throw new Error('A duração da simulação deve ser maior que zero');
        }

        const mediaTempoEspera = this.somatorioDosTemposDeEspera / (this.tamanhosDaFila.length || 1);
        const mediaFilaExterna = this.calcularMedia(this.filaExternaAoLongoDoTempo);
        const mediaFilaInterna = this.calcularMedia(this.filaInternaAoLongoDoTempo);

        console.log("Resultados Computados:", {
            mediaTempoEspera, mediaFilaExterna, mediaFilaInterna, ocupacaoMaximaMesas: this.ocupacaoMaximaMesas
        });

        return new SimulationResults(
            this.filaInternaAoLongoDoTempo,
            this.filaExternaAoLongoDoTempo,
            this.ocupacaoMesasAoLongoDoTempo,
            mediaTempoEspera,
            mediaFilaExterna,
            mediaFilaInterna,
            this.ocupacaoMaximaMesas,
            this.duracaoSimulacao,
            this.duracaoRealSimulacao
        );
    }

    /**
     * Calcula a média de uma métrica ao longo do tempo.
     * @param medidas - Lista contendo os valores da métrica.
     * @returns O valor médio da métrica ao longo do tempo.
     */
    private calcularMedia(medidas: MetricOverTime[]): number {
        if (medidas.length === 0) return 0;
        const soma = medidas.reduce((total, m) => total + m.value, 0);
        return soma / medidas.length;
    }

    /**
     * Registra a chegada de um aluno, armazenando o tamanho da fila no momento.
     * @param tempo - Tempo de chegada do aluno.
     */
    public observarChegadaAluno(tempo: number) {
        this.tamanhosDaFila.push(tempo);
    }

    /**
     * Registra o tempo de espera de um aluno na fila.
     * @param tempo - Tempo que o aluno esperou na fila.
     */
    public observarTemposDeEspera(tempo: number) {
        this.somatorioDosTemposDeEspera += tempo;
    }

    /**
     * Observa e armazena o tamanho das filas e a ocupação das mesas em um dado instante.
     * @param filaInterna - Quantidade de alunos na fila interna.
     * @param filaExterna - Quantidade de alunos na fila externa.
     * @param ocupacaoMesas - Número de mesas ocupadas.
     * @param tempo - Tempo em que a observação foi feita.
     */
    public observarTamanhoFilas(filaInterna: number, filaExterna: number, ocupacaoMesas: number, tempo: number) {
        this.filaInternaAoLongoDoTempo.push(new MetricOverTime(tempo, filaInterna));
        this.filaExternaAoLongoDoTempo.push(new MetricOverTime(tempo, filaExterna));
        this.ocupacaoMesasAoLongoDoTempo.push(new MetricOverTime(tempo, ocupacaoMesas));

        this.ocupacaoMaximaMesas = Math.max(this.ocupacaoMaximaMesas, ocupacaoMesas);

        console.log("Métricas observadas:", { filaInterna, filaExterna, ocupacaoMesas, tempo });
    }
}
