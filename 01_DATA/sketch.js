
const mappa = new Mappa('Leaflet');
let trainMap;
let canvas;

var data;
var data0;
var data1;

var allZipCodes;
var maskCodes;
var covidCases;


var sz;
var sz0;
var sz1;


var txt


let pg;
let density = 2;

function preload() {
  data = loadJSON("zipcodes.json"); 
  data0 = loadJSON("dataMask.json");
  data1 = loadJSON("data0covidUSA.json");
}


const options = {
  lat: 36.778259,
  lng: -95.6650,
  zoom: 5,
  style: "https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png"
};



function setup() {
  canvas =  createCanvas(windowWidth, windowHeight);
  trainMap = mappa.tileMap(options);
  trainMap.overlay(canvas);

  allZipCodes = data.zipCodes;
  maskCodes = data0.Sheet1;
  covidCases = data1.hoja0;

  //colorMode(HSB, 360, 100, 100, 100);
  pixelDensity(density);
  pg = createGraphics(width, height);
  pg.blendMode(ADD);


}


function draw() {
  clear();
  pg.clear();
  //background(0);

  blendMode(ADD);








    randomSeed(frameCount / 100);
  for (let i = 0; i < maskCodes.length; i++) {
    var pix = trainMap.latLngToPixel(maskCodes[i].Lat, maskCodes[i].Long);  
    let x = pix.x;
    let y = pix.y;
    let d = maskCodes[i].MaskQuantity/50;
    let angle = map(noise(x / 400, y / 400, frameCount / 800), 0, 1, -180, 180);
    let r = 10;
    let v = createVector(cos(angle) * r, sin(angle) * r);
    //x += v.x;
    //y += v.y;
    pg.push();
    pg.translate(-width * 2, -height * 2);
    pg.drawingContext.shadowColor = color(199, 100, 255, 200);
    pg.drawingContext.shadowBlur = d;
    pg.drawingContext.shadowOffsetX = width * density * 2;
    pg.drawingContext.shadowOffsetY = height * density * 2;
    pg.noStroke();
    pg.ellipse(x, y, d, d);
    pg.pop();
  }
  image(pg, 0, 0);

   for(var i = 0; i<maskCodes.length; i++){
  var pix = trainMap.latLngToPixel(maskCodes[i].Lat, maskCodes[i].Long);
  var x = pix.x;
  var y = pix.y;

  /*
  fill(0,255,0);
  noStroke();
  ellipse(pix.x, pix.y,  10 );
  */

  var d = dist(mouseX,mouseY,x,y);

  if(d <= 10){
    fill(255,0,0);
    noStroke();
    textAlign(CENTER,CENTER);
    textSize(50);
    text("City:" + maskCodes[i].City,x,y-70);
    text("No. of Masks:" + maskCodes[i].MaskQuantity,x,y-25);
  }
  }


}



function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}