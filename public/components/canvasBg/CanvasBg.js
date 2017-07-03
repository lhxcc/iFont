/**
 * Created by yaoguofeng on 2017/07/03.
 */
var canvas = document.querySelector('#page_bg'),
  ctxBg = canvas.getContext('2d');
  canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
ctxBg.lineWidth = .3;
ctxBg.strokeStyle = (new Color(20)).style;

var mousePosition = {
  x: 30 * canvas.width / 100,
  y: 30 * canvas.height / 100
};

var dots = {
  nb: 200,
  distance: 60,
  d_radius: 80,
  array: []
};

function colorValue(min) {
  return Math.floor(Math.random() * 255 + min);
}

function createColorStyle(r,g,b) {
  return 'rgba(' + r + ',' + g + ',' + b + ', 0.8)';
}

function mixComponents(comp1, weight1, comp2, weight2) {
  return (comp1 * weight1 + comp2 * weight2) / (weight1 + weight2);
}

function averageColorStyles(dot1, dot2) {
  var color1 = dot1.color,
    color2 = dot2.color;

  var r = mixComponents(color1.r, dot1.radius, color2.r, dot2.radius),
    g = mixComponents(color1.g, dot1.radius, color2.g, dot2.radius),
    b = mixComponents(color1.b, dot1.radius, color2.b, dot2.radius);
  return createColorStyle(Math.floor(r), Math.floor(g), Math.floor(b));
}

function Color(min) {
  min = min || 0;
  this.r = colorValue(min);
  this.g = colorValue(min);
  this.b = colorValue(min);
  this.style = createColorStyle(this.r, this.g, this.b);
}

function Dot(){
  this.x = Math.random() * canvas.width;
  this.y = Math.random() * canvas.height;

  this.vx = -.5 + Math.random();
  this.vy = -.5 + Math.random();

  this.radius = Math.random() * 2;

  this.color = new Color();
  console.log(this);
}

Dot.prototype = {
  draw: function(){
    ctxBg.beginPath();
    ctxBg.fillStyle = this.color.style;
    ctxBg.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctxBg.fill();
  }
};

function createDots(){
  for(var i = 0; i < dots.nb; i++){
    dots.array.push(new Dot());
  }
}

function moveDots() {
  for(var i = 0; i < dots.nb; i++){

    var dot = dots.array[i];

    if(dot.y < 0 || dot.y > canvas.height){
      dot.vx = dot.vx;
      dot.vy = - dot.vy;
    }
    else if(dot.x < 0 || dot.x > canvas.width){
      dot.vx = - dot.vx;
      dot.vy = dot.vy;
    }
    dot.x += dot.vx;
    dot.y += dot.vy;
  }
}

function connectDots() {
  for(var i = 0; i < dots.nb; i++){
    for(var j = 0; j < dots.nb; j++){
      var i_dot = dots.array[i];
      var j_dot = dots.array[j];

      if((i_dot.x - j_dot.x) < dots.distance && (i_dot.y - j_dot.y) < dots.distance && (i_dot.x - j_dot.x) > - dots.distance && (i_dot.y - j_dot.y) > - dots.distance){
        if((i_dot.x - mousePosition.x) < dots.d_radius && (i_dot.y - mousePosition.y) < dots.d_radius && (i_dot.x - mousePosition.x) > - dots.d_radius && (i_dot.y - mousePosition.y) > - dots.d_radius){
          ctxBg.beginPath();
          ctxBg.strokeStyle = averageColorStyles(i_dot, j_dot);
          ctxBg.moveTo(i_dot.x, i_dot.y);
          ctxBg.lineTo(j_dot.x, j_dot.y);
          ctxBg.stroke();
          ctxBg.closePath();
        }
      }
    }
  }
}

function drawDots() {
  for(var i = 0; i < dots.nb; i++){
    var dot = dots.array[i];
    dot.draw();
  }
}

function animateDots() {
  ctxBg.clearRect(0, 0, canvas.width, canvas.height);
  moveDots();
  connectDots();
  drawDots();

  requestAnimationFrame(animateDots);
}


createDots();
requestAnimationFrame(animateDots);
