import { MetricOverTime, SimulationResults } from "@/domain/data-management/Entities/simulation-results";


export class Observador {
    duracaoSimulacao: number;
    duracaoRealSimulacao: number;
    ocupacaoMaximaMesas: number;
    somatorioDosTemposDeEspera: number;
    tamanhosDaFila: number[];
    filaInternaAoLongoDoTempo: MetricOverTime[];
    filaExternaAoLongoDoTempo: MetricOverTime[];
    ocupacaoMesasAoLongoDoTempo: MetricOverTime[];

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

    public definirDuracaoSimulacao(tempoInicial: number, tempoFinal: number) {
        this.duracaoSimulacao = tempoFinal - tempoInicial;
        if (this.duracaoSimulacao < 0) {
            this.duracaoSimulacao = 0;
        }
    }
    

    public computarResultados(): SimulationResults {
        if (this.duracaoSimulacao <= 0) {
            throw new Error('A duração da simulação deve ser maior que zero');
        }

        const mediaTempoEspera = this.somatorioDosTemposDeEspera / this.tamanhosDaFila.length || 0;
        const mediaFilaExterna = this.calcularMedia(this.filaExternaAoLongoDoTempo);
        const mediaFilaInterna = this.calcularMedia(this.filaInternaAoLongoDoTempo);

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

    private calcularMedia(medidas: MetricOverTime[]): number {
        if (medidas.length === 0) return 0;
        const soma = medidas.reduce((total, m) => total + m.value, 0);
        return soma / medidas.length;
    }

    public observarChegadaAluno(tempo: number) {
        this.tamanhosDaFila.push(tempo);
    }

    public observarTemposDeEspera(tempo: number) {
        this.somatorioDosTemposDeEspera += tempo;
    }

    public observarTamanhoFilas(filaInterna: number, filaExterna: number, ocupacaoMesas: number, tempo: number) {
        // Criando instâncias de MetricOverTime para cada fila e ocupação de mesas
        this.filaInternaAoLongoDoTempo.push(new MetricOverTime(tempo, filaInterna));
        this.filaExternaAoLongoDoTempo.push(new MetricOverTime(tempo, filaExterna));
        this.ocupacaoMesasAoLongoDoTempo.push(new MetricOverTime(tempo, ocupacaoMesas));
    
        // Atualizando a ocupação máxima de mesas se necessário
        if (ocupacaoMesas > this.ocupacaoMaximaMesas) {
            this.ocupacaoMaximaMesas = ocupacaoMesas;
        }
    }
}
