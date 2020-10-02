function ga(){
  var myrng = new Math.seedrandom('9');
  function randomInteger(min, max){
    return (Math.random()* (max - min) + min);
  }
  function randomCandidate(min, max){
    return (Math.random()* (max - min) + min);
  }

  function generateRandomCandidate(){

    var candidate = {

      altitudeDifference: randomCandidate(-1,1) ,
      linesWeight: randomCandidate(-1,1) ,
      holesWeight: randomCandidate(-1,1),
      sumWellsWeight: randomCandidate(-1,1),
      pileHeightWeight: randomCandidate(-1,1),
      columnsTransitionsWeight:randomCandidate(-1,1),
      rowTransitionsWeight:randomCandidate(-1,1),
      blockWeight :randomCandidate(-1,1),
      maximumWellsDepthWeight:randomCandidate(-1,1),
      bumpiness:randomCandidate(-1,1),
      block:100,
      ctr:1
    };

    return candidate;
  }

  function sort(candidates){
    candidates.sort(function(a, b){
      return b.fitness - a.fitness;
    });
  }
  function computeSingleFitnesses(candidates, maxNumberOfMoves){

    var play=5;
    var scores=[];

      var candidate = candidates;

      var ai = new AI(candidate.altitudeDifference, candidate.linesWeight,
        candidate.holesWeight, candidate.sumWellsWeight,candidate.pileHeightWeight
        ,candidate.columnsTransitionsWeight,candidate.rowTransitionsWeight,candidate.blockWeight,
        candidate.maximumWellsDepthWeight,candidate.bumpiness);

        var totalScore = 0;
          var scores = [];
        for(var j = 0; j < play; j++){
          var grid = new Grid(22, 10);
          var rpg = new RandomPieceGenerator();
          var workingPieces = [rpg.nextPiece(), rpg.nextPiece()];

          var workingPiece = workingPieces[0];
          var max=0;
          var score = 0;
          var lines=0;
          var numberOfMoves = 0;
          var min=0;
          while((numberOfMoves++) < maxNumberOfMoves && !grid.exceeded()){
            workingPiece = ai.best(grid, workingPieces );
            while(workingPiece.moveDown(grid));
            grid.addPiece(workingPiece);
            score += grid.clearLines();
            //score+=grid.clearLines();
            for(var k = 0; k < workingPieces.length - 1; k++){
              workingPieces[k] = workingPieces[k + 1];
            }
            workingPieces[workingPieces.length - 1] = rpg.nextPiece();
            workingPiece = workingPieces[0];
            // if(totalScore>=(candidate.block/2.5)-1){
            //   candidate.block=candidate.block*2;
            //   maxNumberOfMoves=candidate.block;
            //     console.log("masuk nambah");
            //   candidate.ctr++;
            // }
            // if(candidate.ctr==3){
            //   console.log("masuk ctr");
            //   candidate.ctr=1;
            //   break;
            // }

              //max+=grid.pileHeight()


            // if(score==1){
            //   totalScore+=40;
            // }else if(score==2){
            //   totalScore+=100;
            // }else if(score==3){
            //   totalScore+=300
            // }else if(score==4){
            //   totalScore+=1200;
            // }else{
            //   totalScore+=1;
            // }
            lines+=score;
          }
          totalScore+=score;
                //  scores.push(score);
}
        //console.log(totalScore);
        //candidate.fitness = 3*(1/(max/numberOfMoves)) + (5*lines);
        candidate.fitness = totalScore/play;
          //candidate.ctr= lines;
        //candidate.fitness = Math.average.apply(null,scores);
        //console.log( candidate.fitness);


    }
  function computeFitnesses(candidates, maxNumberOfMoves){
    var play=5;
    var scores=[];
    for(var i = 0; i < candidates.length; i++){
      var candidate = candidates[i];

      var ai = new AI(candidate.altitudeDifference, candidate.linesWeight,
        candidate.holesWeight, candidate.sumWellsWeight,candidate.pileHeightWeight
        ,candidate.columnsTransitionsWeight,candidate.rowTransitionsWeight,candidate.blockWeight,
        candidate.maximumWellsDepthWeight,candidate.bumpiness);

        var totalScore = 0;
          var scores = [];
        for(var j = 0; j < play; j++){
          var grid = new Grid(22, 10);
          var rpg = new RandomPieceGenerator();
          var workingPieces = [rpg.nextPiece(), rpg.nextPiece()];

          var workingPiece = workingPieces[0];
          var max=0;
          var score = 0;
          var lines=0;
          var numberOfMoves = 0;
          var min=0;
          while((numberOfMoves++) < maxNumberOfMoves && !grid.exceeded()){
            workingPiece = ai.best(grid, workingPieces );
            while(workingPiece.moveDown(grid));
            grid.addPiece(workingPiece);
            //score += grid.clearLines();
            score+=grid.clearLines();
            for(var k = 0; k < workingPieces.length - 1; k++){
              workingPieces[k] = workingPieces[k + 1];
            }
            workingPieces[workingPieces.length - 1] = rpg.nextPiece();
            workingPiece = workingPieces[0];
            // if(totalScore>=(candidate.block/2.5)-1){
            //   candidate.block=candidate.block*2;
            //   maxNumberOfMoves=candidate.block;
            //     console.log("masuk nambah");
            //   candidate.ctr++;
            // }
            // if(candidate.ctr==3){
            //   console.log("masuk ctr");
            //   candidate.ctr=1;
            //   break;
            // }

              //max+=grid.pileHeight()


            // if(score==1){
            //   totalScore+=40;
            // }else if(score==2){
            //   totalScore+=100;
            // }else if(score==3){
            //   totalScore+=300
            // }else if(score==4){
            //   totalScore+=1200;
            // }else{
            //   totalScore+=1;
            // }
            lines+=score;
          }

totalScore+=score;
          //scores.push(score);
          // console.log(score)
          // console.log(max);
          // if(score<(maxNumberOfMoves*2.5)/2){
          //     totalScore += 3*(score/((maxNumberOfMoves*2.5)-1));
          // }else{
          //     totalScore += 3*(score/((maxNumberOfMoves*2.5)-1))+(1/max);
          // }

        }
        //console.log(totalScore);
    //  candidate.fitness = 3*(1/(max/numberOfMoves)) + (5*lines);
        //candidate.ctr= lines;
      //  candidate.fitness = Math.max.apply(null,scores);
        candidate.fitness = totalScore/play;
        //console.log( candidate.fitness);

      }
    }
    function generateRandom(min, max,i) {
      var num = Math.floor(Math.random()* (max - min + 1)) + min;
      return (num === i) ? generateRandom(min, max) : num;
    }
    function crossOver(candidate1, candidate2){

      var candidate = {
        altitudeDifference: randomInteger(-1,1) ,
        linesWeight: randomInteger(-1,1) ,
        holesWeight: randomInteger(-1,1),
        sumWellsWeight: randomInteger(-1,1),
        pileHeightWeight: randomInteger(-1,1),
        columnsTransitionsWeight:randomInteger(-1,1),
        rowTransitionsWeight:randomInteger(-1,1),
        blockWeight :randomInteger(-1,1),
        maximumWellsDepthWeight:randomInteger(-1,1),
        bumpiness:randomInteger(-1,1)
      };


      return candidate;
    }
    function twoPointCrossOver(candidate1,candidate2){
      var cand1=[];
      var cand2=[];
      for (x in candidate1) {
        cand1.push(candidate1[x]);
      }
      for (x in candidate2) {
        cand2.push(candidate2[x]);
      }
      var point=Math.floor(randomInteger(1,3));
      var point1=Math.floor(randomInteger(5,7));
      var candidate=[];
      candidate.push(generateRandomCandidate());
      candidate.push(generateRandomCandidate());

      for( i = 0; i < point; i++){
        switch(i){
          case 0:
          candidate[0].altitudeDifference= cand1[i];
          candidate[1].altitudeDifference= cand2[i];
          break;
          case 1:
          candidate[0].linesWeight= cand1[i];
          candidate[1].linesWeight= cand2[i];
          break;
          case 2:
          candidate[0].holesWeight= cand1[i];
          candidate[1].holesWeight= cand2[i];
          break;
          case 3:
          candidate[0].sumWellsWeight= cand1[i];
          candidate[1].sumWellsWeight= cand2[i];
          break;
          case 4:
          candidate[0].pileHeightWeight = cand1[i];
          candidate[1].pileHeightWeight = cand2[i];
          break;
          case 5:
          candidate[0].columnsTransitionsWeight= cand1[i];
          candidate[1].columnsTransitionsWeight= cand2[i];
          break;
          case 6:
          candidate[0].rowTransitionsWeight= cand1[i];
          candidate[1].rowTransitionsWeight= cand2[i];
          break;
          case 7:
          candidate[0].blockWeight= cand1[i];
          candidate[1].blockWeight= cand2[i];
          break;
          case 8:
          candidate[0].maximumWellsDepthWeight= cand1[i];
          candidate[1].maximumWellsDepthWeight= cand2[i];
          break;

        }
      }
      for( i = point; i < point1; i++){
        switch(i){
          case 0:
          candidate[0].altitudeDifference= cand2[i];
          candidate[1].altitudeDifference= cand1[i];
          break;
          case 1:
          candidate[0].linesWeight= cand2[i];
          candidate[1].linesWeight= cand1[i];
          break;
          case 2:
          candidate[0].holesWeight= cand2[i];
          candidate[1].holesWeight= cand1[i];
          break;
          case 3:
          candidate[0].sumWellsWeight= cand2[i];
          candidate[1].sumWellsWeight= cand1[i];
          break;
          case 4:
          candidate[0].pileHeightWeight = cand2[i];
          candidate[1].pileHeightWeight = cand1[i];
          break;
          case 5:
          candidate[0].columnsTransitionsWeight= cand2[i];
          candidate[1].columnsTransitionsWeight= cand1[i];
          break;
          case 6:
          candidate[0].rowTransitionsWeight= cand2[i];
          candidate[1].rowTransitionsWeight= cand1[i];
          break;
          case 7:
          candidate[0].blockWeight= cand2[i];
          candidate[1].blockWeight= cand1[i];
          break;
          case 8:
          candidate[0].maximumWellsDepthWeight= cand2[i];
          candidate[1].maximumWellsDepthWeight= cand1[i];
          break;
          case 9:
          candidate[0].bumpiness= cand2[i];
          candidate[1].bumpiness= cand1[i];
          break;

        }
      }
      for( i = point1; i < cand1.length; i++){
        switch(i){
          case 0:
          candidate[0].altitudeDifference= cand1[i];
          candidate[1].altitudeDifference= cand2[i];
          break;
          case 1:
          candidate[0].linesWeight= cand1[i];
          candidate[1].linesWeight= cand2[i];
          break;
          case 2:
          candidate[0].holesWeight= cand1[i];
          candidate[1].holesWeight= cand2[i];
          break;
          case 3:
          candidate[0].sumWellsWeight= cand1[i];
          candidate[1].sumWellsWeight= cand2[i];
          break;
          case 4:
          candidate[0].pileHeightWeight = cand1[i];
          candidate[1].pileHeightWeight = cand2[i];
          break;
          case 5:
          candidate[0].columnsTransitionsWeight= cand1[i];
          candidate[1].columnsTransitionsWeight= cand2[i];
          break;
          case 6:
          candidate[0].rowTransitionsWeight= cand1[i];
          candidate[1].rowTransitionsWeight= cand2[i];
          break;
          case 7:
          candidate[0].blockWeight= cand1[i];
          candidate[1].blockWeight= cand2[i];
          break;
          case 8:
          candidate[0].maximumWellsDepthWeight= cand1[i];
          candidate[1].maximumWellsDepthWeight= cand2[i];
          break;
          case 9:
          candidate[0].bumpiness= cand1[i];
          candidate[1].bumpiness= cand2[i];
          break;

        }
      }
      candidate[0].block= cand2[10];
      candidate[1].block= cand1[10];
      candidate[0].ctr= cand2[11];
      candidate[1].ctr= cand1[11];
      return candidate;
    }
    function onePointCrossOver(candidate1, candidate2){
      var cand1=[];
      var cand2=[];
      for (x in candidate1) {
        cand1.push(candidate1[x]);
      }
      for (x in candidate2) {
        cand2.push(candidate2[x]);
      }
      var point=Math.floor(randomInteger(1,6));

      var candidate=[];
      candidate.push(generateRandomCandidate());
      candidate.push(generateRandomCandidate());
      for( i = 0; i < point; i++){
        switch(i){
          case 0:
          candidate[0].altitudeDifference= cand1[i];
          candidate[1].altitudeDifference= cand2[i];
          break;
          case 1:
          candidate[0].linesWeight= cand1[i];
          candidate[1].linesWeight= cand2[i];
          break;
          case 2:
          candidate[0].holesWeight= cand1[i];
          candidate[1].holesWeight= cand2[i];
          break;
          case 3:
          candidate[0].sumWellsWeight= cand1[i];
          candidate[1].sumWellsWeight= cand2[i];
          break;
          case 4:
          candidate[0].pileHeightWeight = cand1[i];
          candidate[1].pileHeightWeight = cand2[i];
          break;
          case 5:
          candidate[0].columnsTransitionsWeight= cand1[i];
          candidate[1].columnsTransitionsWeight= cand2[i];
          break;
          case 6:
          candidate[0].rowTransitionsWeight= cand1[i];
          candidate[1].rowTransitionsWeight= cand2[i];
          break;
          case 7:
          candidate[0].blockWeight= cand1[i];
          candidate[1].blockWeight= cand2[i];
          break;
          case 8:
          candidate[0].maximumWellsDepthWeight= cand1[i];
          candidate[1].maximumWellsDepthWeight= cand2[i];
          break;
          case 9:
          candidate[0].bumpiness= cand1[i];
          candidate[1].bumpiness= cand2[i];
          break;

        }
      }
      for( i = point; i < cand1.length; i++){
        switch(i){
          case 0:
          candidate[0].altitudeDifference= cand2[i];
          candidate[1].altitudeDifference= cand1[i];
          break;
          case 1:
          candidate[0].linesWeight= cand2[i];
          candidate[1].linesWeight= cand1[i];
          break;
          case 2:
          candidate[0].holesWeight= cand2[i];
          candidate[1].holesWeight= cand1[i];
          break;
          case 3:
          candidate[0].sumWellsWeight= cand2[i];
          candidate[1].sumWellsWeight= cand1[i];
          break;
          case 4:
          candidate[0].pileHeightWeight = cand2[i];
          candidate[1].pileHeightWeight = cand1[i];
          break;
          case 5:
          candidate[0].columnsTransitionsWeight= cand2[i];
          candidate[1].columnsTransitionsWeight= cand1[i];
          break;
          case 6:
          candidate[0].rowTransitionsWeight= cand2[i];
          candidate[1].rowTransitionsWeight= cand1[i];
          break;
          case 7:
          candidate[0].blockWeight= cand2[i];
          candidate[1].blockWeight= cand1[i];
          break;
          case 8:
          candidate[0].maximumWellsDepthWeight= cand2[i];
          candidate[1].maximumWellsDepthWeight= cand1[i];
          break;
          case 9:
          candidate[0].bumpiness= cand2[i];
          candidate[1].bumpiness= cand1[i];
          break;
        }
      }
      candidate[0].block= cand2[10];
      candidate[1].block= cand1[10];
      candidate[0].ctr= cand2[11];
      candidate[1].ctr= cand1[11];

      return candidate;
    }
    function mutate(candidate){
      for(i=0;i<1;i++){

        switch(Math.floor(randomInteger(0, 9))){
          case 0:

          candidate.altitudeDifference = randomInteger(-1,1);
          break;
          case 1:
          candidate.linesWeight = randomInteger(-1,1);
          break;
          case 2:
          candidate.holesWeight = randomInteger(-1,1);
          break;
          case 3:
          candidate.sumWellsWeight = randomInteger(-1,1);
          break;
          case 4:
          candidate.pileHeightWeight = randomInteger(-1,1);
          break;
          case 5:
          candidate.columnsTransitionsWeight= randomInteger(-1,1);
          break;
          case 6:
          candidate.rowTransitionsWeight= randomInteger(-1,1);
          break;
          case 7:
          candidate.blockWeight= randomInteger(-1,1);
          break;
          case 8:
          candidate.maximumWellsDepthWeight= randomInteger(-1,1);
          break;
          case 8:
          candidate.bumpiness= randomInteger(-1,1);
          break;
        }
      }

    }
    function flipmutate(candidate){
      var cand1=[];
      console.log(JSON.stringify(candidate));
      for (x in candidate) {
        cand1.push(candidate[x]);
      }

      var point=Math.floor(randomInteger(0,9));
      var point2=Math.floor(randomInteger(0,9));


        switch(point2){
          case 0:
          candidate.altitudeDifference= cand1[point];
          break;
          case 1:
          candidate.linesWeight= cand1[point];
          break;
          case 2:
          candidate.holesWeight= cand1[point];
          break;
          case 3:
          candidate.sumWellsWeight= cand1[point];
          break;
          case 4:
          candidate.pileHeightWeight = cand1[point];
          break;
          case 5:
          candidate.columnsTransitionsWeight= cand1[point];
          break;
          case 6:
          candidate.rowTransitionsWeight= cand1[point];
          break;
          case 7:
          candidate.blockWeight= cand1[point];
          break;
          case 8:
          candidate.maximumWellsDepthWeight= cand1[point];
          break;
          case 9:
          candidate.bumpiness= cand1[point];
          break;
        }
        switch(point){
          case 0:
          candidate.altitudeDifference= cand1[point2];
          break;
          case 1:
          candidate.linesWeight= cand1[point2];
          break;
          case 2:
          candidate.holesWeight= cand1[point2];
          break;
          case 3:
          candidate.sumWellsWeight= cand1[point2];
          break;
          case 4:
          candidate.pileHeightWeight = cand1[point2];
          break;
          case 5:
          candidate.columnsTransitionsWeight= cand1[point2];
          break;
          case 6:
          candidate.rowTransitionsWeight= cand1[point2];
          break;
          case 7:
          candidate.blockWeight= cand1[point2];
          break;
          case 8:
          candidate.maximumWellsDepthWeight= cand1[point2];
          break;
          case 9:
          candidate.bumpiness= cand1[point2];
          break;
        }
        console.log("sesudah");
        console.log(JSON.stringify(candidate));
  }

    function deleteNLastReplacement(candidates, newCandidates){

      for(var i = 0; i < newCandidates.length; i++){
        candidates.push(newCandidates[i]);
      }

      sort(candidates);

      candidates.splice(candidates.length-newCandidates.length);



    }

    function sameind(candidate,candidates){
      for (var i = 0; i < candidates.length; i++) {
        if(JSON.stringify(candidates[i])==JSON.stringify(candidate)){
          return candidates[i];
        }
      }
      return false;
    }
    function pick(prob){
      var index=0;
      var random=Math.random();
      while (random>0) {
        random-=prob[index];
        index++;
      }
      index--;
      return index;
    }

    this.tune = function(population,block,mutationrate,generation){

      var candidates = [];

      // Initial population generation
      for(var i = 0; i < population; i++){
        candidates.push(generateRandomCandidate());
      }
      // candidates.forEach(fucntion(val){
      //   console.log(val);
      // });
      //console.log(candidates);
      // for (var i = 0; i < candidates.length; i++) {
      //     setTimeout(computeSingleFitnesses(candidates[i],block),100);
      //     console.log(i);
      // }
      console.log('Computing fitnesses of initial population...');
    computeFitnesses(candidates,block);
      sort(candidates);

      var count = 1;
      var maxfitnes=0;
      var maxfitctr=0;
      var totalFitness=0;
      for(var i = 0; i < candidates.length; i++){
        totalFitness += candidates[i].fitness;
      }
      var averagefitnes=[];
      //while(candidates[0].fitness!=(block/2.5)-1 || totalFitness==0){
    for (gen=0;gen<generation;gen++){
      if(candidates[0].fitness==(block/2.5)-1 ){
        break;
      }
        var newCandidates = [];
        var prob=[];

        for (var i = 0; i < candidates.length; i++) {
          prob.push(candidates[i].fitness/totalFitness);
        }


        for(var i = 0; i < Math.floor(candidates.length/2); i++){
          if(totalFitness==0){
            var ind1=Math.floor(randomInteger(0,candidates.length-1));
            var ind2=Math.floor(randomInteger(0,candidates.length-1));
            while(ind1==ind2){
              var ind2=Math.floor(randomInteger(0,candidates.length-1));
            }
          }else{
            var ind1=pick(prob);
            var ind2=pick(prob);
            while(ind1==ind2 ){
              if(ind1!=candidates.length-1){
                ind2++;
              }else{
                ind2=pick(prob);
              }

            }
          }



          var candidate = twoPointCrossOver (candidates[ind1], candidates[ind2]);


          if(Math.random()<mutationrate){
            mutate(candidate[0]);

          }
          if(Math.random()<mutationrate){

            mutate(candidate[1]);

          }
          if(JSON.stringify(candidate[1])==JSON.stringify(candidate[0])){
            candidate[1]=candidates[ind1];
            candidate[0]=candidates[ind1];

          }
          for(var j= 0; j < candidate.length; j++){
            newCandidates.push(candidate[j]);

          }

        }
      //  console.log(JSON.stringify(newCandidates));
        console.log('Computing fitnesses of new candidates. (' + count + ')');
        for (var i = 0; i < newCandidates.length; i++) {
          if(sameind(newCandidates[i],candidates)){
            newCandidates[i]=sameind(newCandidates[i],candidates);
            console.log("same");
          }else{
            computeSingleFitnesses(newCandidates[i],block);
          }
        }

        for(var i = 0; i < newCandidates.length; i++){
          candidates.push(newCandidates[i]);
        }
        sort(candidates);


        candidates.splice(candidates.length-newCandidates.length);

        //deleteNLastReplacement(candidates, newCandidates);
        var totalFitness = 0;
        var lnclear=0;
        for(var i = 0; i < candidates.length; i++){
          totalFitness += candidates[i].fitness;
          lnclear+=candidates[i].ctr;
        }
        if(maxfitnes<candidates[0].fitness){
          maxfitctr=0;
          maxfitnes=candidates[0].fitness;
        }else{
          maxfitctr++;
        }
        console.log('Average fitness = ' + (totalFitness / candidates.length));
        console.log('Highest fitness = ' + candidates[0].fitness + '(' + count + ')');
        console.log('Fittest candidate = ' + JSON.stringify(candidates[0]) + '(' + count + ')');
  console.log('Fittest candidate = ' + JSON.stringify(candidates) + '(' + count + ')');
//console.log(lnclear/ candidates.length)
        count++;

      }



    };
  }
