const normalizeShift = (shift, size) => ((shift % size) + size) % size;

export function getMeshSize(p) {
  return Math.sqrt(p);
}

export function buildInitialData(p) {
  return Array.from({ length: p }, (_, index) => index);
}

export function applyRowShift(data, size, shift) {
  const normalized = normalizeShift(shift, size);
  const next = Array(data.length);

  for (let row = 0; row < size; row += 1) {
    for (let col = 0; col < size; col += 1) {
      const srcIndex = row * size + col;
      const destCol = (col + normalized) % size;
      const destIndex = row * size + destCol;
      next[destIndex] = data[srcIndex];
    }
  }

  return next;
}

export function applyColumnShift(data, size, shift) {
  const normalized = normalizeShift(shift, size);
  const next = Array(data.length);

  for (let row = 0; row < size; row += 1) {
    for (let col = 0; col < size; col += 1) {
      const srcIndex = row * size + col;
      const destRow = (row + normalized) % size;
      const destIndex = destRow * size + col;
      next[destIndex] = data[srcIndex];
    }
  }

  return next;
}

export function computeShiftStages(p, q) {
  const size = getMeshSize(p);
  const rowShift = normalizeShift(q, size);
  const columnShift = Math.floor(q / size);
  const initial = buildInitialData(p);
  const afterRow = applyRowShift(initial, size, rowShift);
  const afterColumn = applyColumnShift(afterRow, size, columnShift);

  return {
    size,
    rowShift,
    columnShift,
    initial,
    afterRow,
    afterColumn
  };
}

export function computeMeshSteps(p, q) {
  const size = getMeshSize(p);
  const rowShift = normalizeShift(q, size);
  const columnShift = Math.floor(q / size);
  return rowShift + columnShift;
}

export function computeRingSteps(p, q) {
  return Math.min(q, p - q);
}
