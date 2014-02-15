// work with image keys
// like redrawing
var KeysFactory = function(chaos, image) {
  var Keys = function(chaos, image) {
    var root = this;

    root.chaos = chaos;

    root.image = image;

    root.onLoad = function() {
      root.image.draw(root.chaos);

      root.image.doDrawing(root.chaos, root.image.getMetric());

      root.image.restore(root.chaos);

      document.body.addEventListener('keyup', function(event) {
        switch(event.keyCode) {
          case 32:
            // space
            root.image.space();

            root.image.draw(root.chaos);

            root.image.doDrawing(root.chaos, root.image.getMetric());

            root.image.restore(root.chaos);

            break;
          case 187:
            // +
            // use this to speed up drawing
            for(var i = 0; i < 1024; i++) {
              root.image.space();

              root.image.draw(root.chaos);

              root.image.doDrawing(root.chaos, root.image.getMetric());

              root.image.restore(root.chaos);
            }

            break;
          default:
            break;
        }
      });
    };

    root.onLoad();
  };

  return new Keys(chaos, image);
};
