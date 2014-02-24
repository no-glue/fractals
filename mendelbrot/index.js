var Image = function(
  currentX,
  stripeWidth,
  minR,
  maxR,
  minI,
  maxI,
  maxIter
) {
  var root = this;

  root.currentX = currentX;

  root.stripeWidth = stripeWidth;

  root.minR = minR;

  root.maxR = maxR;

  root.minI = minI;

  root.maxI = maxI;

  root.maxIter = maxIter;

  root.space = function() {
  };

  root.draw = function(chaos) {
    var x, 
    y, 
    h, 
    color, 
    index,
    w4 = chaos.width * 4,
    imageData = chaos.context.getImageData(0, 0, chaos.width, chaos.height),
    iData = imageData.data;

    var w = root.maxR - root.minR, 
    // width on complex plane
    h = root.maxI - root.minI, 
    // height on complex plane
    newW = h * (chaos.width / chaos.height), 
    // width with correct aspect ratio
    diff = newW - w; 
    // difference to equal new width

    root.minR -= diff / 2; 
    // add half difference to left

    root.maxR += diff / 2;
    // and half to right

    dr = (root.maxR - root.minR) / chaos.width; 
    // one pixel's width on complex plane

    di = (root.maxI - root.minI) / chaos.height;
    // one pixel's height on complex plane

    while(true) {
      x = root.currentX;
      console.log('x>>>', x);

      if(x > chaos.width) break;

      // work across the strip horizontally
      for(; x < root.currentX + root.stripWidth && x < chaos.width; x += 1) {
        index = x * 4;
        // render all the pixels in this vertical column
        for(y = 0, h = chaos.height; y < h; y += 1) {
          var cr = root.minR + x * dr, 
          ci = root.minI + y * di, 
          zr = 0, 
          zi = 0, 
          iter, 
          zr1, 
          zi1, 
          shade;

          for(iter = 0; iter < root.maxIter; iter++) {
            zr1 = zr * zr - zi * zi + cr;

            zi1 = 2 * zr * zi + ci;

            zr = zr1;

            zi = zi1;

            if(zr * zr + zi * zi > 4) shade = 255 - Math.floor(iter / root.maxIter * 255);
          }

          iData[index    ] = shade;

          iData[index + 1] = shade;

          iData[index + 2] = shade;

          iData[index + 3] = 255;
        
          index += w4;
        }
      }

      chaos.context.putImageData(imageData, 0, 0, root.currentX, 0, root.stripWidth, chaos.height);

      root.currentX += root.stripWidth;
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
    0,
    50,
    -2,
    1,
    -1.2,
    1.2,
    100
  )
);
