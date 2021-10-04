const symbols = {
  0: ' ',
  1: '#',
};

const directions = [
  { x: 1, y: 0 },
  { x: -1, y: 0 },
  { x: 0, y: 1 },
  { x: 0, y: -1 },
];

const breadthFirstSearch = (maze, begin, end) => {
  const queue = [[begin]];
  const visited = [];
  while (queue.length) {
    const curr = queue.shift();
    const last = curr[curr.length - 1];
    if (last.x === end.x && last.y === end.y) {
      return curr;
    }
    directions.forEach(d => {
      const next = { x: last.x + d.x, y: last.y + d.y };
      if (visited.some(i => i.x === next.x && i.y === next.y)) return;
      if (!maze[next.y] || maze[next.y][next.x] !== 0) return;
      visited.push(next);
      queue.push([...curr, next]);
    });
  }
  return [];
}

const drawMaze = (maze, path) => {
  maze.forEach((row, y) => {
    const out = row.map((cell, x) => path.some(i => i.x === x && i.y === y) ? '.' : symbols[cell]).join('');
    console.log(out);
  });
};

const getRandomMaze = (width, height) => {
  const maze = [];
  for (let y = 0; y < height; y++) {
    maze[y] = [];
    for (let x = 0; x < width; x++) {
      maze[y][x] = Math.round(Math.random() * 0.75);
    }
  }
  return maze;
}

let maze;
let shortestPath;
while (true) {
  maze = getRandomMaze(78, 50);
  shortestPath = breadthFirstSearch(maze, { x: 0, y: 0 }, { x: 77, y: 49 });
  if (shortestPath.length) break;
}
drawMaze(maze, shortestPath);
