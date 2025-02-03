import { Matrix, Vector2D } from "@/common/models/Math";

/**
 * Similar to `[start, ..., limit - 1].map(job)`.
 *
 * @param start Included!
 * @param limit Excluded!
 */
export function mapRange<Value>(start: number, limit: number, job: (index: number) => Value) {
  const result: Array<Value> = [];

  for (let i = start; i < limit; i++) {
    result.push(job(i));
  }

  return result;
}

export function createMatrix<Value>(args: {
  width: number;
  height: number;
  initialValue: (position: Vector2D) => Value;
}) {
  const matrix: Matrix<Value> = [];

  for (let y = 0; y < args.height; y++) {
    const row: Array<Value> = [];

    for (let x = 0; x < args.width; x++) {
      row.push(args.initialValue({ x, y }));
    }

    matrix.push(row);
  }

  return matrix;
}

export function rotateMatrixRight<Value>(matrix: Matrix<Value>) {
  const width = matrix[0].length;
  const height = matrix.length;

  const transpose = createMatrix({ width: height, height: width, initialValue: ({ x, y }) => matrix[x][y] });

  for (const row of transpose) {
    row.reverse();
  }

  return transpose;
}
