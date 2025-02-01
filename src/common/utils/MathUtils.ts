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

export function rotateMatrixRight<Value>(matrix: Array<Array<Value>>) {
  const width = matrix[0].length;
  const height = matrix.length;

  const transpose = createMatrix({ width: height, height: width, initialValue: ({ x, y }) => matrix[x][y] });

  for (const row of transpose) {
    row.reverse();
  }

  return transpose;
}
