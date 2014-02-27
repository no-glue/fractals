var Image = function(
  scale
) {
  var root = this;

  root.scale = scale;

  root.space = function() {
  };

  root.draw = function(chaos) {
    chaos.context.translate(chaos.width * .5, - chaos.height * .1);

    chaos.context.lineWidth = 0.35;

    var x = Math.random() - .5, y = Math.random() - .5, z = Math.random() - .5, a = 20, b = 8 / 3, c = 28;

    for(var i = 0; i < 2048; i++) {

      chaos.context.beginPath();

      chaos.context.moveTo(x * root.scale, z * root.scale);

      var x1, y1, z1, dt = .01;

      x1 = x + (a * (y - x)) * dt;

      y1 = y + (x * (c - z) - y) * dt;

      z1 = z + (x * y - b * z) * dt;

      x = x1;

      y = y1;

      z = z1;

      chaos.context.lineTo(x * root.scale, z * root.scale);

      chaos.context.stroke();
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
  new Image(
    16
  )
);
