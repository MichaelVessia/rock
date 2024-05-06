import { Pixel } from "./pixel";

export class Grid {
  pixels: Pixel[][];

  constructor(rows: number, cols: number) {
    this.pixels = [];

    // Initialize grid randomly.
    // Would be cool to see what happens if we pre-seeded in interesting ways?
    for (let i = 0; i < rows; i++) {
      this.pixels[i] = [];
      for (let j = 0; j < cols; j++) {
        const type = Math.floor(Math.random() * 3); // Randomly assign type
        this.pixels[i][j] = new Pixel(type);
      }
    }
  }

  fight(): void {
    const numRows = this.pixels.length;
    const numCols = this.pixels[0].length;

    for (let i = 0; i < numRows; i++) {
      for (let j = 0; j < numCols; j++) {
        const currentPixel = this.pixels[i][j];
        const opponent = this.getRandomNeighbor(i, j);
        const winner = currentPixel.fight(opponent);
        this.pixels[i][j] = winner;
      }
    }
  }

  getRandomNeighbor(row: number, col: number): Pixel {
    const numRows = this.pixels.length;
    const numCols = this.pixels[0].length;

    let randomRow, randomCol;
    do {
      randomRow = row + Math.floor(Math.random() * 3) - 1; // Random row within 1 cell of current row
      randomCol = col + Math.floor(Math.random() * 3) - 1; // Random column within 1 cell of current column
    } while (
      (randomRow === row && randomCol === col) || // Exclude current cell
      randomRow < 0 ||
      randomRow >= numRows || // Out of bounds check
      randomCol < 0 ||
      randomCol >= numCols
    );

    return this.pixels[randomRow][randomCol];
  }
}
