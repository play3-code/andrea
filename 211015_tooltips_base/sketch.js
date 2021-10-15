let geodata;
let treeData;

let backgroundimg;

let bounds = {
  left: 8.255210,
  top: 47.073026,
  right: 8.334914,
  bottom: 47.027879,
};

function preload() {
  geodata = loadJSON("lucerne-trees.json");
  backgroundimg = loadImage('trees-luzern.png');
}

let quadtree = d3.quadtree();
let highlightobj = null;

function setup() {
  createCanvas(900, 650);

  treeData = geodata.features;

  quadtree
    .x(function (d) {
      return d.geometry.coordinates[0];
    })
    .y(function (d) {
      return d.geometry.coordinates[1];
    })
    .addAll(treeData);

  noLoop();
}

function draw() {
  background(161, 153, 191);

  image(backgroundimg, 0, 0, width, height);
  //drawTrees();

  fill('white');
  noStroke();
  textSize(20);
  text('TREES OF LUCERNE', 50, 590);
  

  if (highlightobj) {
    let lon = highlightobj.geometry.coordinates[0];
    let lat = highlightobj.geometry.coordinates[1];
    let x = map(lon, bounds.left, bounds.right, 0, width);
    let y = map(lat, bounds.top, bounds.bottom, 0, height);

    let lonText = highlightobj.geometry.coordinates[0].toString();
    let latText = highlightobj.geometry.coordinates[1].toString();

    let hoehe = highlightobj.properties.BAUMHOEHE;
    let gattung = highlightobj.properties.GATTUNG;
  
    fill ('white');
    noStroke();
    textSize(13);
    text('GENRE:          ' + gattung +'\n'+ 'HEIGHT:          ' + hoehe +'\n'+  'LONGITUDE:  ' + lonText +'\n'+  'LATITUDE:      ' + latText, x+15, y);

    noFill();
    stroke('white');
    strokeWeight(1);
    ellipse(x, y, 10, 10);
    strokeWeight(1);
    ellipse(x, y, 3, 3);
  }
}

function mouseMoved() {
  console.log('mouseMoved', mouseX, mouseY);
  let lon = map(mouseX, 0, width, bounds.left, bounds.right);
  let lat = map(mouseY, 0, height, bounds.top, bounds.bottom);


  highlightobj = quadtree.find(lon, lat);
  console.log(highlightobj);
  redraw();
}

function keyTyped() {
  saveCanvas('trees-luzern.png');
}

function drawTrees() {
  for (let i = 0; i < treeData.length; i++) {
    let treeObject = treeData[i];
    let geometry = treeObject.geometry;
    let properties = treeObject.properties;
    // console.log(properties);
    let coordinates = geometry.coordinates;
    let lat = coordinates[1];
    let lon = coordinates[0];

    let x = map(lon, bounds.left, bounds.right, 0, width);
    let y = map(lat, bounds.top, bounds.bottom, 0, height);

    //leuchteffekt weil mehrere Ellipsen übereinander
    noStroke();
    fill(64, 62, 140, 5);
    ellipse(x, y, 10, 10);
    ellipse(x, y, 8, 8);
    ellipse(x, y, 6, 6);
    ellipse(x, y, 4, 4);
    ellipse(x, y, 2, 2);
  }
}
function keyTyped() {
  console.log("saving...");
  saveCanvas("trees-luzern", "png");
  console.log("done");
}
