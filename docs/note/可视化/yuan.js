/*
 * @message: 描述
 * @Author: Roy
 * @Email: @163.com
 * @Github: @163.com
 * @Date: 2020-09-04 23:47:36
 * @LastEditors: Roy
 * @LastEditTime: 2020-09-05 00:05:08
 * @Deprecated: 否
 * @FilePath: /my_blog/docs/note/可视化/yuan.js
 */
import {parametric} from './parametric.js';

const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");
const {width, height} = canvas;
const w = 0.5 * width,
  h = 0.5 * height;
  context.translate(w, h);
  context.scale(1, -1);
// 抛物线参数方程
const para = parametric( t => 25 * t, t => 25 * t ** 2,);
// 绘制抛物线
para(-5.5, 5.5).draw(context);


//阿基米德螺旋线
const helical = parametric(
    (t,l) => t*l*Math.cos(t),
    (t,l) => t*l*Math.sin(t),
);

helical(0, 50, 500, 5).draw(context, {strokeStyle: 'blue'});

//星邢线

const star = parametric(
    (t, l) => l * Math.cos(t) ** 3,
    (t, l) => l * Math.sin(t) ** 3,
  );
  
  star(0, Math.PI * 2, 50, 150).draw(context, {strokeStyle: 'red'});



