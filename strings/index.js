var Image = function(
  maxIter
) {
  var root = this;

  root.maxIter = maxIter;

  root.space = function() {
  };

  root.draw = function(chaos) {
    var vocabulary = 'AB';

    var seed = 'A', newString = '';

    var rules = {};

    rules['A'] = 'AB';

    rules['B'] = 'A';

    for(var i = 0; i < root.maxIter; i++) {
      newString = '';

      for(var j = 0; j < seed.length; j++) {
        var replace = rules[seed.charAt(j)];

        newString += replace;
      }

      seed = newString;

      console.log('seed>>>', seed);
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
