// 全局变量
let time = 0;
let wave = [];
let numTerms = 5;
let speed = 1.0;
let waveType = 'square';
let path = [];
let maxPathLength = 500;

function setup() {
  // 创建画布并放置在指定容器中
  let canvas = createCanvas(900, 500);
  canvas.parent('canvas-container');
  
  // 初始化控制器
  document.getElementById('terms').addEventListener('input', updateTerms);
  document.getElementById('speed').addEventListener('input', updateSpeed);
  document.getElementById('waveType').addEventListener('change', updateWaveType);
  
  // 设置初始值
  updateTerms();
  updateSpeed();
  updateWaveType();
}

function draw() {
  background(240);
  
  // 更新时间
  time += 0.03 * speed;
  
  // 计算傅里叶级数
  let x = width / 4;
  let y = height / 2;
  
  // 绘制坐标轴
  drawAxis();
  
  // 绘制圆和向量
  for (let i = 0; i < numTerms; i++) {
    let prevX = x;
    let prevY = y;
    
    // 计算当前项的半径和角速度
    let n = getHarmonic(i, waveType);
    let radius = getAmplitude(n, waveType);
    let phase = getPhase(n, waveType);
    
    // 计算当前项的位置
    x += radius * cos(n * time + phase);
    y += radius * sin(n * time + phase);
    
    // 绘制圆
    stroke(150, 150, 150, 100);
    noFill();
    ellipse(prevX, prevY, radius * 2);
    
    // 绘制向量
    stroke(100, 100, 100);
    line(prevX, prevY, x, y);
    
    // 绘制端点
    fill(0, 120, 255);
    noStroke();
    ellipse(x, y, 6);
  }
  
  // 添加当前点到路径
  path.unshift({x: x, y: y});
  
  // 限制路径长度
  if (path.length > maxPathLength) {
    path.pop();
  }
  
  // 绘制波形
  drawWave(x, y);
  
  // 绘制理论波形
  drawTheoreticalWave();
  
  // 绘制信息
  drawInfo();
}

function drawAxis() {
  stroke(150);
  strokeWeight(1);
  
  // x轴
  line(0, height/2, width, height/2);
  
  // 垂直线
  line(width/2, 0, width/2, height);
}

function drawWave(x, y) {
  // 绘制从最后一个圆到波形起点的线
  stroke(0, 120, 255);
  line(x, y, width/2, y);
  
  // 绘制波形
  noFill();
  stroke(0, 120, 255);
  strokeWeight(2);
  beginShape();
  for (let i = 0; i < path.length; i++) {
    vertex(width/2 + i, path[i].y);
  }
  endShape();
}

function drawTheoreticalWave() {
  // 绘制理论波形
  stroke(255, 0, 0, 100);
  strokeWeight(1);
  noFill();
  
  beginShape();
  for (let x = 0; x < width/2; x++) {
    let y = height/2;
    let t = map(x, 0, width/2, 0, TWO_PI);
    
    for (let i = 0; i < numTerms; i++) {
      let n = getHarmonic(i, waveType);
      let amplitude = getAmplitude(n, waveType);
      let phase = getPhase(n, waveType);
      y += amplitude * sin(n * t + phase);
    }
    
    vertex(width/2 + x, y);
  }
  endShape();
}

function drawInfo() {
  fill(0);
  noStroke();
  textSize(14);
  textAlign(LEFT);
  
  text(`波形类型: ${getWaveTypeName(waveType)}`, 20, 30);
  text(`项数: ${numTerms}`, 20, 50);
  text(`速度: ${speed}`, 20, 70);
}

function getHarmonic(i, type) {
  if (type === 'square' || type === 'triangle') {
    return 2 * i + 1; // 奇数谐波: 1, 3, 5, 7, ...
  } else if (type === 'sawtooth') {
    return i + 1; // 所有谐波: 1, 2, 3, 4, ...
  }
}

function getAmplitude(n, type) {
  if (type === 'square') {
    return 75 * (4 / (n * PI)); // 方波: 4/πn
  } else if (type === 'sawtooth') {
    return 75 * (2 / (n * PI)); // 锯齿波: 2/πn
  } else if (type === 'triangle') {
    return 75 * (8 / (n * n * PI * PI)); // 三角波: 8/(π²n²)
  }
}

function getPhase(n, type) {
  if (type === 'square') {
    return 0; // 方波: 0
  } else if (type === 'sawtooth') {
    return -PI/2; // 锯齿波: -π/2
  } else if (type === 'triangle') {
    return (n % 4 === 1) ? 0 : PI; // 三角波: 0 或 π
  }
}

function getWaveTypeName(type) {
  if (type === 'square') return '方波';
  if (type === 'sawtooth') return '锯齿波';
  if (type === 'triangle') return '三角波';
}

function updateTerms() {
  numTerms = parseInt(document.getElementById('terms').value);
  document.getElementById('termsValue').textContent = numTerms;
  path = []; // 重置路径
}

function updateSpeed() {
  speed = parseFloat(document.getElementById('speed').value);
  document.getElementById('speedValue').textContent = speed;
}

function updateWaveType() {
  waveType = document.getElementById('waveType').value;
  path = []; // 重置路径
} 