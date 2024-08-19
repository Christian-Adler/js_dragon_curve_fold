import {Vector} from "./vector.mjs";
import {lerpVec, scale} from "./utils.mjs";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');

let worldWidth = canvas.width;
let worldHeight = canvas.height;
let worldWidth2 = worldWidth / 2;
let worldHeight2 = worldHeight / 2;
let worldUpdated = true;

const updateWorldSettings = () => {
  if (worldHeight !== window.innerHeight || worldWidth !== window.innerWidth) {
    worldWidth = window.innerWidth;
    worldHeight = window.innerHeight;
    worldWidth2 = worldWidth / 2;
    worldHeight2 = worldHeight / 2;
    canvas.width = worldWidth;
    canvas.height = worldHeight;
    worldUpdated = true;
  }
};

updateWorldSettings();

const vec1 = new Vector(500, 100);
const vec2 = new Vector(400, 500);
let t = 0;

const update = () => {

  ctx.fillStyle = "white";
  ctx.strokeStyle = "white";
  ctx.lineWidth = 1;

  if (worldUpdated) {
    worldUpdated = false;
  }
  ctx.clearRect(0, 0, worldWidth, worldHeight);

  ctx.save();
  // ctx.translate(10, 0);

  const actTarget = lerpVec(vec1, vec2, t);
  ctx.beginPath();

  const yStart = scale(t, 0, 1, 100, -50);

  ctx.moveTo(0, yStart);
  ctx.lineTo(actTarget.x, actTarget.y);
  ctx.stroke();

  ctx.restore();

  t += 0.01;
  if (t > 1)
    t = 0;

  updateWorldSettings();

  requestAnimationFrame(update);
}

update();