import {DragonCurve} from "./dragoncurve.js";
import {lerp} from "./utils.mjs";

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

const dragonCurve = new DragonCurve();
dragonCurve.init();
let foldCounter = 0;
let movingDragonCurve = dragonCurve.clone();

let t = 0;
const tStep = 0.005;

let scaleFactor = 10;


const update = () => {

  ctx.fillStyle = "white";
  ctx.strokeStyle = "white";
  ctx.lineWidth = 0.1;
  ctx.lineCap = "round";

  if (worldUpdated) {
    worldUpdated = false;
  }
  ctx.clearRect(0, 0, worldWidth, worldHeight);

  ctx.save();

  const curveEnd = dragonCurve.getEnd();
  ctx.translate(worldWidth2, worldHeight2);
  const scaleVal = Math.min(worldWidth / scaleFactor, worldWidth / scaleFactor);
  ctx.scale(scaleVal, scaleVal);

  dragonCurve.draw(ctx);

  if (foldCounter < 18) {
    scaleFactor *= 1.0015;
    ctx.translate(curveEnd.x, curveEnd.y);
    ctx.strokeStyle = "red";
    t += tStep;
    if (t > 1) {
      t = 0;
      dragonCurve.fold();
      foldCounter++;
      movingDragonCurve = dragonCurve.clone();
    } else if (movingDragonCurve) {
      ctx.rotate(lerp(0, Math.PI / 2, t));
      movingDragonCurve.draw(ctx, true);
    }
  }


  ctx.restore();

  updateWorldSettings();

  requestAnimationFrame(update);
}

update();