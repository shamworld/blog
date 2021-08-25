/*
 * @message: 描述
 * @Author: Roy
 * @Email: @163.com
 * @Github: @163.com
 * @Date: 2020-09-01 17:23:55
 * @LastEditors: Roy
 * @LastEditTime: 2020-09-01 22:46:30
 * @Deprecated: 否
 * @FilePath: /my_blog/docs/note/可视化/shuzi.js
 */
import {Vector2D} from './vector2D.js'

//坐标变换
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
ctx.translate(0,canvas.height);
ctx.scale(1,-1);
ctx.lineCap = 'round';

// context:canvas2d上下文
// v0起始向量
// length当前树枝长度
// thickness当前树枝的粗细
// dir当前树枝的方向，用与 x 轴的夹角表示，单位是弧度。
// bias 是一个随机偏向因子，用来让树枝的朝向有一定的随机性
 
function drawBranch(context, v0, length, thickness, dir, bias){
    // 创建一个单位向量 (1, 0)，它是一个朝向 x 轴，长度为 1 的向量。
    // 然后我们旋转 dir 弧度，再乘以树枝长度 length
    const v = new Vector2D().rotate(dir).scale(length);
    const v1 = v0.copy().add(v);

    context.lineWidth = thickness;
    context.beginPath();
    context.moveTo(...v0);
    context.lineTo(...v1);
    context.stroke();


    if(thickness>2){
        const left = Math.PI / 4 + (dir+0.2)*0.5 + bias*(Math.random()-0.5);
        const right = Math.PI / 4 + (dir-0.2)*0.5 + bias*(Math.random()-0.5);
        drawBranch(context,v1,length*0.9,thickness*0.8,left,bias*0.9);
        drawBranch(context,v1,length*0.9,thickness*0.8,right,bias*0.9);
    }
    if (thickness<5**Math.random()<0.3) {
        context.save();
        context.strokeStyle = '#c72c35';
        const th = Math.random()*6+3;
        context.lineWidth = th;
        context.moveTo(...v1);
        context.lineTo(v1.x,v1.y-2);
        context.stroke();
        context.restore();
    }

}

const v0 = new Vector2D(256, 0);
drawBranch(ctx, v0, 50, 10, Math.PI / 2, 3);
