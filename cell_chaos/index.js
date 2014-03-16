var Image = function(
) {
  var root = this;

  root.space = function() {
  };

  root.draw = function(chaos) {
    var cols = chaos.width, index = Math.round(cols / 2), currentRow = [], state, i, left, center, right, nextRow = [], lines = 1024, rule = 30;

    currentRow[index] = 1;

    for(var line = 0;line < lines;line++) {
      for(i = 0;i < cols;i++) {
        left = (i === 0) ? currentRow[cols - 1] || 0 : currentRow[i - 1] || 0;

        center = currentRow[i];

        right = (i === cols - 1) ? currentRow[0] || 0 : currentRow[i + 1] || 0;

        state = left << 2 | center << 1 | right;

        if(rule & (1 << state)) nextRow[i] = 1;
      }

      currentRow = nextRow;

      for(var i = 0; i < cols; i++) {
        if(currentRow[i]) chaos.context.fillRect(i, line, 1, 1);
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
