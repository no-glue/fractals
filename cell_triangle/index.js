var Image = function(
) {
  var root = this;

  root.space = function() {
  };

  root.draw = function(chaos) {
    var index = Math.round(chaos.width / 2), i, lines = 0;

    currentRow = [];

    currentRow[index] = true;

    for(i = 0; i < chaos.width; i++) {
      if(typeof currentRow[i] === 'undefined') currentRow[i] = false;
    }

    nextRow = [];

    for(var line = 1024; line >= lines; line--) {
      for(i = 0; i < chaos.width; i++) {
        if(currentRow[i - 1] && !currentRow[i + 1]) {nextRow[i] = true;}
        else if(!currentRow[i - 1] && currentRow[i + 1]) {nextRow[i] = true;}
        else nextRow[i] = false;

      }

      currentRow = nextRow;

      for(var row = 0; row < chaos.width; row++) {
        if(currentRow[row]) chaos.context.fillRect(row, line, 1, 1);
      }
    }
  };

  root.doDrawing = function(chaos, depth) {
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
