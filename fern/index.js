var Image = function(
  table.
  currentPoint,
  scale.
  pointSize,
  interval
) {
  var root = this;

  root.table = table;

  root.currentPoint = currentPoint;

  root.scale = scale;

  root.pointSize = pointSize;

  root.interval = interval;

  root.space = function() {
  };

  root.draw = function(chaos) {
    chaos.context.translate(chaos.width / 2, chaos.height);

    chaos.context.scale(root.scale, -root.scale);

    chaos.context.beginPath();
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
