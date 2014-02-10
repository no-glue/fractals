var Image = function(
) {
  var root = this;

  root.space = function() {
  };

  root.draw = function(chaos) {
    chaos.clear('#0033cc');

    if(!root.points.length) {
      for(var i = 0; i < root.initialPoints; i++) {
        var angle = Math.PI * 2 / root.initialPoints * i;

        root.points.push({
          x: Math.cos(angle) * root.radius,
          y: Math.sin(angle) * root.radius
        });
      }

      root.points.push(points[0]);
    }
  };

  root.doDrawing = function(chaos, depth) {
    var newPoints = [];

    for(var i = 1, len = root.points.length; i < len - 1; i++) {
      var p0 = root.points[i], 
      p1 = root.points[i + 1], 
      newPoint = {x: (p0.x + p1.x) / 2, y: (p0.y + p1.y) / 2};

      newPoint.x += Math.random() * root.offset * 2 - root.offset;

      newPoint.y += Math.random() * root.offset * 2 - root.offset;

      nwPoints.push(p0, newPoint);
    }

    newPoints.push(root.points[root.points.length - 1]);

    root.points = newPoints;

    root.offset *= root.scaleFactor;

    chaos.contex.save();

    chaos.context.translate(chaos.width / 2, chaos.height / 2);

    chaos.context.fillStyle = '#00cc00';

    chaos.context.beginPath();

    chaos.context.moveTo(root.points[0].x, root.points[0].y);

    for(var i = 1, len = root.points.length; i < len; i++) {
      chaos.context.lineTo(root.points[i].x, root.points[i].y);
    }

    chaos.context.fill();

    chaos.context.restore();
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
