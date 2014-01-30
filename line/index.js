var Image = function(
) {
  var root = this;

  root.points = [];

  root.offset = 0;

  root.space = function() {
  };

  root.draw = function(chaos) {
    chaos.clear();
  };

  root.doDrawing = function(chaos, depth) {
    if(!root.points.length) {
      root.points.push({
        x: 0,
        y: chaos.height / 2
      });

      root.points.push({
        x: chaos.width,
        y: chaos.height / 2
      });

      root.offset = chaos.height / 2;
    }

    var scaleFactor = 0.5;

    var newPoints = [];

    for(var i = 0; i < root.points.length - 1; i++) {
      var p0 = root.points[i], p1 = root.points[i + 1], newPoint = {x: (p0.x + p1.x) / 2, y: (p0.y + p1.y) / 2};

      newPoint.x += 2 * root.offset * Math.random() - root.offset;

      newPoint.y += 2 * root.offset * Math.random() - root.offset;

      newPoints.push(p0, newPoint);
    }

    newPoints.push(root.points[root.points.length - 1]);

    root.points = newPoints;

    root.offset *= scaleFactor;

    chaos.context.lineWidth = 2;

    chaos.context.beginPath();

    chaos.context.moveTo(root.points[0].x, root.points[0].y);

    for(var i = 1; i < root.points.length; i++) {
      chaos.context.lineTo(root.points[i].x, root.points[i].y);
    }

    chaos.context.stroke();
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
  new Image(0, Math.random() * Math.PI / 4)
);
