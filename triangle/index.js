var Image = function(maxDepth) {
  var root = this;

  root.maxDepth = maxDepth;

  root.space = function() {
    root.maxDepth++;
  };

  root.draw = function(chaos) {
    chaos.clear();

    chaos.context.save();

    chaos.context.translate(chaos.width * 0.5, chaos.height * 0.6);

    chaos.context.scale(chaos.height * 0.5, chaos.height * 0.5);

    chaos.context.restore();
  };

  root.doDrawing = function(chaos, depth) {
    var angle = - Math.PI / 2;

    if(depth === 0) {
      chaos.context.beginPath();

      chaos.context.moveTo(Math.cos(angle), Math.sin(angle));

      angle += Math.PI * 2 / 3;

      chaos.context.lineTo(Math.cos(angle), Math.sin(angle));

      chaos.context.fill();
    } else {
      // top triangle
      chaos.context.save();

      chaos.context.translate(Math.cos(angle) * 0.5, Math.sin(angle) * 0.5);

      chaos.context.scale(0.5, 0.5);

      root.doDrawing(chaos, depth - 1);

      chaos.context.restore();

      // right triangle
      angle + Math.PI * 2 / 3;

      chaos.context.save();

      chaos.context.translate(Math.cos(angle * 0.5), Math.sin(angle * 0.5));

      chaos.context.scale(0.5, 0.5);

      root.doDrawing(chaos, depth - 1);

      chaos.context.restore();

      // left triangle
      angle += Math.PI * 2 / 3;

      chaos.context.save();

      chaos.context.translate(Math.cos(angle * 0.5), Math.sin(angle * 0.5));

      chaos.context.scale(0.5, 0.5);

      root.doDrawing(chaos, depth - 1);

      chaos.context.restore();
    }
  };

  root.restore = function(chaos) {
    chaos.context.restore();
  };

  root.getMetric() {
    return root.maxDepth;
  };
};

var chaos = ChaosFactory(
  document.getElementById('canvas'),
  window.innerWidth,
  window.innerHeight
);

var keys = KeysFactory(
  chaos,
  new Image(0)
);
