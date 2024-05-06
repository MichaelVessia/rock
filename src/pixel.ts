import { PixelType } from "./enums";

export class Pixel {
  type: PixelType;

  constructor(type: PixelType) {
    this.type = type;
  }

  fight(other: Pixel): Pixel {
    if (this.type === other.type) {
      return this; // Draw
    } else if (
      (this.type === PixelType.Rock && other.type === PixelType.Scissors) ||
      (this.type === PixelType.Paper && other.type === PixelType.Rock) ||
      (this.type === PixelType.Scissors && other.type === PixelType.Paper)
    ) {
      return this; // This wins
    } else {
      return other; // Other wins
    }
  }
}
