let shapes = [];        // store shapes
let draggingShape = null; 
let bgColor;

let imgs = [];          // array for images
let imgs2 = [];          // second set of images
let currentImageSet = null; // which set we are using (null = shapes)

function preload() {
  // load three images (make sure these files exist in your project)
  imgs[0] = loadImage("PinkFlower.png");
  imgs[1] = loadImage("RedFlower.png");
  imgs[2] = loadImage("YellowFlower.png");
 
  imgs2[0] = loadImage("BaseBall.png");
  imgs2[1] = loadImage("soccer-ball.png");
  imgs2[2] = loadImage("basketball.png");
}

function setup() {
  createCanvas(600, 400);
  rectMode(CENTER);
  noStroke();
  bgColor = color(255); // start with black background
}

function draw() {
  background(bgColor);

  // draw all the shapes/images
  for (let i = 0; i < shapes.length; i++) {
    let s = shapes[i];

    if (s.type === "image") {
      imageMode(CENTER);
      image(s.img, s.x, s.y, s.size, s.size);
    } else {
      fill(s.color);
      if (s.type === "circle") {
        ellipse(s.x, s.y, s.size);
      } else if (s.type === "square") {
        rect(s.x, s.y, s.size, s.size);
      } else if (s.type === "triangle") {
        triangle(
          s.x, s.y - s.size / 2,
          s.x - s.size / 2, s.y + s.size / 2,
          s.x + s.size / 2, s.y + s.size / 2
        );
      }
    }
  }
}

function mousePressed() {
  // check if we clicked on a shape/image
  for (let i = shapes.length - 1; i >= 0; i--) {
    let s = shapes[i];
    if (dist(mouseX, mouseY, s.x, s.y) < s.size / 2) {
      draggingShape = s;
      return;
    }
  }

  // if F mode is active → place random image
  if (currentImageSet != null) {
    let img = random(currentImageSet);
    let newShape = {
      x: mouseX,
      y: mouseY,
      type: "image",
      size: random(50, 150),
      img: img
    };
    
    shapes.push(newShape);
  } else {
    // otherwise → place shape
    let newShape = {
      x: mouseX,
      y: mouseY,
      type: random(["circle", "square", "triangle"]),
      size: random(30, 150),
      color: color(random(50, 255), random(50, 255), random(50, 255))
    };
    shapes.push(newShape);
  }
}

function mouseDragged() {
  if (draggingShape != null) {
    draggingShape.x = mouseX;
    draggingShape.y = mouseY;
  }
}

function mouseReleased() {
  draggingShape = null;
}

// keys: SPACE clears, any other changes bg, F toggles image mode
function keyPressed() {
  if (key === ' ') {
    shapes = [];
  } else if (key === 'F' || key === 'f') {
    currentImageSet = imgs;  // use first set
  } else if (key === 'S' || key === 's') {
    currentImageSet = imgs2; // use second set
  } else {
    bgColor = color(random(255), random(255), random(255));
  }
}