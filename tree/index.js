var Image = function(
  maxDepth,
  angles
) {
  var root = this;

  root.maxDepth = maxDepth;

  root.angles = angles;

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
      size = chaos.height * .8;

      angle = 0;
    }

    chaos.context.save();

    chaos.context.rotate(angle);

    chaos.context.beginPath();

    chaos.context.moveTo(0, 0);

    chaos.context.lineTo(0, -size / 2);

    chaos.context.stroke();

    chaos.context.translate(0, -size / 2);

    if(depth === 0) {
      // we're done, draw branches
      for(var i = 0; i < root.angles.length; i++) {
        chaos.context.save();

        chaos.context.rotate(root.angles[i]);

        chaos.context.beginPath();

        chaos.context.moveTo(0, 0);

        chaos.context.lineTo(0, -size);

        chaos.context.stroke();

        chaos.context.restore();
      }
    } else {
      root.doDrawing(chaos, depth - 1, size / 2, root.angles[0]);

      root.doDrawing(chaos, depth - 1, size / 2, root.angles[1]);
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
  new Image(0, [-Math.PI / 4, Math.PI / 4], 0)
);
