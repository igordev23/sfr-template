// Importa as classes Refeitorio e MaquinaEventos, que são utilizadas pelo evento
import { Refeitorio } from "../system/refeitorio"; // Classe que representa o refeitório
import { MaquinaEventos } from "../maquina-de-eventos/maquinadeeventos"; // Classe que representa a máquina de eventos

// Classe abstrata Evento, que serve como base para outros tipos de eventos
export abstract class Evento {
    refeitorio: Refeitorio; // Atributo que representa o refeitório onde o evento acontece
    timestamp: number; // Atributo que representa o momento em que o evento ocorre
    maquinadeeventos: MaquinaEventos; // Atributo que representa a máquina que gerencia os eventos

    // Construtor da classe Evento, que inicializa os atributos da classe com valores passados
    constructor(refeitorio: Refeitorio, timestamp: number, maquina: MaquinaEventos) {
        this.refeitorio = refeitorio; // Inicializa o refeitório
        this.timestamp = timestamp; // Inicializa o timestamp
        this.maquinadeeventos = maquina; // Inicializa a máquina de eventos
    }

    // Método que retorna o timestamp do evento
    getTimestamp(): number {
        return this.timestamp; // Retorna o timestamp do evento
    }

    // Método abstrato que precisa ser implementado pelas subclasses para processar o evento
    abstract processaEvento(): void;
}
