import { PixelType } from "./enums";
import { Grid } from "./grid";

// Function to get color for pixel type
function getColorForPixelType(type: PixelType): string {
  switch (type) {
    case PixelType.Rock:
      return "green";
    case PixelType.Paper:
      return "blue";
    case PixelType.Scissors:
      return "red";
    default:
      return "transparent";
  }
}

// Function to render the grid to the canvas
function renderGrid(grid: Grid, ctx: CanvasRenderingContext2D): void {
  const cellWidth = ctx.canvas.width / grid.pixels[0].length;
  const cellHeight = ctx.canvas.height / grid.pixels.length;

  for (let i = 0; i < grid.pixels.length; i++) {
    for (let j = 0; j < grid.pixels[i].length; j++) {
      const pixel = grid.pixels[i][j];
      const x = j * cellWidth;
      const y = i * cellHeight;

      ctx.fillStyle = getColorForPixelType(pixel.type);
      ctx.fillRect(x, y, cellWidth, cellHeight);
    }
  }
}

// Set up grid size
const numRows = 250;
const numCols = 250;

// Create a new grid
const grid = new Grid(numRows, numCols);

// Initialize the legend
const rock = document.getElementById("rock")!;
rock.style.color = getColorForPixelType(PixelType.Rock);
const paper = document.getElementById("paper")!;
paper.style.color = getColorForPixelType(PixelType.Paper);
const scissors = document.getElementById("scissors")!;
scissors.style.color = getColorForPixelType(PixelType.Scissors);

// Get the canvas element and its 2D rendering context
const canvas = document.getElementById("gameCanvas") as HTMLCanvasElement;
canvas.width = window.innerWidth * 0.75;
canvas.height = window.innerHeight * 0.75;
const ctx = canvas.getContext("2d")!;

// Function to start the simulation
function startSimulation(): void {
  // Render initial grid to the canvas
  renderGrid(grid, ctx);

  const renderingIntervalMs = 100;

  // Start the simulation loop
  const intervalId = setInterval(() => {
    grid.fight();
    renderGrid(grid, ctx);
  }, renderingIntervalMs);

  // Function to stop the simulation
  function stopSimulation(): void {
    clearInterval(intervalId);
    toggleButton.textContent = "Start Simulation";
    toggleButton.removeEventListener("click", stopSimulation);
    toggleButton.addEventListener("click", startSimulation);
  }

  // Add a click event listener to the button to stop the simulation
  const toggleButton = document.getElementById("toggleButton")!;
  toggleButton.textContent = "Stop Simulation";
  toggleButton.removeEventListener("click", startSimulation);
  toggleButton.addEventListener("click", stopSimulation);
}

// Add a click event listener to the button to start the simulation
const toggleButton = document.getElementById("toggleButton")!;
toggleButton.addEventListener("click", startSimulation);
