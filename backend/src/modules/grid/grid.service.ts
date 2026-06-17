import type { CaptureTileInput } from './tile.validation.js';
import { TileRepository } from './tile.repository.js';

export class GridService {
  constructor(private readonly tileRepository = new TileRepository()) {}

  async getGrid() {
    return this.tileRepository.findAll();
  }

  async captureTile(input: CaptureTileInput) {
    return this.tileRepository.captureTile(input.tileId, input.userId);
  }
}
