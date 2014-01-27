var Image = function(
  maxDepth,
  angles,
  scaleFactor
) {
  var root = this;

  root.maxDepth = maxDepth;

  root.angles = angles;

  root.scaleFactor = scaleFactor;

  root.space = function() {
    root.maxDepth++;
  };

  root.draw = function(chaos) {
    chaos.clear();

    chaos.context.lineWidth = 2;

    chaos.context.save();

    // starting drawing place
    chaos.context.translate(chaos.width * 0.5, chaos.height * 0.9);
  };

  root.doDrawing = function(chaos, depth, size, angle) {
    if(typeof size === 'undefined') {
      size = chaos.height * .5;

      angle = 0;
    }

    chaos.context.save();

    chaos.context.strokeStyle = (!depth) ? 'rgba(0, 255, 0, 1)' : 'rgba(0, 0, 0, 1)';

    chaos.context.rotate(angle);

    chaos.context.beginPath();

    chaos.context.moveTo(0, 0);

    // short trunk
    chaos.context.lineTo(0, -size * (1 - root.scaleFactor));

    chaos.context.stroke();

    chaos.context.translate(0, -size * (1 - root.scaleFactor));

    if(depth === 0) {
      // we're done, draw branches
      for(var i = 0; i < root.angles.length; i++) {
        chaos.context.save();

        chaos.context.rotate(root.angles[i]);

        chaos.context.beginPath();

        chaos.context.moveTo(0, 0);

        // long branch
        chaos.context.lineTo(0, -size * root.scaleFactor);

        chaos.context.stroke();

        chaos.context.restore();
      }
    } else {
      root.doDrawing(chaos, depth - 1, size * scaleFactor, root.angles[0]);

      root.doDrawing(chaos, depth - 1, size * scaleFactor, root.angles[1]);
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
  new Image(0, [-Math.PI / 3 * Math.random(), Math.PI / 3 * Math.random()], 0.55 + 0.25 * Math.random())
);
