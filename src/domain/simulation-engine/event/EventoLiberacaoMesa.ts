// Importa a classe Evento, que serve como base para o evento de liberação de mesa
import { Evento } from "./evento"; // Importa a classe Evento para herdar de sua funcionalidade
import { Aluno } from "../system/aluno"; // Importa a classe Aluno para representar o aluno que liberou a mesa

// Classe EventoLiberacaoMesa que representa o evento de liberação de uma mesa por um aluno
export class EventoLiberacaoMesa extends Evento {
    aluno: Aluno; // Atributo que armazena o aluno responsável por liberar a mesa

    // Construtor da classe, que recebe o refeitório, timestamp, máquina de eventos e o aluno
    constructor(refeitorio, timestamp, maquina, aluno) {
        super(refeitorio, timestamp, maquina); // Chama o construtor da classe pai (Evento)
        this.aluno = aluno; // Atribui o aluno responsável à variável aluno
    }

    // Método para processar o evento de liberação da mesa
    processaEvento(): void {
        // Exibe no console que o aluno terminou sua refeição e liberou a mesa
        console.log(`Aluno ${this.aluno.getMatricula()} terminou a refeição e liberou uma mesa.`);
        
        // Libera uma mesa no refeitório utilizando o método da classe Mesas
        this.refeitorio.getMesas().liberarMesa(); // Chama o método liberarMesa da classe Mesas
    }
}
