var Image = function(maxDepth) {
  var root = this;

  root.maxDepth = maxDepth;

  // specifics
  root.p0 = {};

  root.p1 = {};

  root.p2 = {};

  root.space = function() {
    root.maxDepth++;
  };

  root.draw = function(chaos) {
    root.p0.x = chaos.width * 0.32;

    root.p0.y = chaos.height * 0.28;

    root.p1.x = chaos.width * 0.68;

    root.p1.y = chaos.height * 0.28;

    root.p2.x = root.p1.x + Math.cos(Math.PI * 2 / 3) * (root.p1.x - root.p0.x);

    root.p2.y = root.p1.y + Math.sin(Math.PI * 2 / 3) * (root.p1.x - root.p0.x);

    chaos.clear();

    chaos.context.lineWidth = 2;
  };

  root.doDrawing = function(chaos, depth) {
    // todo, export specifics
    root.flake(chaos, depth, root.p0, root.p1);
    root.flake(chaos, depth, root.p1, root.p2);
    root.flake(chaos, depth, root.p2, root.p0);
  };

  root.flake = function(chaos, depth, p0, p1) {
    if(typeof p0 === 'undefined') {
      // todo, can move specifics here
      p0 = root.p0;

      p1 = root.p1;
    }

    var dx = p1.x - p0.x,
      dy = p1.y - p0.y,
      distance = Math.sqrt(dx * dx + dy * dy),
      unit = distance / 3,
      angle = Math.atan2(dy, dx),
      pa = {},
      pb = {},
      pc = {};

    pa.x = p0.x + Math.cos(angle) * unit;

    pa.y = p0.y + Math.sin(angle) * unit;

    pb.x = pa.x + Math.cos(angle - Math.PI / 3) * unit;

    pb.y = pa.y + Math.sin(angle - Math.PI / 3) * unit;

    pc.x = p0.x + Math.cos(angle) * unit * 2;

    pc.y = p0.y + Math.sin(angle) * unit * 2;

    if(depth === 0) {
      // actual drawing
      chaos.context.beginPath();

      chaos.context.moveTo(p0.x, p0.y);

      chaos.context.lineTo(pa.x, pa.y);

      chaos.context.lineTo(pb.x, pb.y);

      chaos.context.lineTo(pc.x, pc.y);

      chaos.context.lineTo(p1.x, p1.y);

      chaos.context.stroke();
    } else {
      // just pushing
      root.flake(chaos, depth - 1, p0, pa);

      root.flake(chaos, depth -1, pa, pb);

      root.flake(chaos, depth - 1, pb, pc);

      root.flake(chaos, depth - 1, pc, p1);
    }
  };

  root.restore = function(chaos) {
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
  new Image(0)
);
