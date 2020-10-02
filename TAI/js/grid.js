function Grid(rows, columns){
    this.rows = rows;
    this.columns = columns;

    this.cells = new Array(rows);
    for (var r = 0; r < this.rows; r++) {
        this.cells[r] = new Array(this.columns);
        for(var c = 0; c < this.columns; c++){
            this.cells[r][c] = 0;
        }
    }
};
Grid.prototype.bumpiness = function(){
    var total = 0;
    for(var c = 0; c < this.columns - 1; c++){
        total += Math.abs(this.columnHeight(c) - this.columnHeight(c+ 1));
    }
    return total;
}
Grid.prototype.clone = function(){
    var _grid = new Grid(this.rows, this.columns);
    for (var r = 0; r < this.rows; r++) {
        for(var c = 0; c < this.columns; c++){
            _grid.cells[r][c] = this.cells[r][c];
        }
    }
    return _grid;
};

Grid.prototype.clearLines = function(){
    var distance = 0;
    var row = new Array(this.columns);
    for(var r = this.rows - 1; r >= 0; r--){
        if (this.isLine(r)){
            distance++;
            for(var c = 0; c < this.columns; c++){
                this.cells[r][c] = 0;
            }
        }else if (distance > 0){
            for(var c = 0; c < this.columns; c++){
                this.cells[r + distance][c] = this.cells[r][c];
                this.cells[r][c] = 0;
            }
        }
    }
    return distance;
};

Grid.prototype.isLine = function(row){
    for(var c = 0; c < this.columns; c++){
        if (this.cells[row][c] == 0){
            return false;
        }
    }
    return true;
};



Grid.prototype.emptycoloumn = function(columns){
  //console.log(this.rows);
  //console.log(columns);
    for(var c = 0; c < this.rows; c++){
      //console.log(this.cells[c][columns]);
        if (this.cells[c][columns] != 0){
          // console.log("masuk");
            return false;
        }
    }
    // console.log("DONES");
    return true;
};

Grid.prototype.isEmptyRow = function(row){
    for(var c = 0; c < this.columns; c++){
        if (this.cells[row][c] != 0){
            return false;
        }
    }
    return true;
};

Grid.prototype.exceeded = function(){
    return !this.isEmptyRow(0) || !this.isEmptyRow(1);
};

Grid.prototype.height = function(){
    var r = 0;
    for(; r < this.rows && this.isEmptyRow(r); r++);
    return this.rows - r;
};

Grid.prototype.lines = function(){
    var count = 0;
    for(var r = 0; r < this.rows; r++){
        if (this.isLine(r)){
            count++;
        }
    }
    return count;
};

Grid.prototype.holes = function(){

    var count = 0;
    for(var c = 0; c < this.columns; c++){
        var block = false;
        for(var r = 0; r < this.rows; r++){
            if (this.cells[r][c] != 0) {
                block = true;
            }else if (this.cells[r][c] == 0 && block){
                count++;
            }
        }
    }
    return count;
};

Grid.prototype.blockades = function(){
    var count = 0;
    for(var c = 0; c < this.columns; c++){
        var hole = false;
        for(var r = this.rows - 1; r >= 0; r--){
            if (this.cells[r][c] == 0){
                hole = true;
            }else if (this.cells[r][c] != 0 && hole){
                count++;
            }
        }
    }
    return count;
}
Grid.prototype.maximumWellsDepth  = function(){

    var max=0;
    for(var c = 0; c < this.columns-1; c++){
      if(c==0){
        if(this.columnHeight(c)<this.columnHeight(c+1)){
          if(max<this.columnHeight(c+1)-this.columnHeight(c)){
            max=this.columnHeight(c+1)-this.columnHeight(c);
          }
        }else if(this.columnHeight(c)>this.columnHeight(c+1)&&this.columnHeight(c+1)<this.columnHeight(c+2)){
            var temp=this.columnHeight(c+2)-this.columnHeight(c+1);
            if(this.columnHeight(c)-this.columnHeight(c+1)<temp){
                temp=this.columnHeight(c)-this.columnHeight(c+1);
            }
            if(temp>max){
              max=temp;
            }
        }
      }else if(c==8){
        if(this.columnHeight(c)>this.columnHeight(c+1)){
          if(max<this.columnHeight(c)-this.columnHeight(c+1)){
            max=this.columnHeight(c)-this.columnHeight(c+1);
          }
        }
      }
        else if(this.columnHeight(c)>this.columnHeight(c+1)&&this.columnHeight(c+1)<this.columnHeight(c+2)){
          var temp=this.columnHeight(c+2)-this.columnHeight(c+1);
          if(this.columnHeight(c)-this.columnHeight(c+1)<temp){
              temp=this.columnHeight(c)-this.columnHeight(c+1);
          }
          if(temp>max){
            max=temp;
          }
        }

    }


    return max;
}

