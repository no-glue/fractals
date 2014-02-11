var Image = function(
  numPoints,
  r,
  pointSize,
  radius
) {
  var root = this;

  root.numPoints = numPoints;

  root.r = r;

  root.pointSize = pointSize;

  root.radius = radius;

  root.points = [];

  root.currentPoint = {};

  root.space = function() {
  };

  root.draw = function(chaos) {
    if(!root.points.length) {
      chaos.context.translate(chaos.width / 2, chaos.height / 2);

      for(var i = 0, len = root.numPoints; i < len; i++) {
        var angle = Math.PI * 2 / numPoints * i;

        root.points.push({
          x: Math.cos(angle) * root.radius,
          y: Math.sin(angle) * root.radius
        });

        chaos.context.beginPath();

        chaos.context.arc(root.points[i].x, root.points[i].y, root.pointSize, 0, Math.PI * 2, false);

        chaos.context.fill();
      }

      root.currentPoint = {
        x: Math.random() * root.radius * 2 - root.radius,
        y: Math.random() * root.radius * 2 - root.radius
      };

      console.log('root.points', root.points);
    }
  };

  root.doDrawing = function(chaos, depth) {
    var randomPoint = root.points[Math.floor(Math.random() * root.numPoints)];

    console.log('currentPoint', root.currentPoint, randomPoint, root.points);


    var newPoint = {
      x: (root.currentPoint.x + randomPoint.x) * root.r,
      y: (root.currentPoint.y + randomPoint.y) * root.r
    };

    chaos.context.beginPath();

    chaos.context.arc(newPoint.x, newPoint.y, pointSize, 0, Math.PI * 2, false);

    chaos.context.fill();

    root.currentPoint = newPoint;
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
  new Image(3, .5, 3, chaos.height * .45)
);
