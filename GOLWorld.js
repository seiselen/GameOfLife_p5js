// GOLWorld (Game Of Life World)
function GOLWorld(cellsTall, cellsWide) {

  var roomMode = 0;
  var wrapMode = 1;
  
  this.cellsTall  = cellsTall;
  this.cellsWide  = cellsWide;
  this.currentMap = [];
  this.nextMap    = [];
  this.mode = wrapMode;
  
  this.changeMode = function(){
    if(this.mode == wrapMode){this.mode=roomMode;}
    else{this.mode=wrapMode;} 
  } // Ends Method changeMode
  
  this.displayWorld = function(){
     for(var r=0; r<cellsTall; r++){
      for(var c=0; c<cellsWide; c++){
        if(this.currentMap[r][c]==0){fill(60,60,60);} 
        else if(this.currentMap[r][c]==1){fill(240,240,240);} 
        else{fill(252, 0, 0);}      
        ellipse(c*cellSize, r*cellSize, cellSize, cellSize);
      }
    }   
  } // Ends Method displayWorld
    
  this.resetWorld = function(){
    this.currentMap.length = 0;
    this.nextMap.length = 0;
    for (var r = 0; r < this.cellsTall; r++) {
      var temp = [];
      for (var c = 0; c < this.cellsTall; c++) {
        temp.push(0);
      }
      this.currentMap.push(temp);
      this.nextMap.push(temp);
    }
  } // Ends Method resetWorld
  this.resetWorld();  
  
  
  this.randomPopulate = function(){
    this.currentMap.length = 0;
    for (var r = 0; r < this.cellsTall; r++) {
      var temp = [];
      for (var c = 0; c < this.cellsTall; c++) {
        temp.push(int(random(2)));
      }
      this.currentMap.push(temp);
    }
  } // Ends Method randomPopulate
  this.randomPopulate();
  
  
  this.advanceWorld = function() {
    var NC = 0;
    for (var r=0; r<this.cellsTall; r++) {
      for (var c=0; c<this.cellsWide; c++) {
        NC = this.getAdjTotal(r,c);
        // Conditions for if this cell is alive
        if (this.currentMap[r][c] == 1){if(NC==2 || NC==3){this.nextMap[r][c]=1;}else{this.nextMap[r][c]=0;}}
        // Conditions for if this cell is dead (Because is XOR to root condition in co-conditional
        else{if(NC==3){this.nextMap[r][c]=1;}else{this.nextMap[r][c]=0;}}       
      }
    }
    for (var r=0; r<this.cellsTall; r++) {
      for (var c=0; c<this.cellsWide; c++) {
        this.currentMap[r][c] = this.nextMap[r][c];
      }
    }
  } // Ends Function advanceWorld
  
  
  this.getAdjTotal = function(cRow, cCol){
    var tot = 0; 
    
    if(this.mode==wrapMode){
      tot+= this.currentMap[getModdedRow(cRow-1)][cCol];
      tot+= this.currentMap[getModdedRow(cRow+1)][cCol];
      tot+= this.currentMap[cRow][getModdedCol(cCol-1)];
      tot+= this.currentMap[cRow][getModdedCol(cCol+1)];    
      tot+= this.currentMap[getModdedRow(cRow-1)][getModdedCol(cCol-1)];
      tot+= this.currentMap[getModdedRow(cRow+1)][getModdedCol(cCol+1)];
      tot+= this.currentMap[getModdedRow(cRow+1)][getModdedCol(cCol-1)];
      tot+= this.currentMap[getModdedRow(cRow-1)][getModdedCol(cCol+1)];
    } // Ends WRAPMODE

    if(this.mode==roomMode){
      for (var adjR = cRow-1; adjR <= cRow+1; adjR++){
        for (var adjC = cCol-1; adjC <= cCol+1; adjC++){
          if (checkInBounds(adjR, adjC)){
            if (!(adjC==cCol && adjR==cRow)){;
              tot += this.currentMap[adjR][adjC];
            }
          } 
        }
      }       
    } // ENDS ROOMMODE
    return tot;
  } // Ends Method getAdjTotal  
  
 
} // Ends Constuctor Class GOLWorld

function getModdedRow(r){return (cellsTall+r)%cellsTall;} // Ends Method getModdedRow 
function getModdedCol(c){return (cellsWide+c)%cellsWide;} // Ends Method getModdedCol 
