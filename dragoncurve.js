import {Vector} from "./vector.mjs";

class DragonCurve {
  constructor() {
    this.curve = [];
    this.minX = -10;
    this.maxX = 10;
    this.minY = -10;
    this.maxY = 10;
    this.end = null;
  }

  init() {
    this.push(new Vector(0, 0));
    this.push(new Vector(0, 1));
    // this.push(new Vector(0.5, 1));
  }

  clone() {
    const dragonCurve = new DragonCurve();
    for (const vector of this.curve) {
      dragonCurve.push(vector.clone());
    }
    return dragonCurve;
  }

  push(vector) {
    this.curve.push(vector);
    this.minX = Math.min(this.minX, vector.x - 10);
    this.maxX = Math.max(this.maxX, vector.x + 10);
    this.minY = Math.min(this.minY, vector.y - 10);
    this.maxY = Math.max(this.maxY, vector.y + 10);
    this.end = vector.clone();
  }

  fold() {
    const end = this.getEnd();
    for (let i = this.curve.length - 2; i >= 0; i--) {
      this.push(this.curve[i].clone().rotateAround(end, Math.PI / 2));
    }
  }

  getEnd() {
    return this.end;
  }

  draw(ctx, reverse) {
    ctx.beginPath();

    if (reverse) {
      for (let i = this.curve.length - 1; i >= 0; i--) {
        // go backwards from end
        const vector = this.end.clone().subVec(this.curve[i]);
        if (i === this.curve.length - 1)
          ctx.moveTo(-vector.x, -vector.y);
        else
          ctx.lineTo(-vector.x, -vector.y);
      }
    } else {
      for (let i = 0; i < this.curve.length; i++) {
        const vector = this.curve[i];
        if (i === 0) ctx.moveTo(vector.x, vector.y);
        else ctx.lineTo(vector.x, vector.y);
      }
    }

    ctx.stroke();
  }
}

export {DragonCurve};