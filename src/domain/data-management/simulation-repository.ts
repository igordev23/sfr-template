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
      
      let found = false;
      for (let i = 0; i < simulations.length; i++) {
        if (simulations[i].id === simulation.id) {
          simulations[i] = simulation;
          found = true;
          break;
        }
      }
      
      if (!found) {
        simulations.push(simulation);
      }
      
      localStorage.setItem(this.storageKey, JSON.stringify(simulations));
    } catch (error) {
      throw new Error(`Failed to save simulation: ${error.message}`);
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
          throw new Error("Invalid simulation data in storage");
        }
        return new Simulation(
          data.id,
          data.name,
          new SimulationParameters(
            data.parameters.param1,
            data.parameters.param2,
            data.parameters.param3,
            data.parameters.param4,
            data.parameters.param5,
            data.parameters.param6,
            data.parameters.param7,
            data.parameters.param8,
            data.parameters.mode
          )
        );
      });
    } catch (error) {
      throw new Error(`Failed to retrieve all simulations: ${error.message}`);
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
