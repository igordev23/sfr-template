import { SimulationRepositoryI } from "@/adapter/interfaces/simulation-repository-interface";
import { Simulation } from "./Entities/simulation";
import { SimulationParameters } from "./Entities/simulation-parameters";


export class SimulationRepositoryLocalStorage implements SimulationRepositoryI {
  private storageKey = "simulations";

  async save(simulation: Simulation): Promise<void> {
    try {
        if (!simulation) {
            throw new Error("Simulation object is required");
        }

        const simulations = await this.getAll();

        if (!simulation.id) {
            simulation.id = crypto.randomUUID();
        }

        // Verifica se a simulação já existe
        const index = simulations.findIndex(s => s.id === simulation.id);
        if (index !== -1) {
            simulations[index] = simulation;
        } else {
            simulations.push(simulation);
        }

        // Salva os dados formatados corretamente
        localStorage.setItem(this.storageKey, JSON.stringify(simulations));
        console.log(`Simulação salva com sucesso. ID: ${simulation.id}`);
    } catch (error) {
        throw new Error(`Falha ao salvar a simulação: ${error.message}`);
    }
}

  async getById(id: string): Promise<Simulation | null> {
    try {
      if (!id) {
        throw new Error("ID is required to fetch a simulation");
      }
      const simulations = await this.getAll();
      
      for (let sim of simulations) {
        if (sim.id === id) {
          return sim;
        }
      }
      
      return null;
    } catch (error) {
      throw new Error(`Failed to retrieve simulation by ID: ${error.message}`);
    }
  }

  async getAll(): Promise<Simulation[]> {
    try {
        const storedData = localStorage.getItem(this.storageKey);
        if (!storedData) return [];

        const parsedData = JSON.parse(storedData);

        return parsedData.map((data: any) => {
            if (!data.id || !data.name || !data.parameters) {
                console.warn("Dados inválidos encontrados no armazenamento:", data);
                return null;
            }

            return new Simulation(
                data.id,
                data.name,
                new SimulationParameters(
                    data.parameters.internalQueueLimit,
                    data.parameters.tableLimit,
                    data.parameters.registrationTime,
                    data.parameters.servingTime,
                    data.parameters.tableTime,
                    data.parameters.turnstileLimit,
                    data.parameters.studentCount,
                    data.parameters.serviceInterval,
                    data.parameters.arrivalDistribution
                )
            );
        }).filter(sim => sim !== null);
    } catch (error) {
        throw new Error(`Falha ao recuperar as simulações: ${error.message}`);
    }
}


  async delete(id: string): Promise<void> {
    try {
      if (!id) {
        throw new Error("ID is required to delete a simulation");
      }
      let simulations = await this.getAll();
      
      let i = 0;
      while (i < simulations.length) {
        if (simulations[i].id === id) {
          simulations.splice(i, 1);
          break;
        }
        i++;
      }
      
      localStorage.setItem(this.storageKey, JSON.stringify(simulations));
    } catch (error) {
      throw new Error(`Failed to delete simulation: ${error.message}`);
    }
  }
}
