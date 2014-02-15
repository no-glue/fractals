var Image = function(
  table,
  currentPoint,
  scale,
  pointSize,
  interval,
  setup,
  colors
) {
  var root = this;

  root.table = table;

  root.currentPoint = currentPoint;

  root.scale = scale;

  root.pointSize = pointSize;

  root.interval = interval;

  root.setup = setup;

  root.colors = colors;

  root.space = function() {
  };

  root.draw = function(chaos) {
    if(root.setup) {
      chaos.context.translate(chaos.width / 2, chaos.height);

      chaos.context.scale(root.scale, -root.scale);

      chaos.context.beginPath();

      chaos.context.arc(
        root.currentPoint.x,
        root.currentPoint.y,
        root.pointSize,
        0,
        Math.PI * 2,
        false
      );

      var fill = '';

      var quarter = [0, 2.5, 5, 7.5, 10];

      var y = root.currentPoint.y;

      quarter.push(y);

      quarter.sort();

      for(var i = 0, len = quarter.length; i < len; i++) {
        if(quarter[i] == y) {
          var q = (typeof quarter[i + 1] === 'undefined') ? quarter[i] : quarter[i + 1];

          fill = root.colors[q.toString()];

          break;
        }
      }

      chaos.context.fillStyle = fill;

      chaos.context.fill();

      root.setup = !root.setup;
    }
  };

  root.doDrawing = function(chaos, depth) {
    var transform = {};

    var random = Math.random();
    
    var row = {};

    for(var i = 0, len = root.table.length; i < len; i++) {
      row = root.table[i];

      if(random <= row.prob) break;

      random -= row.prob;
    }

    var x = root.currentPoint.x * row.change[0] + root.currentPoint.y * row.change[1] + row.change[4];

    var y = root.currentPoint.x * row.change[2] + root.currentPoint.y * row.change[3] + row.change[5];

    root.currentPoint.x = x;

    root.currentPoint.y = y;

    var fill = '';

    var quarter = [0, 2.5, 5, 7.5, 10];

    quarter.push(y);

    quarter.sort();

    for(var i = 0, len = quarter.length; i < len; i++) {
      if(quarter[i] == y) {
        var q = (typeof quarter[i + 1] === 'undefined') ? quarter[i] : quarter[i + 1];

        fill = root.colors[q.toString()];

        break;
      }
    }

    chaos.context.beginPath();

    chaos.context.arc(
      root.currentPoint.x,
      root.currentPoint.y,
      root.pointSize,
      0,
      Math.PI * 2,
      false
    );

    chaos.context.fillStyle = fill;

    chaos.context.fill();
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
    [
      {
        prob: 0.01,
        change: [0, 0, 0, 0.16, 0, 0]
      },
      {
        prob: 0.85,
        change: [0.85, 0.04, -0.04, 0.85, 0, 1.6]
      },
      {
        prob: 0.07,
        change: [0.2, -0.26, 0.23, 0.22, 0, 1.6]
      },
      {
        prob: 0.07,
        change: [-0.15, 0.28, 0.26, 0.24, 0, 0.44]
      },
    ],
    {
      x: Math.random() * 2 - 1,
      y: Math.random() * 2 - 1
    },
    70,
    0.1,
    0,
    true,
    {
      '0': '#00aa00',
      '2.5': '#00bb00',
      '5': '#00cc00',
      '7.5': '#00dd00',
      '10': '#00ee00'
    }
  )
);
