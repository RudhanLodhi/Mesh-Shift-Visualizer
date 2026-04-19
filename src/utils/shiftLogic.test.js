import { describe, it, expect } from 'vitest';
import {
  applyColumnShift,
  applyRowShift,
  buildInitialData,
  computeMeshSteps,
  computeRingSteps,
  computeShiftStages
} from './shiftLogic.js';

describe('shiftLogic', () => {
  it('builds initial data as indices', () => {
    expect(buildInitialData(4)).toEqual([0, 1, 2, 3]);
  });

  it('shifts each row to the right', () => {
    const size = 4;
    const initial = buildInitialData(size * size);
    const shifted = applyRowShift(initial, size, 1);

    expect(shifted).toEqual([
      3, 0, 1, 2,
      7, 4, 5, 6,
      11, 8, 9, 10,
      15, 12, 13, 14
    ]);
  });

  it('shifts each column downward', () => {
    const size = 4;
    const initial = buildInitialData(size * size);
    const shifted = applyColumnShift(initial, size, 1);

    expect(shifted).toEqual([
      12, 13, 14, 15,
      0, 1, 2, 3,
      4, 5, 6, 7,
      8, 9, 10, 11
    ]);
  });

  it('computes stage outputs for a 4x4 mesh shift', () => {
    const { rowShift, columnShift, afterRow, afterColumn } = computeShiftStages(16, 5);

    expect(rowShift).toBe(1);
    expect(columnShift).toBe(1);
    expect(afterRow).toEqual([
      3, 0, 1, 2,
      7, 4, 5, 6,
      11, 8, 9, 10,
      15, 12, 13, 14
    ]);
    expect(afterColumn).toEqual([
      15, 12, 13, 14,
      3, 0, 1, 2,
      7, 4, 5, 6,
      11, 8, 9, 10
    ]);
  });

  it('computes mesh and ring step counts', () => {
    expect(computeMeshSteps(16, 5)).toBe(2);
    expect(computeRingSteps(16, 5)).toBe(5);
  });
});