Grid.prototype.altitudeDifference  = function(){
    var min=0;
    var max=0;
    for(var c = 0; c < this.columns; c++){
        if(max<this.columnHeight(c)){
          max=this.columnHeight(c);
        }
        if(min>this.columnHeight(c)){
          min=this.columnHeight(c);
        }
    }
    return max-min;
}
Grid.prototype.aggregateHeight = function(){
    var total = 0;
    for(var c = 0; c < this.columns; c++){
        total += this.columnHeight(c);
    }
    return total;
};

Grid.prototype.pileHeight = function(){
    var max = 0;
    for(var c = 0; c < this.columns; c++){
        if(max<this.columnHeight(c)){
          max=this.columnHeight(c);
        }
    }

    return max;
};
Grid.prototype.lose = function(){
    var max = 0;
    for(var c = 0; c < this.columns; c++){
        if(max<this.columnHeight(c)){
          max=this.columnHeight(c);
        }
    }
    return max;
};
Grid.prototype.rowTransitions = function(){
  var count = 0;

  for(var c = 0; c < this.rows; c++){
    var holes=true;
      for(var r = 0; r < this.columns; r++){
        // if(this.isEmptyRow(c)){
        //   break;
        // }
          if(r==0&&this.cells[c][r] == 0){
            count++;
          }
          if(r==0&&this.cells[c][r] != 0){
            count++;
            holes=false;
          }
          if (this.cells[c][r] != 0 && holes) {


              holes=false;
          }
          if (this.cells[c][r] != 0 && !holes) {

          }
          if(this.cells[c][r] == 0 &&holes){
              holes=true;
          }
          if(this.cells[c][r] == 0 && !holes){
            count++;
            holes=true;
          }

      }
  }
  //console.log(count+" row");
  //console.log(Grid);
  return count;
};
Grid.prototype.columnsTransitions = function(){
  var count = 0;
//console.log( this.columns);
  for(var r = 0; r < this.columns; r++){
    var holes=true;
      for(var c = 0; c < this.rows; c++){
        // if(this.emptycoloumn(r)){
        //   break;
        // }
          if(c==0&&this.cells[c][r] == 0){
            count++;
          }
          if(c==0&&this.cells[c][r] != 0){
            count++;
            holes=false;
          }
          if (this.cells[c][r] != 0 && holes) {


              holes=false;
          }
          if (this.cells[c][r] != 0 && !holes) {

          }
          if(this.cells[c][r] == 0 &&holes){
              holes=true;
          }
          if(this.cells[c][r] == 0 && !holes){
            count++;
            holes=true;
          }

      }
  }
  // if(count>0){
  //   console.log(count);
  // }
   //console.log(count);

   //console.log(count+" col");
  return count;
};
Grid.prototype.block = function(){
  var count = 0;
  var ctr=1;
  for(var c = 0; c < this.columns; c++){
      for(var r = this.rows-1; r > 0; r--){
          if (this.cells[r][c] != 0) {
            count+=ctr;
          }
      }
      ctr++;
  }
  return count;
};
Grid.prototype.maximumWellsDepth  = function(){

    var max=0;
    for(var c = 0; c < this.columns-1; c++){
      if(c==0){
        if(this.columnHeight(c)<this.columnHeight(c+1)){
          if(max<this.columnHeight(c+1)-this.columnHeight(c)){
            max=this.columnHeight(c+1)-this.columnHeight(c);
          }
        }else if(this.columnHeight(c)>this.columnHeight(c+1)&&this.columnHeight(c+1)<this.columnHeight(c+2)){
            var temp=this.columnHeight(c+2)-this.columnHeight(c+1);
            if(this.columnHeight(c)-this.columnHeight(c+1)<temp){
                temp=this.columnHeight(c)-this.columnHeight(c+1);
            }
            if(temp>max){
              max=temp;
            }
        }
      }else if(c==8){
        if(this.columnHeight(c)>this.columnHeight(c+1)){
          if(max<this.columnHeight(c)-this.columnHeight(c+1)){
            max=this.columnHeight(c)-this.columnHeight(c+1);
          }
        }
      }
        else if(this.columnHeight(c)>this.columnHeight(c+1)&&this.columnHeight(c+1)<this.columnHeight(c+2)){
          var temp=this.columnHeight(c+2)-this.columnHeight(c+1);
          if(this.columnHeight(c)-this.columnHeight(c+1)<temp){
              temp=this.columnHeight(c)-this.columnHeight(c+1);
          }
          if(temp>max){
            max=temp;
          }
        }

    }


    return max;
}
Grid.prototype.sumWells = function(){

    var total=0;
    for(var c = 0; c < this.columns-1; c++){

      if(c==0){
        if(this.columnHeight(c)<this.columnHeight(c+1)){
            total+=this.columnHeight(c+1)-this.columnHeight(c);
        }else if(this.columnHeight(c)>this.columnHeight(c+1)&&this.columnHeight(c+1)<this.columnHeight(c+2)){
            var temp=this.columnHeight(c+2)-this.columnHeight(c+1);
            if(this.columnHeight(c)-this.columnHeight(c+1)<temp){
                temp=this.columnHeight(c)-this.columnHeight(c+1);
            }
            total+=temp;
        }
      }else if(c==8){
        if(this.columnHeight(c)>this.columnHeight(c+1)){

            total+=this.columnHeight(c)-this.columnHeight(c+1);

        }
      }
        else if(this.columnHeight(c)>this.columnHeight(c+1)&&this.columnHeight(c+1)<this.columnHeight(c+2)){
          var temp=this.columnHeight(c+2)-this.columnHeight(c+1);
          if(this.columnHeight(c)-this.columnHeight(c+1)<temp){
              temp=this.columnHeight(c)-this.columnHeight(c+1);
          }
      total+=temp
        }

    }


    return total;
}

