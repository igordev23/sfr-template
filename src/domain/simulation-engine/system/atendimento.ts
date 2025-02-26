
import { Aluno } from "./aluno";
import { Refeitorio } from "./refeitorio";

/**
 * Classe Atendimento
 *
 * Representa um atendimento realizado para um aluno. A classe gerencia o estado do atendimento,
 * o aluno sendo atendido, o tempo médio do atendimento e o status (ativo ou inativo).
 */
export class Atendimento {
    constructor(private refeitorio: Refeitorio) {}

    iniciarAtendimentoAluno() {
        if (this.refeitorio.getFilaInterna().quantidadeAtual() > 0 && this.refeitorio.getMesas().temMesasDisponiveis()) {
            this.processarAtendimento();
        }
    }

    processarAtendimento() {
        if (!this.refeitorio.getMesas().temMesasDisponiveis()) {
            console.log("Todas as mesas estão ocupadas. Atendimento pausado.");
            return;
        }

        const aluno = this.refeitorio.getFilaInterna().removerAluno();
        if (aluno) {
            const tempoServico = this.refeitorio.getTMPNM();
            setTimeout(() => {
                if (this.refeitorio.getMesas().ocuparMesa()) {
                    console.log(`Aluno ${aluno.getMatricula()} pegou comida e está indo para a mesa.`);
                    this.processarSaidaDaMesa(aluno);
                }
            }, tempoServico * 1000);
        }
    }

    processarSaidaDaMesa(aluno: Aluno) {
        const tempoPermanencia = this.refeitorio.getTMPNM();
        setTimeout(() => {
            this.refeitorio.getMesas().liberarMesa();
            console.log(`Aluno ${aluno.getMatricula()} terminou sua refeição e liberou uma mesa.`);
            this.iniciarAtendimentoAluno();
            this.refeitorio.tentarLiberarCatraca();
        }, tempoPermanencia * 1000);
    }
}
