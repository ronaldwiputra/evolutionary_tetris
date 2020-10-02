function AI(altitudeDifference, linesWeight, holesWeight, sumWellsWeight,pileHeight,columnsTransitions,rowTransitions,block,maximumWellsDepth,bumpiness){
    this.altitudeDifference = altitudeDifference;
    this.linesWeight = linesWeight;
    this.holesWeight = holesWeight;
    this.sumWellsWeight = sumWellsWeight;
    this.pileHeight = pileHeight;
    this.columnsTransitions =columnsTransitions;
    this.rowTransitions=rowTransitions;
    this.block=block;
    this.maximumWellsDepth=maximumWellsDepth;
    this.bumpiness=bumpiness;

}
var c=[22, 4, 166, 83, 22, 69, 88, 1074, 22, 128];
function normalize(arr) {

    for(var x=0; x<arr.length; x++){
            arr[x] = arr[x] / c[x]
    }


    return arr;
};
AI.prototype._best = function(grid, workingPieces, workingPieceIndex){

    var best = null;
    var bestScore = null;



    var workingPiece = workingPieces[workingPieceIndex];
    var ctr=0;
    for(var rotation = 0; rotation < 4; rotation++){
        var _piece = workingPiece.clone();
        for(var i = 0; i < rotation; i++){
            _piece.rotate(grid);
        }

        while(_piece.moveLeft(grid));
        while(grid.valid(_piece)){


            var _pieceSet = _piece.clone();
            while(_pieceSet.moveDown(grid));

            var _grid = grid.clone();
            _grid.addPiece(_pieceSet);
            var score = null;
            var feature=[];
            feature.push( _grid.altitudeDifference());
            feature.push( _grid.lines());
            feature.push( _grid.holes());
            feature.push( _grid.sumWells());
            feature.push( _grid.pileHeight());
            feature.push( _grid.columnsTransitions());
            feature.push( _grid.rowTransitions());
            feature.push( _grid.block());
            feature.push( _grid.maximumWellsDepth());
            feature.push( _grid.bumpiness());
            //console.log
            // console.log(_grid.columnsTransitions()+" coloumn");
            // console.log(_grid.rowTransitions()+" row");
            for (var i = 0; i < feature.length; i++) {
              if(c[i]<feature[i]){
                c[i]=feature[i];

                  console.log(c);
              }


            }
            // if(feature[9]>70){
            //             console.log( _grid.bumpiness());
            //             console.log(_grid)
            // }
            feature=normalize(feature);




            if (workingPieceIndex == (workingPieces.length - 1)) {
                score = this.altitudeDifference * feature[0] + this.linesWeight * feature[1] + this.holesWeight * feature[2] +
                 this.sumWellsWeight * feature[3] + this.pileHeight *feature[4]+
                this.columnsTransitions *feature[5] + this.rowTransitions * feature[6]
                + this.block *feature[7] + this.maximumWellsDepth * feature[8] +this.bumpiness*feature[9];

            }else{

                score = this._best(_grid, workingPieces, workingPieceIndex + 1).score;

            }

            if (score > bestScore || bestScore == null){
                bestScore = score;
                best = _piece.clone();
            }

            _piece.column++;

        }
    }

    return {piece:best, score:bestScore};
};

AI.prototype.best = function(grid, workingPieces){

    return this._best(grid, workingPieces, 0).piece;
};
