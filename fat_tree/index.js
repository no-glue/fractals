var Image = function(
  maxDepth,
  angle
) {
  var root = this;

  root.maxDepth = maxDepth;

  root.angle = angle;

  root.space = function() {
    root.maxDepth++;
  };

  root.draw = function(chaos) {
    chaos.clear();

    chaos.context.lineWidth = 2;

    // save so far
    chaos.context.save();

    chaos.context.translate(chaos.width * 0.5, chaos.height * 0.9);

    chaos.context.translate(-root.baseSize / 2, 0);
  };

  root.doDrawing = function(chaos, depth, size) {
    if(typeof size === 'undefined') size = chaos.height * .2;

    chaos.context.save();

    // draw trunk, a square
    chaos.context.beginPath();

    chaos.context.rect(0, 0, size, -size);

    chaos.context.fill();

    // get branch sizes
    var branch0Size = size * Math.cos(root.angle), branch1Size = size * Math.sin(root.angle);

    // move to top left of trunk
    // draw left branch
    chaos.context.translate(0, -size);

    chaos.context.rotate(-angle);

    if(depth === 0) {
      // draw left branch
      chaos.context.beginPath();

      chaos.context.rect(0, 0, branch0Size, -branch0Size);

      chaos.context.fill();
    } else {
      root.doDrawing(chaos, depth - 1, branch0Size);
    }

    // move top right corner of trunk
    // draw right branch
    chaos.context.translate(branch0Size, 0);

    chaos.context.rotate(Math.PI / 2);

    if(depth === 0) {
      // draw branch
      chaos.context.beginPath();

      chaos.context.rect(0, 0, branch1Size, -branch1Size);

      chaos.context.fill();
    } else {
      root.doDrawing(chaos, depth - 1, branch1Size);
    }

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
  new Image(0, Math.PI / 4)
);
