export class Aluno{
    tempoDeChegada : Date;
    tempoAtendido : number;

    constructor(tempoDeChegada: Date = new Date(), tempoAtendido: number = 0){
        this.tempoDeChegada = tempoDeChegada;
        this.tempoAtendido = tempoAtendido;
    }
}