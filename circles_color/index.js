var Image = function(
  maxDepth, 
  numShapes, 
  angles, 
  size, 
  distance, 
  scaleFactor) {
  var root = this;

  root.maxDepth = maxDepth;

  root.numShapes = numShapes;

  root.angles = angles;

  root.size = size;

  root.distance = distance;

  root.scaleFactor = scaleFactor;

  root.space = function() {
    root.maxDepth ++;
  };

  root.draw = function(chaos) {
    chaos.clear();

    chaos.context.save();

    // first circle in screen middle
    chaos.context.translate(chaos.width * 0.5, chaos.height * 0.5);

    var r = 0, g = 0, b = 255;

    chaos.context.fillStyle = 'rgba(' + r + ', ' + g + ', ' + b + ', 0.5)';

    chaos.context.beginPath();

    chaos.context.arc(0, 0, size, 0, Math.PI * 2, false);

    chaos.context.fill();
  };

  root.doDrawing = function(chaos, depth) {
    for(var i = 0; i < root.numShapes; i++) {
      chaos.context.save();

      chaos.context.rotate(root.angles[i]);

      chaos.context.translate(root.distance, 0);

      // circle size, scaled
      chaos.context.scale(scaleFactor, scaleFactor);

      var r =  Math.ceil(1.25 * (root.maxDepth - depth + 1) * 256) % 256, g = Math.ceil(1.5 * (root.maxDepth - depth + 1) * 256) % 256, b = Math.ceil(1.75 * (root.maxDepth - depth + 1) * 256) % 256;

      chaos.context.fillStyle = 'rgba(' + r + ', ' + g + ', ' + b + ', 0.5)';

      chaos.context.beginPath();

      chaos.context.arc(0, 0, size, 0, Math.PI * 2, false);

      chaos.context.fill();

      if(depth > 0) {
        root.doDrawing(chaos, depth - 1);
      }

      chaos.context.restore();
    }
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

var keys = KeysFactory(
  chaos,
  new Image(0, 3, [0, Math.PI * 2 / 3, Math.PI * 4 / 3], chaos.height / 8, chaos.height / 8 * 2, 0.5)
);
