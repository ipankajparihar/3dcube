const cube = document.getElementById("cube");
const colorPicker = document.getElementById("colorPicker");
const speedSlider = document.getElementById("speedSlider");
const shadow = document.querySelector(".shadow");
const breakCheckbox = document.getElementById("breakCheckbox");

let isDragging = false;
let startX, startY;
let rotateX = 0;
let rotateY = 0;
let autoRotate = true;
let rotationSpeed = parseFloat(speedSlider.value);

// Update cube transform
const updateTransform = () => {
  cube.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
};

// Mouse drag interaction
document.addEventListener("mousedown", (e) => {
  isDragging = true;
  autoRotate = false;
  startX = e.clientX;
  startY = e.clientY;
});

document.addEventListener("mouseup", () => {
  isDragging = false;
  setTimeout(() => (autoRotate = true), 300);
});

document.addEventListener("mousemove", (e) => {
  if (!isDragging) return;
  const deltaX = e.clientX - startX;
  const deltaY = e.clientY - startY;

  rotateY += deltaX * 0.5;
  rotateX -= deltaY * 0.5;

  updateTransform();
  startX = e.clientX;
  startY = e.clientY;
});

// Color picker control
colorPicker.addEventListener("input", (e) => {
  const color = e.target.value;
  document.documentElement.style.setProperty("--glow-color", color);
  shadow.style.background = color;
});

// Rotation speed control
speedSlider.addEventListener("input", (e) => {
  rotationSpeed = parseFloat(e.target.value);
});

//break faces
breakCheckbox.addEventListener("change", (e) => {
  if (e.target.checked) {
    cube.classList.add("broken");
  } else {
    cube.classList.remove("broken");
  }
});

const animate = () => {
  if (autoRotate) {
    rotateY += rotationSpeed;
    rotateX += rotationSpeed * 0.25;
    updateTransform();
  }
  requestAnimationFrame(animate);
};

animate();
