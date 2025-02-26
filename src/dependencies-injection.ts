import { SimulationRepositoryI } from "./adapter/interfaces/simulation-repository-interface";
import { SimulatorI } from "./adapter/interfaces/simulator-interface";
import { SimulationEngineAdapter } from "./adapter/simulation-engine-adapter";
import { SimulationManagementAdapter } from "./adapter/simulation-management-adapter";
import { SimulationRepositoryLocalStorage } from "./domain/data-management/simulation-repository";
import { MaquinaEventos } from "./domain/simulation-engine/maquina-de-eventos/maquinadeeventos";
import { MockSimulator } from "./domain/simulation-engine/mock-simulator";
import { Refeitorio } from "./domain/simulation-engine/system/refeitorio";
import { Simulador } from "./domain/simulator";
import { SimulationEngineAdapterI } from "./view/interfaces/simulation-engine-adapter-interface";
import { SimulationManagementAdapterI } from "./view/interfaces/simulation-management-adapter-interface";
// Criando as dependências necessárias
const refeitorio = new Refeitorio(); // Certifique-se de que a classe existe e pode ser instanciada
const maquina = new MaquinaEventos(); // Certifique-se de que esta classe também está definida corretamente

//injeção de dependências
console.log("Injeção de dependências");
const repository : SimulationRepositoryI = new SimulationRepositoryLocalStorage();
const simulator : SimulatorI = new Simulador(refeitorio,maquina)
const management : SimulationManagementAdapterI = new SimulationManagementAdapter(repository);
const engine : SimulationEngineAdapterI = new SimulationEngineAdapter(simulator,management);

//exportando os adapters para que as views consigam fazer as operações.
export const adapters = {
  simManagement: management,
  simEngine: engine,
};