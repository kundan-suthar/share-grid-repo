import { LeaderboardRepository } from './leaderboard.repository.js';

export class LeaderboardService {
  constructor(private readonly leaderboardRepository = new LeaderboardRepository()) {}

  async getLeaderboard() {
    return this.leaderboardRepository.getLeaderboard();
  }
}
