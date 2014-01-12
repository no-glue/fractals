// work with image keys
// like redrawing
var KeysFactory = function(chaos, image) {
  var Keys = function(chaos, image) {
    var root = this;

    root.chaos = chaos;

    root.image = image;

    root.onLoad = function() {
      root.image.draw();

      document.body.addEventListener('keyup', function(event) {
        switch(event.keyCode) {
          case 32:
            // space
            root.image.space();

            root.image.draw(root.chaos);

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
