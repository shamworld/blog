/*
 * @message: 描述
 * @Author: Roy
 * @Email: @163.com
 * @Github: @163.com
 * @Date: 2020-09-02 15:33:08
 * @LastEditors: Roy
 * @LastEditTime: 2020-09-02 17:17:37
 * @Deprecated: 否
 * @FilePath: /my_blog/docs/note/躁动得小球/index.js
 */

 /*
  球得半径
  承载球得dom元素 div
  球得背景
  球得left
  球得top
  球得速度：speedX speedY
  */

function Circle(){
    this.div = document.createElement('div');
    this.r = randomInt(20,100);
    this.left = randomInt(0,1000);
    this.top = randomInt(0,600);
    this.speedX = randomInt(-6,6);
    this.speedY = randomInt(-6,6);
    this.bg = `rgba(${randomInt(0,255)},${randomInt(0,255)},${randomInt(0,255)},${Math.random()*0.6+0.4})`;
}

Circle.prototype.drawCircle = function(parent){
    this.parent = parent;
    var style = this.div.style;
    style.background = this.bg;
    style.top = this.top+'px';
    style.left = this.left+'px';
    style.width = this.r*2+'px';
    style.height = this.r*2+'px';

    parent.appendChild(this.div);


}

Circle.prototype.run = function(){
    var that = this;
    var maxLeft = this.parent.offsetWidth-this.r*2;
    var maxTop = this.parent.offsetHeight-this.r*2;
    setInterval(function(){
        var left = that.div.offsetLeft + that.speedX;
        var top = that.div.offsetTop + that.speedY;
        if (left<=0) {
            left = 0;
            that.speedX *= -1;
        }
        if (top<=0) {
           top = 0;
            that.speedY *= -1;
        }

        if (maxLeft<=left) {
            left = maxLeft;
            that.speedX *= -1;
        }
        if (maxTop<=top) {
            top = maxTop;
            that.speedY *= -1;
        }

        that.div.style.left = left+'px';
        that.div.style.top = top+'px';

    },20);
}


/**
 * 
 * @param {随机数开始} start 
 * @param {随机数结束} end 
 */
function randomInt(start, end){
    return parseInt(Math.random()*(end-start+1)+start);
}



