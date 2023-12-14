let cnv = document.getElementById("myCanvas");
let ctx = cnv.getContext("2d");
cnv.width = 800;
cnv.height = 600;
let circles = [];
let rectangles = [];

function createRandomCircle() {
  let circle = {
    x: Math.random() * cnv.width,
    y: Math.random() * cnv.height,
    r: 25,
    speed: 1,
    color: "green",
  };
  circles.push(circle);
}

function createRandomRectangle() {
  let rectangle = {
    x: Math.random() * cnv.width,
    y: Math.random() * cnv.height,
    w: 50,
    h: 40,
    speed: 2,
    color: "red",
  };
  rectangles.push(rectangle);
}

function draw() {
  ctx.clearRect(0, 0, cnv.width, cnv.height);

  // Draw circles
  for (let i = 0; i < circles.length; i++) {
    let circle = circles[i];
    ctx.strokeStyle = circle.color;
    ctx.beginPath();
    ctx.arc(circle.x, circle.y, circle.r, 0, Math.PI * 2);
    ctx.stroke();
    ctx.closePath();
  }

  //move
  moveCircle();
  moveRectnagle();
  // Draw rectangles
  for (let i = 0; i < rectangles.length; i++) {
    let rectangle = rectangles[i];
    ctx.strokeStyle = rectangle.color;
    ctx.strokeRect(rectangle.x, rectangle.y, rectangle.w, rectangle.h);
  }
}

function removeClickedCircle(xMouse, yMouse) {
  for (let i = 0; i < circles.length; i++) {
    let circle = circles[i];

    let distance = Math.sqrt(
      (xMouse - circle.x) ** 2 + (yMouse - circle.y) ** 2
    );

    if (distance <= circle.r) {
      circles.splice(i, 1);
      if (circles.length === 0) {
        alert("Game Over - You WIN!");
        location.reload();
      }
    }
  }
}

function moveCircle() {
  for (let i = 0; i < circles.length; i++) {
    const circle = circles[i];
    circle.x += circle.speed;
    circle.y += circle.speed;
    if (circle.x + circle.r >= cnv.width || circle.x - circle.r < 0) {
      circle.speed *= -1;
    }
    if (circle.y + circle.r >= cnv.height || circle.y - circle.r < 0) {
      circle.speed *= -1;
    }
  }
}

function clickRedRect(xMouse, yMouse) {
  for (let i = 0; i < rectangles.length; i++) {
    let rectangle = rectangles[i];

    if (
      xMouse > rectangle.x &&
      xMouse < rectangle.x + rectangle.w &&
      yMouse > rectangle.y &&
      yMouse < rectangle.y + rectangle.h
    ) {
      alert("Game Over - You LOSE!");
      location.reload();
    }
  }
}
function moveRectnagle() {
  for (let i = 0; i < rectangles.length; i++) {
    const rectangle = rectangles[i];
    rectangle.x += rectangle.speed;
    rectangle.y += rectangle.speed;
    if (rectangle.x + rectangle.w < 0) {
      rectangle.x = cnv.width;
    } else if (rectangle.x > cnv.width) {
      rectangle.x = -rectangle.w;
    }

    if (rectangle.y + rectangle.h < 0) {
      rectangle.y = cnv.height;
    } else if (rectangle.y > cnv.height) {
      rectangle.y = -rectangle.h;
    }
  }
}

// Mouse click event listener
cnv.addEventListener("click", function (event) {
  let mouseX = event.clientX - cnv.getBoundingClientRect().left;
  let mouseY = event.clientY - cnv.getBoundingClientRect().top;

  clickRedRect(mouseX, mouseY);

  removeClickedCircle(mouseX, mouseY);
});

// Generate random circles and rectangles
for (let i = 0; i < 30; i++) {
  createRandomCircle();
}
for (let i = 0; i < 20; i++) {
  createRandomRectangle();
}

// Main game loop
function gameLoop() {
  draw();

  requestAnimationFrame(gameLoop);
}

gameLoop();
