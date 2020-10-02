function GameManager(altitudeDifference, linesWeight, holesWeight, sumWellsWeight,
  pileHeight,columnsTransitions,rowTransitions,block,maximumWellsDepth,bumpiness,isai=true){
    var gridCanvas = document.getElementById('grid-canvas');
    var nextCanvas = document.getElementById('next-canvas');
    var scoreContainer = document.getElementById("score-container");
    var scoreBoardContainer = document.getElementById("scoreBoard-container");
    var resetButton = document.getElementById('reset-button');
    var aiButton = document.getElementById('ai-button');
    var animationButton = document.getElementById('animation-button');
    var gridContext = gridCanvas.getContext('2d');
    var nextContext = nextCanvas.getContext('2d');
    document.addEventListener('keydown', onKeyDown);

    var grid = new Grid(22, 10);
    var rpg = new RandomPieceGenerator();
  var ai = new AI(altitudeDifference, linesWeight, holesWeight, sumWellsWeight,pileHeight,columnsTransitions,rowTransitions,block,maximumWellsDepth,bumpiness);
    //ga test1

     // var ai = new AI(
     //   -0.7768339179131474,
     //   0.6518868038507588,
     //   -0.36458214832893954,
     //   -0.36139810408616047,
     //   0.5197394177744104,
     // -0.053883173084564806,
     // -0.358868837502914,
     // -0.7896807414085677,
     // 0.2118127479005123);
       // var ai = new AI(
       // -0.6829075406467351,
       // 0.9372975441347058,
       // -0.9915852694927247,
       // -0.9918206363015352,
       // 0.15131627110550827,
       // -0.7901625541066344,
       // -0.25878829508753665,
       // -0.6889942708902219,
       // -0.10283913032104808);
//mvpoa
// var ai = new AI(
//   -0.4309692004929424,0.868276670398032,-0.5583020895023383,0.0952647681381329,
//   -0.4576854920527773,-0.9985693679708048,-0.4010997733692654,-0.9507361024148135,
//   -0.5973881490701807);

  // //mvpa best
  //    var ai = new AI(
  //      0.3357053198924256,
  //      2.16399686220462,
  //      -2.13568842841872,
  //    -0.500649787954248,
  //    -1.0730755400260596,
  //    -0.8454582517240937,
  //    -0.6541053337844206,
  //    -1.474489849939211,
  //   -1.1528676676218161);

    //mvpa
    // var ai = new AI(0.27248586209488757,
    // 0.907066333895703,
    // -0.5414200203031867,
    // -0.8677386555504865,
    // -0.8491118495375103,
    // -0.0955017362355508,
    // -0.20986267311379558,
    // 0.8437261678515595,
    // -0.023537420466646974);
    var workingPieces = [null, rpg.nextPiece()];
    var workingPiece = null;
    var isAiActive = isai;
    var isKeyEnabled = false;
    var isAnimation = false;
    var gravityTimer = new Timer(onGravityTimerTick, 100);
    var score = 0;
    var animation=0;
    var scoreBoard=0;
animationButton.onclick = function(){
  if(isAnimation){
    animation=-100;
    isAnimation=false;
  }else{
    console.log("test");

    animation=0;

    isAnimation=true;
  }
}
    // Graphics
    function intToRGBHexString(v){
        return 'rgb(' + ((v >> 16) & 0xFF) + ',' + ((v >> 8) & 0xFF) + ',' + (v & 0xFF) + ')';
    }

    function redrawGridCanvas(workingPieceVerticalOffset = 0){
        // gridContext.save();
        // //grid width and height
        // var bw = 1000;
        // var bh = 1000;
        // //padding around grid
        // var p = 0;
        // //size of canvas
        //
        // // Clear
         gridContext.clearRect(0, 0, gridCanvas.width, gridCanvas.height);
        // for (var x = 0; x <= bw; x += 20) {
        //         gridContext.moveTo(0.5 + x + p, p);
        //         gridContext.lineTo(0.5 + x + p, bh + p);
        //     }
        //
        //
        //     for (var x = 0; x <= bh; x += 20) {
        //         gridContext.moveTo(p, 0.5 + x + p);
        //         gridContext.lineTo(bw + p, 0.5 + x + p);
        //     }
        //
        //     gridContext.strokeStyle = "light-grey";
        //     gridContext.stroke();
        // Draw grid
        for(var r = 2; r < grid.rows; r++){
            for(var c = 0; c < grid.columns; c++){
                if (grid.cells[r][c] != 0){
                    gridContext.fillStyle= intToRGBHexString(grid.cells[r][c]);
                    gridContext.fillRect(20 * c, 20 * (r - 2), 20, 20);
                    gridContext.strokeStyle="#FFFFFF";
                    gridContext.strokeRect(20 * c, 20 * (r - 2), 20, 20);
                }
            }
        }

        // Draw working piece
        for(var r = 0; r < workingPiece.dimension; r++){
            for(var c = 0; c < workingPiece.dimension; c++){
                if (workingPiece.cells[r][c] != 0){
                    gridContext.fillStyle = intToRGBHexString(workingPiece.cells[r][c]);
                    gridContext.fillRect(20 * (c + workingPiece.column), 20 * ((r + workingPiece.row) - 2) + workingPieceVerticalOffset, 20, 20);
                    gridContext.strokeStyle="#FFFFFF";
                    gridContext.strokeRect(20 * (c + workingPiece.column), 20 * ((r + workingPiece.row) - 2) + workingPieceVerticalOffset, 20, 20);
                }
            }
        }

        gridContext.restore();
    }

    function redrawNextCanvas(){
        nextContext.save();

        nextContext.clearRect(0, 0, nextCanvas.width, nextCanvas.height);
        var next = workingPieces[1];
        var xOffset = next.dimension == 2 ? 20 : next.dimension == 3 ? 10 : next.dimension == 4 ? 0 : null;
        var yOffset = next.dimension == 2 ? 20 : next.dimension == 3 ? 20 : next.dimension == 4 ? 10 : null;
        for(var r = 0; r < next.dimension; r++){
            for(var c = 0; c < next.dimension; c++){
                if (next.cells[r][c] != 0){
                    nextContext.fillStyle = intToRGBHexString(next.cells[r][c]);
                    nextContext.fillRect(xOffset + 20 * c, yOffset + 20 * r, 20, 20);
                    nextContext.strokeStyle = "#FFFFFF";
                    nextContext.strokeRect(xOffset + 20 * c, yOffset + 20 * r, 20, 20);
                }
            }
        }

        nextContext.restore();
    }

    function updateScoreContainer(){

        scoreContainer.innerHTML = score.toString();
          scoreBoardContainer.innerHTML = scoreBoard.toString();
    }

    // Drop animation
    var workingPieceDropAnimationStopwatch = null;

    function startWorkingPieceDropAnimation(callback = function(){}){
        // Calculate animation height
        animationHeight = animation;
        _workingPiece = workingPiece.clone();
        while(_workingPiece.moveDown(grid)){
            animationHeight++;
        }

        var stopwatch = new Stopwatch(function(elapsed){
            if(elapsed >= animationHeight * 20){
                stopwatch.stop();
                redrawGridCanvas(20 * animationHeight);
                callback();
                return;
            }

            redrawGridCanvas(20 * elapsed / 20);
        });

        workingPieceDropAnimationStopwatch = stopwatch;

    }

    function cancelWorkingPieceDropAnimation(){
        if(workingPieceDropAnimationStopwatch === null){

            return;
        }
        workingPieceDropAnimationStopwatch.stop();
        workingPieceDropAnimationStopwatch = null;
    }

    // Process start of turn
    function startTurn(){
        // Shift working pieces
        for(var i = 0; i < workingPieces.length - 1; i++){
            workingPieces[i] = workingPieces[i + 1];
        }
        workingPieces[workingPieces.length - 1] = rpg.nextPiece();
        workingPiece = workingPieces[0];

        // Refresh Graphics
        redrawGridCanvas();
        redrawNextCanvas();

        if(isAiActive){

            isKeyEnabled = false;
            workingPiece = ai.best(grid, workingPieces);

            startWorkingPieceDropAnimation(function(){
                while(workingPiece.moveDown(grid)); // Drop working piece

                if(!endTurn()){
                    //alert('Game Over!');
                    return;
                }
                startTurn();
            })
        }else{
            isKeyEnabled = true;
            gravityTimer.resetForward(500);
        }
    }

    // Process end of turn
    function endTurn(){
        // Add working piece
        grid.addPiece(workingPiece);
        var lines=grid.clearLines();
        // Clear lines
        if(lines==1){
          scoreBoard+=40;
        }else if(lines==2){
          scoreBoard+=100;
        }else if(lines==3){
          scoreBoard+=300
        }else if(lines==4){
          scoreBoard+=1200;
        }else{
          scoreBoard+=1;
        }

        score += lines;

        // Refresh graphics
        redrawGridCanvas();
        updateScoreContainer();

        return !grid.exceeded();
    }

    // Process gravity tick
    function onGravityTimerTick(){
        // If working piece has not reached bottom
        if(workingPiece.canMoveDown(grid)){
            workingPiece.moveDown(grid);
            redrawGridCanvas();
            return;
        }

        // Stop gravity if working piece has reached bottom
        gravityTimer.stop();

        // If working piece has reached bottom, end of turn has been processed
        // and game cannot continue because grid has been exceeded
        if(!endTurn()){
            isKeyEnabled = false;
            //alert('Game Over!');
            return;
        }

        // If working piece has reached bottom, end of turn has been processed
        // and game can still continue.
        startTurn();
    }

    // Process keys
    function onKeyDown(event){
        if(!isKeyEnabled){
            return;
        }
        switch(event.which){
            case 32: // spacebar
                isKeyEnabled = false;
                gravityTimer.stop(); // Stop gravity
                startWorkingPieceDropAnimation(function(){ // Start drop animation
                    while(workingPiece.moveDown(grid)); // Drop working piece
                    if(!endTurn()){
                        alert('Game Over!');
                        return;
                    }
                    startTurn();
                });
                break;
            case 40: // down
                gravityTimer.resetForward(500);
                break;
            case 37: //left
                if(workingPiece.canMoveLeft(grid)){
                    workingPiece.moveLeft(grid);
                    redrawGridCanvas();
                }
                break;
            case 39: //right
                if(workingPiece.canMoveRight(grid)){
                    workingPiece.moveRight(grid);
                    redrawGridCanvas();
                }
                break;
            case 38: //up
                workingPiece.rotate(grid);
                redrawGridCanvas();
                break;
        }
    }

    aiButton.onclick = function(){

        if (isAiActive){
            isAiActive = false;
            aiButton.style.backgroundColor = "#f9f9f9";
        }else{
            isAiActive = true;
            aiButton.style.backgroundColor = "#e9e9ff";

            isKeyEnabled = false;
            gravityTimer.stop();
            startWorkingPieceDropAnimation(function(){
                cancelWorkingPieceDropAnimation();// Start drop animation
                while(workingPiece.moveDown(grid)); // Drop working piece
                if(!endTurn()){
                    //alert('Game Over!');
                    return;
                }
                startTurn();
            });
        }
    }

    resetButton.onclick = function(){
        gravityTimer.stop();
        cancelWorkingPieceDropAnimation();
        grid = new Grid(22, 10);
        rpg = new RandomPieceGenerator();
        workingPieces = [null, rpg.nextPiece()];
        workingPiece = null;
        score = 0;
        isKeyEnabled = true;
        scoreBoard=0;
        updateScoreContainer();
        startTurn();
    }

    aiButton.style.backgroundColor = "#e9e9ff";
    startTurn();
}
