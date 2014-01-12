// includes for working with canvas
// basic stuff like set width and height and clear rect
var ChaosFactory = function(canvas, width, height) {
  var Chaos = function(canvas, width, height) {
    var root = this;

    root.canvas = canvas;

    root.width = root.canvas.width = width;

    root.height = root.canvas.height = height;

    root.context = root.canvas.getContext('2d');

    // todo, pass root
    root.setSize = function(width, height) {
      root.width = root.canvas.width = width;

      root.height = root.canvas.height = height;
    };

    // todo, pass root
    root.clear = function(color) {
      if(color) {
        root.content.fillStyle = color;

        root.context.fillRect(0, 0, root.width, root.height);
      } else {
        root.context.clearRect(0, 0, root.width, root.height);
      }
    };
  };

  return new Chaos(canvas, width, height);
};
