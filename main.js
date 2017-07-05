
var screenTall = 600;
var screenWide = 900;
var screenBuff = 180;
var cellSize   = 30;
var cellsWide;
var cellsTall;
var myWorld;
var paused = false;

function setup() {
  cellsWide  = int(screenWide/cellSize);
  cellsTall  = int(screenTall/cellSize);
  var canvas = createCanvas(screenWide,screenTall);
  canvas.parent("P5Container");
  ellipseMode(CORNER);
  textSize(15);
  
  myWorld = new GOLWorld(cellsTall,cellsWide);
 
} // Ends Method setup

function draw(){

  // LOGIC CALLS
  if(!paused){myWorld.advanceWorld();}
  
  // RENDER CALLS
  background(0);
  myWorld.displayWorld();
  
} // Ends Method draw

function keyPressed(){
  if(key === 'P'){paused=!paused;}
  if(key === 'C'){myWorld.resetWorld();}
  if(key === 'R'){myWorld.randomPopulate();}
  if(key === 'M'){myWorld.changeMode();}  
} // Ends Function keyPressed

function mousePressed(){
  mouseDraw(mouseButton);
} // Ends Function mousePressed

function mouseDraw(button){
  var mRow = int(mouseY/cellSize);
  var mCol = int(mouseX/cellSize);
  if(!checkInBounds(mRow, mCol)){return;}
  
  if(button == LEFT ){
    if(myWorld.currentMap[mRow][mCol]===1){myWorld.currentMap[mRow][mCol]=0;}
    else if(myWorld.currentMap[mRow][mCol]===0){myWorld.currentMap[mRow][mCol]=1;}
  }
} // Ends Function mouseDraw

function checkInBounds(r, c){
  return (r>=0 && r<cellsTall && c>=0 && c<cellsWide);
} // Ends Method checkInBounds


