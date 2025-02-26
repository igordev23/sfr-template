import { Evento } from "../event/evento"; 
import { Observador } from "../event/observador"; 

export class MaquinaEventos {
    eventos: Evento[] = [];  // Lista de eventos que serão processados
    instanteDaSimulacao: number;  // Armazena o tempo atual da simulação
    observador: Observador = new Observador();  // Instância do observador para monitorar a simulação
    instanteInicial: number;  // Tempo inicial da simulação
    eventosProcessados: number = 0;  // Contador de eventos já processados

    constructor(instanteInicial: number = 0) {
        this.instanteInicial = instanteInicial;  // Define o instante inicial da simulação
        this.instanteDaSimulacao = instanteInicial;  // Inicializa o instante atual com o tempo inicial
    }

    processaEventos(): void {
        // Enquanto houver eventos na fila
        while (this.eventos.length > 0) {
            // Ordena os eventos pelo timestamp (tempo de ocorrência)
            this.eventos.sort((a, b) => a.getTimestamp() - b.getTimestamp());

            // Remove o primeiro evento da fila (o mais próximo no tempo)
            const eventoAtual = this.eventos.shift();
            if (eventoAtual) {
                // Atualiza o tempo da simulação para o tempo do evento atual
                this.instanteDaSimulacao = eventoAtual.getTimestamp();

                // Processa o evento atual
                eventoAtual.processaEvento();
                this.eventosProcessados++;  // Incrementa o contador de eventos processados

                // Exibe no console informações sobre o evento processado
                console.log(`Evento processado: ${eventoAtual.constructor.name}, Tempo: ${this.instanteDaSimulacao}`);
            }
        }

        // Define a duração total da simulação no observador
        this.observador.definirDuracaoSimulacao(this.instanteInicial, this.instanteDaSimulacao);
    }

    adicionaEvento(novoEvento: Evento): void {
        // Adiciona um novo evento à fila de eventos
        this.eventos.push(novoEvento);
    }

    getInstanteAtual(): number {
        // Retorna o instante atual da simulação
        return this.instanteDaSimulacao;
    }
}
