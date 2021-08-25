/*
 * @message: 描述
 * @Author: Roy
 * @Email: @163.com
 * @Github: @163.com
 * @Date: 2020-09-05 17:13:13
 * @LastEditors: Roy
 * @LastEditTime: 2020-09-05 17:19:32
 * @Deprecated: 否
 * @FilePath: /my_blog/docs/note/可视化/dbx.js
 */
import {Vector2D} from './vector2D.js'
import {parametric} from './parametric.js';

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const points = [new Vector2D(0, 100)];
for (let i = 1; i <= 4; i++) {
    const p = points[0].copy().rotate(i * Math.PI * 0.4);
    points.push(p);
}


const polygon = [
    ...points,
];

// 绘制正五边形
ctx.save();
ctx.translate(128, 128);
draw(ctx, polygon);
ctx.restore();

const stars = [
    points[0],
    points[2],
    points[4],
    points[1],
    points[3],
];

// 绘制正五角星
ctx.save();
ctx.translate(356, 128);
draw(ctx, stars);
ctx.restore();




function draw(context, points, {
    fillStyle = 'black',
    close = false,
    rule = 'nonzero',
  } = {}) {
    context.beginPath();
    context.moveTo(...points[0]);
    for(let i = 1; i < points.length; i++) {
      context.lineTo(...points[i]);
    }
    if(close) context.closePath();
    context.fillStyle = fillStyle;
    context.fill(rule);
  }