// 全局变量
let frequency = 1.0;
let amplitude = 50;
let speed = 1.0;
let phase = 0;
let points = [];
let maxPoints = 200;

function setup() {
  // 创建画布并放置在指定容器中
  let canvas = createCanvas(700, 400);
  canvas.parent('canvas-container');
  
  // 初始化控制器
  document.getElementById('frequency').addEventListener('input', updateFrequency);
  document.getElementById('amplitude').addEventListener('input', updateAmplitude);
  document.getElementById('speed').addEventListener('input', updateSpeed);
  
  // 设置初始值
  updateFrequency();
  updateAmplitude();
  updateSpeed();
}

function draw() {
  background(240);
  
  // 更新相位
  phase += 0.05 * speed;
  
  // 绘制坐标轴
  drawAxis();
  
  // 绘制正弦波
  drawSineWave();
  
  // 绘制移动的点
  drawMovingPoint();
  
  // 绘制轨迹
  drawTrail();
}

function drawAxis() {
  stroke(150);
  strokeWeight(1);
  
  // x轴
  line(0, height/2, width, height/2);
  
  // y轴
  line(width/4, 0, width/4, height);
  
  // 刻度
  for (let i = 0; i <= width; i += 50) {
    line(i, height/2-5, i, height/2+5);
  }
  
  for (let i = 0; i <= height; i += 50) {
    line(width/4-5, i, width/4+5, i);
  }
}

function drawSineWave() {
  stroke(0, 120, 255);
  strokeWeight(2);
  noFill();
  
  beginShape();
  for (let x = 0; x < width; x++) {
    let xValue = map(x, 0, width, 0, TWO_PI * 4);
    let y = height/2 - amplitude * sin(frequency * xValue + phase);
    vertex(x, y);
  }
  endShape();
}

function drawMovingPoint() {
  // 计算圆上的点
  let angle = phase;
  let circleX = width/4;
  let circleY = height/2;
  let pointX = circleX + amplitude * cos(angle);
  let pointY = circleY - amplitude * sin(angle);
  
  // 绘制圆
  stroke(200);
  strokeWeight(1);
  noFill();
  ellipse(circleX, circleY, amplitude * 2);
  
  // 绘制半径
  stroke(150);
  line(circleX, circleY, pointX, pointY);
  
  // 绘制从圆上的点到正弦波的连线
  stroke(255, 0, 0, 100);
  let waveX = map(angle, 0, TWO_PI, 0, width);
  let waveY = height/2 - amplitude * sin(angle);
  line(pointX, pointY, waveX, waveY);
  
  // 绘制圆上的点
  fill(255, 0, 0);
  noStroke();
  ellipse(pointX, pointY, 8);
  
  // 添加到轨迹数组
  points.push({x: waveX, y: waveY});
  if (points.length > maxPoints) {
    points.shift();
  }
}

function drawTrail() {
  noFill();
  stroke(255, 0, 0, 150);
  strokeWeight(2);
  
  beginShape();
  for (let i = 0; i < points.length; i++) {
    vertex(points[i].x, points[i].y);
  }
  endShape();
}

function updateFrequency() {
  frequency = document.getElementById('frequency').value;
  document.getElementById('frequencyValue').textContent = frequency;
}

function updateAmplitude() {
  amplitude = document.getElementById('amplitude').value;
  document.getElementById('amplitudeValue').textContent = amplitude;
}

function updateSpeed() {
  speed = document.getElementById('speed').value;
  document.getElementById('speedValue').textContent = speed;
} 