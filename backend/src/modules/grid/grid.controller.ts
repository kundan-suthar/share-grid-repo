import type { Request, Response } from 'express';
import { asyncHandler } from '../../utils/async-handler.js';
import { GridService } from './grid.service.js';

export class GridController {
  constructor(private readonly gridService = new GridService()) {}

  getGrid = asyncHandler(async (_req: Request, res: Response) => {
    const grid = await this.gridService.getGrid();
    res.status(200).json(grid);
  });
}
