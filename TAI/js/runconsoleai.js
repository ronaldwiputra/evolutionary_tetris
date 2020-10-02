function runconsoleai(){

this.run = function(){


      var weight = JSON.parse(document.getElementById('json').value);

    var ai = new AI(weight.altitudeDifference,weight.linesWeight,weight.holesWeight,weight.sumWellsWeight,weight.
      pileHeightWeight,weight.columnsTransitionsWeight,weight.rowTransitionsWeight,weight.blockWeight,weight.maximumWellsDepthWeight,weight.bumpiness);

      var totalScore = 0;
        var grid = new Grid(22, 10);
        var rpg = new RandomPieceGenerator();
        var workingPieces = [rpg.nextPiece(), rpg.nextPiece()];

        var workingPiece = workingPieces[0];

        var score = 0;
        var numberOfMoves = 0;
        var max=0;
        while(  !grid.exceeded() ){//(numberOfMoves++) < 1000 &&
          workingPiece = ai.best(grid, workingPieces );
          while(workingPiece.moveDown(grid));
          grid.addPiece(workingPiece);
          score += grid.clearLines();
              document.getElementById("score").innerHTML = score.toString();
          for(var k = 0; k < workingPieces.length - 1; k++){
            workingPieces[k] = workingPieces[k + 1];
          }
          workingPieces[workingPieces.length - 1] = rpg.nextPiece();
          workingPiece = workingPieces[0];
          if(score%500==0){
            console.log(score);


          }



        }

console.log(score)




  };
}