// Grid.prototype.sumWells = function(){
//  var total=0;
//   for(var c = 0; c < this.columns-2; c++){
//     if(c==0){
//       if(this.columnHeight(c)<this.columnHeight(c+1)){
//         if(this.columnHeight(c+1)-this.columnHeight(c)){
//           total+=this.columnHeight(c+1)-this.columnHeight(c);
//         }
//       }
//     }
//       else if(this.columnHeight(c)>this.columnHeight(c+1)&&this.columnHeight(c+1)<this.columnHeight(c+2)){
//         if(this.columnHeight(c)>this.columnHeight(c+2)){
//           total+=this.columnHeight(c+2)-this.columnHeight(c+1);
//         }else{
//           total+=this.columnHeight(c)-this.columnHeight(c+1);
//         }
//       }
//
//
//   }
//
//     return total;
// }
Grid.prototype.columnHeight = function(column){
      var r = 0;
      for(; r < this.rows && this.cells[r][column] == 0; r++);
      return this.rows - r;
};

Grid.prototype.addPiece = function(piece) {
    for(var r = 0; r < piece.cells.length; r++) {
        for (var c = 0; c < piece.cells[r].length; c++) {
            var _r = piece.row + r;
            var _c = piece.column + c;
            if (piece.cells[r][c] != 0 && _r >= 0){
                this.cells[_r][_c] = piece.cells[r][c];
            }
        }
    }
};

Grid.prototype.valid = function(piece){
    for(var r = 0; r < piece.cells.length; r++){
        for(var c = 0; c < piece.cells[r].length; c++){
            var _r = piece.row + r;
            var _c = piece.column + c;
            if (piece.cells[r][c] != 0){
                if(_r < 0 || _r >= this.rows){
                    return false;
                }
                if(_c < 0 || _c >= this.columns){
                    return false;
                }
                if (this.cells[_r][_c] != 0){
                    return false;
                }
            }
        }
    }
    return true;
};
