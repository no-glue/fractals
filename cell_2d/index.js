var Image = function(
  rule,
  cellSize,
  cols,
  rows,
  currentGrid
) {
  var root = this;

  root.rule = rule;

  root.cellSize = cellSize;

  root.cols = cols;

  root.rows = rows;

  root.currentGrid = currentGrid;

  root.space = function() {
  };

  root.draw = function(chaos) {
    if(!root.rule) root.rule = 210;

    if(!root.cellSize) root.cellSize = 5;

    if(!root.cols) root.cols = Math.floor(chaos.width / root.cellSize);

    if(!root.rows) root.rows = Math.floor(chaos.height / root.cellSize);

    if(!root.currentGrid) {
      root.currentGrid = [];

      for(var i = 0; i < root.cols; i++) root.currentGrid[i] = [];

      root.currentGrid[Math.round(root.cols / 2)][Math.round(root.rows / 2)] = 1;
    }
  };

  root.doDrawing = function(chaos, depth) {
    var x, y, state = 0, nextGrid = [];

    chaos.clear();

    for(x = 0; x < root.cols; x++) {
      for(y = 0; y < root.rows; y++) {
        if(root.currentGrid[x][y]) {
          chaos.context.fillRect(x * root.cellSize, y * root.cellSize, root.cellSize, root.cellSize);
        }
      }
    }

    for(var i = 0; i < root.cols; i++) nextGrid[i] = [];

    for(x = 0; x < root.cols; x++) {
      for(y = 0; y < root.rows; y++) {
        state = 0;
        
        if(!x) state += root.currentGrid[root.cols - 1][y] || 0;
        else state += root.currentGrid[x - 1][y] || 0;

        if(x === root.cols - 1) state += root.currentGrid[0][y] || 0;
        else state += root.currentGrid[x + 1][y] || 0;

        if(!y) state += root.currentGrid[x][root.rows - 1] || 0;
        else state += root.currentGrid[x][y - 1] || 0;

        if(y === root.rows - 1) state += root.currentGrid[x][0] || 0;
        else state += root.currentGrid[x][y + 1] || 0;

        if(root.currentGrid[x][y]) state += 5;

        if(root.rule & (1 << state)) {
          nextGrid[x][y] = 1;
        }
      }
    }

    root.currentGrid = nextGrid;
  };

  root.restore = function(chaos) {
    chaos.context.restore();
  };

  root.getMetric = function() {
    return root.maxDepth;
  };
};

var chaos = ChaosFactory(
  document.getElementById('canvas'),
  window.innerWidth,
  window.innerHeight
);

// - rotate right
// + rotate left
var keys = KeysFactory(
  chaos,
  new Image()
);
