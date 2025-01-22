export function createMatrix<Value>(args: {
  width: number;
  height: number;
  initialValue: (position: { x: number; y: number }) => Value;
}) {
  const matrix: Array<Array<Value>> = [];

  for (let y = 0; y < args.height; y++) {
    const row: Array<Value> = [];

    for (let x = 0; x < args.width; x++) {
      row.push(args.initialValue({ x, y }));
    }

    matrix.push(row);
  }

  return matrix;
}
