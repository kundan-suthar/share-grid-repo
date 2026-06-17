import { StatsRepository } from './stats.repository.js';

export class StatsService {
  constructor(private readonly statsRepository = new StatsRepository()) {}

  async getStats() {
    return this.statsRepository.getStats();
  }
}
