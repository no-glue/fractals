var Image = function(
  maxIter
) {
  var root = this;

  root.maxIter = maxIter;

  root.space = function() {
    root.maxIter += 1;
  };

  root.draw = function(chaos) {
    var vocabulary = 'XF+-[]', 
    seed = 'X', 
    transformedString = '',
    rules = {}, 
    commands = {}, 
    ch = '',
    x = chaos.width * 0.5, 
    y = chaos.height, 
    size = 10, 
    angle = -90, 
    turnAngle = 25, 
    stack = [];

    rules['X'] = 'F-[[X]+X]+F[+FX]-X';

    rules['F'] = 'FF';

    for(var iter = 0; iter < root.maxIter; iter++) {
      transformedString = '';

      for(var transform = 0; transform < seed.length; transform++) {
        ch = rules[seed.charAt(transform)];

        transformedString += (ch) ? ch : seed.charAt(transform);
      }

      seed = transformedString;
    }

    chaos.clear();

    chaos.context.beginPath();

    chaos.context.moveTo(x, y);

    for(var at = 0, len = seed.length; at < len; at++) {
      ch = seed.charAt(at);

      switch(ch) {
        case 'X':
        case 'F': 
          x += Math.cos(angle * Math.PI / 180) * size;
          y += Math.sin(angle * Math.PI / 180) * size;
          console.log('F>>>', x, Math.cos(angle * Math.PI / 180) * size, angle, y);
          break;
        case '+': angle += turnAngle; console.log('+', angle); break;
        case '-': angle -= turnAngle; console.log('-', angle); break;
        case '[': stack.push({x: x, y: y, angle: angle}); break;
        case ']': 
          var popped = stack.pop();

          if(popped) {
            x = popped.x;

            y = popped.y;

            angle = popped.angle;

            chaos.context.moveTo(x, y);
          }
        break;
      }

      chaos.context.lineTo(x, y);
    }

    chaos.context.stroke();
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
    1
  )
);
