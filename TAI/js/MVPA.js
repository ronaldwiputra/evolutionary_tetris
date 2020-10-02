
function mvpa(){
  var myrng = new Math.seedrandom('9');
  function shuffle(arra1) {
    var ctr = arra1.length, temp, index;

    // While there are elements in the array
    while (ctr > 0) {
      // Pick a random index
      index = Math.floor(Math.random()* ctr);
      // Decrease ctr by 1
      ctr--;
      // And swap the last element with it
      [ arra1[ctr], arra1[index] ] = [ arra1[index], arra1[ctr] ];

    }

    return arra1;
  }
  function randomInteger(min, max){
    return (Math.random()* (max - min) + min);
  }
  function randomCandidate(min, max){
    return (Math.random()* (max - min) + min);
  }
  function generateRandom(min, max,i) {
    var num = Math.floor(Math.random()* (max - min + 1)) + min;
    return (num === i) ? generateRandom(min, max) : num;
  }
  function listcandidates(team){
    var candidate=[];
    for(var i = 0; i < team.length; i++){
      for(var j=0;j<team[i].length;j++){
        candidate.push(team[i][j]);
      }
    }
    return candidate;
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

    };

    return candidate;
  }


  function sort(candidates){
    candidates.sort(function(a, b){
      return b.fitness - a.fitness;
    });
  }

  function computeSingleFitnesses(candidates, maxNumberOfMoves){

    var play=1;
    var candidate = candidates;

    var ai = new AI(candidate.altitudeDifference, candidate.linesWeight,
      candidate.holesWeight, candidate.sumWellsWeight,candidate.pileHeightWeight
      ,candidate.columnsTransitionsWeight,candidate.rowTransitionsWeight,candidate.blockWeight,
      candidate.maximumWellsDepthWeight,candidate.bumpiness);

      var totalScore = 0;
      var min=0;
      var scores=[];
      for(var j = 0; j < play; j++){
        var grid = new Grid(22, 10);
        var rpg = new RandomPieceGenerator();
        var workingPieces = [rpg.nextPiece(), rpg.nextPiece()];

        var workingPiece = workingPieces[0];
        var max=0;
        var score = 0;
        var numberOfMoves = 0;
        //var maxNumberOfMoves=block;
        while((numberOfMoves++) < maxNumberOfMoves && !grid.exceeded()){
          workingPiece = ai.best(grid, workingPieces );
          while(workingPiece.moveDown(grid));
          grid.addPiece(workingPiece);
          //  score += grid.clearLines();
          score+=grid.clearLines();
          for(var k = 0; k < workingPieces.length - 1; k++){
            workingPieces[k] = workingPieces[k + 1];
          }
          workingPieces[workingPieces.length - 1] = rpg.nextPiece();
          workingPiece = workingPieces[0];
          // if(score>=(candidate.block/2.5)-1){
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
          // if(grid.pileHeight()>max){
          //   max=grid.pileHeight()
          // }
          //score+=max;

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
      candidate.fitness = totalScore/play;
      //candidate.fitness = Math.min.apply(null,scores);
      //console.log( candidate.fitness) ;

    }

    function computeFitnesses(candidates, maxNumberOfMoves){
      var play=1;
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
              // if(grid.pileHeight()>max){
              //   max=grid.pileHeight()
              // }


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
          candidate.fitness = totalScore/play;
          //candidate.fitness = Math.min.apply(null,scores);
          //console.log( candidate.fitness);

        }
      }
      function getMVP(teams){

        var max=null;
        var mvp;
        for (var i = 0; i < teams.length; i++) {
          // console.log(getTeamfitness(teams[i]).fitness+" fitnes");
          // console.log(max+" max");
          if(getTeamfitness(teams[i]).fitness >= max  || max==null)  {
            // console.log(max+" sebelum");

            max=getTeamfitness(teams[i]).fitness ;
            mvp=getTeamfitness(teams[i]);
            // console.log(max+" sesudah");
          }
        }

        return mvp;
      }


      function elit(teams){
        var minim=null;
        var index=[];

        for (var i = 0; i < teams.length; i++) {
          for (var j = 0; j < teams[i].length; j++) {
            //  console.log(teams[i][j].fitness +" "+ minim);
            if(teams[i][j].fitness<=minim || minim==null){

              minim=teams[i][j].fitness;
              index=[];
              index.push(i);
              index.push(j);
            }
          }
        }
        return index;
      }
      function getMinFitness(group){

        let fitness=null;

        for (i=0;i<group.length;i++){
          for (j=0;j<group[i].length;j++){
            if(group[i][j].fitness<=fitness  || fitness==null){
              fitness=group[i][j].fitness;

            }
          }
        }

        return fitness;
      }
      function getTeamfitness(group){

        var max=null;
        var index=0;
        for (j=0;j<group.length;j++){

          if(group[j].fitness > max  || max==null){
            max=group[j].fitness;

            index=j;
          }
        }

        return group[index];
      }

      function teamFormation(candidates,numberOfTeam){
        var group=[];
        var ctr=0;
        for (var i =0;i<numberOfTeam; i++){
          group.push([]);
        }
        for (var i =0;i<numberOfTeam; i++){
          for(var j=0;j<candidates.length/numberOfTeam;j++){
            group[i].push(candidates[ctr]);
            ctr++;
          }
        }
        return group;
      }
      function normalize(teamA,minFintess){


        return (teamA-minFintess)+1;
      }

      function whoWin(teamA,teamB,k,minim){
        var a=  normalize(getTeamfitness(teamA).fitness,minim);
        var b=  normalize(getTeamfitness(teamB).fitness,minim);
        // console.log(a+" a");
        // console.log(b+" b");

        return (Math.pow(a,k)/(Math.pow(a,k)+Math.pow(b,k)));


      }

      function loseTeamCompetition(teams,i,tecom,teamsJ){
        let newPlayer={

        };

        newPlayer.altitudeDifference=teams[i][tecom].altitudeDifference + randomInteger(0,1) * (teamsJ.altitudeDifference-teams[i][tecom].altitudeDifference);
        newPlayer.linesWeight=teams[i][tecom].linesWeight + randomInteger(0,1) * (teamsJ.linesWeight-teams[i][tecom].linesWeight);
        newPlayer.holesWeight=teams[i][tecom].holesWeight + randomInteger(0,1) * (teamsJ.holesWeight-teams[i][tecom].holesWeight);
        newPlayer.sumWellsWeight=teams[i][tecom].sumWellsWeight + randomInteger(0,1) * (teamsJ.sumWellsWeight-teams[i][tecom].sumWellsWeight);
        newPlayer.pileHeightWeight=teams[i][tecom].pileHeightWeight + randomInteger(0,1) * (teamsJ.pileHeightWeight-teams[i][tecom].pileHeightWeight);
        newPlayer.columnsTransitionsWeight=teams[i][tecom].columnsTransitionsWeight + randomInteger(0,1) * (teamsJ.columnsTransitionsWeight-teams[i][tecom].columnsTransitionsWeight);
        newPlayer.rowTransitionsWeight=teams[i][tecom].rowTransitionsWeight + randomInteger(0,1) * (teamsJ.rowTransitionsWeight-teams[i][tecom].rowTransitionsWeight);
        newPlayer.blockWeight=teams[i][tecom].blockWeight + randomInteger(0,1) * (teamsJ.blockWeight-teams[i][tecom].blockWeight);
        newPlayer.maximumWellsDepthWeight=teams[i][tecom].maximumWellsDepthWeight + randomInteger(0,1) * (teamsJ.maximumWellsDepthWeight-teams[i][tecom].maximumWellsDepthWeight);
        newPlayer.bumpiness=teams[i][tecom].bumpiness + randomInteger(0,1) * (teamsJ.bumpiness-teams[i][tecom].bumpiness);
        newPlayer.fitness=teams[i][tecom].fitness+0;

        checkbound(newPlayer);

        return newPlayer;
      }
      function winTeamCompetition(teams,i,tecom,teamsJ){

        var newPlayer={

        };
        newPlayer.altitudeDifference=teams[i][tecom].altitudeDifference + randomInteger(0,1) * (teams[i][tecom].altitudeDifference-teamsJ.altitudeDifference);
        newPlayer.linesWeight=teams[i][tecom].linesWeight + randomInteger(0,1) * (teams[i][tecom].linesWeight-teamsJ.linesWeight);
        newPlayer.holesWeight=teams[i][tecom].holesWeight + randomInteger(0,1) * (teams[i][tecom].holesWeight-teamsJ.holesWeight);
        newPlayer.sumWellsWeight=teams[i][tecom].sumWellsWeight + randomInteger(0,1) * (teams[i][tecom].sumWellsWeight-teamsJ.sumWellsWeight);
        newPlayer.pileHeightWeight =teams[i][tecom].pileHeightWeight + randomInteger(0,1) * (teams[i][tecom].pileHeightWeight-teamsJ.pileHeightWeight);
        newPlayer.columnsTransitionsWeight=teams[i][tecom].columnsTransitionsWeight + randomInteger(0,1) * (teams[i][tecom].columnsTransitionsWeight-teamsJ.columnsTransitionsWeight);
        newPlayer.rowTransitionsWeight=teams[i][tecom].rowTransitionsWeight + randomInteger(0,1) * (teams[i][tecom].rowTransitionsWeight-teamsJ.rowTransitionsWeight);
        newPlayer.blockWeight=teams[i][tecom].blockWeight + randomInteger(0,1) * (teams[i][tecom].blockWeight-teamsJ.blockWeight);
        newPlayer.maximumWellsDepthWeight=teams[i][tecom].maximumWellsDepthWeight + randomInteger(0,1) * (teams[i][tecom].maximumWellsDepthWeight-teamsJ.maximumWellsDepthWeight);
        newPlayer.bumpiness=teams[i][tecom].bumpiness + randomInteger(0,1) * (teams[i][tecom].bumpiness-teamsJ.bumpiness);
        newPlayer.fitness=teams[i][tecom].fitness+0;

        checkbound(newPlayer);

        return newPlayer;
      }

      function clone(array){
        let newPlayer={

        };

        newPlayer.altitudeDifference=array.altitudeDifference+0;
        newPlayer.linesWeight=array.linesWeight+0;
        newPlayer.holesWeight=array.holesWeight+0 ;
        newPlayer.sumWellsWeight=array.sumWellsWeight+0;
        newPlayer.pileHeightWeight =array.pileHeightWeight+0;
        newPlayer.columnsTransitionsWeight=array.columnsTransitionsWeight+0 ;
        newPlayer.rowTransitionsWeight=array.rowTransitionsWeight+0 ;
        newPlayer.blockWeight=array.blockWeight+0 ;
        newPlayer.maximumWellsDepthWeight=array.maximumWellsDepthWeight+0 ;
        newPlayer.bumpiness=array.bumpiness+0 ;
        newPlayer.fitness=array.fitness+0 ;

        return newPlayer;
      }

      function individualCompetition(teams,i,incom,mvp){

        var newPlayer={

        };
        newPlayer.altitudeDifference=teams[i][incom].altitudeDifference + randomInteger(0,1) * (franchiseplayer[i].altitudeDifference-teams[i][incom].altitudeDifference)
        +2*randomInteger(0,1)*(mvp.altitudeDifference-teams[i][incom].altitudeDifference);
        newPlayer.linesWeight=teams[i][incom].linesWeight + randomInteger(0,1) * (franchiseplayer[i].linesWeight-teams[i][incom].linesWeight)
        +2*randomInteger(0,1)*(mvp.linesWeight-teams[i][incom].linesWeight);
        newPlayer.holesWeight=teams[i][incom].holesWeight + randomInteger(0,1) * (franchiseplayer[i].holesWeight-teams[i][incom].holesWeight)
        +2*randomInteger(0,1)*(mvp.holesWeight-teams[i][incom].holesWeight);
        newPlayer.sumWellsWeight=teams[i][incom].sumWellsWeight + randomInteger(0,1) * (franchiseplayer[i].sumWellsWeight-teams[i][incom].sumWellsWeight)
        +2*randomInteger(0,1)*(mvp.sumWellsWeight-teams[i][incom].sumWellsWeight);
        newPlayer.pileHeightWeight =teams[i][incom].pileHeightWeight + randomInteger(0,1) * (franchiseplayer[i].pileHeightWeight-teams[i][incom].pileHeightWeight)
        +2*randomInteger(0,1)*(mvp.pileHeightWeight-teams[i][incom].pileHeightWeight);
        newPlayer.columnsTransitionsWeight=teams[i][incom].columnsTransitionsWeight +randomInteger(0,1) * (franchiseplayer[i].columnsTransitionsWeight-teams[i][incom].columnsTransitionsWeight)
        +2*randomInteger(0,1)*(mvp.columnsTransitionsWeight-teams[i][incom].columnsTransitionsWeight);
        newPlayer.rowTransitionsWeight=teams[i][incom].rowTransitionsWeight + randomInteger(0,1) * (franchiseplayer[i].rowTransitionsWeight-teams[i][incom].rowTransitionsWeight)
        +2*randomInteger(0,1)*(mvp.rowTransitionsWeight-(franchiseplayer[i]).rowTransitionsWeight);
        newPlayer.blockWeight=teams[i][incom].blockWeight + randomInteger(0,1) * (franchiseplayer[i].blockWeight-teams[i][incom].blockWeight)
        +2*randomInteger(0,1)*(mvp.blockWeight-teams[i][incom].blockWeight);
        newPlayer.maximumWellsDepthWeight=teams[i][incom].maximumWellsDepthWeight + randomInteger(0,1) * (franchiseplayer[i].maximumWellsDepthWeight-teams[i][incom].maximumWellsDepthWeight)
        +2*randomInteger(0,1)*(mvp.maximumWellsDepthWeight-teams[i][incom].maximumWellsDepthWeight);
        newPlayer.bumpiness=teams[i][incom].bumpiness + randomInteger(0,1) * (franchiseplayer[i].bumpiness-teams[i][incom].bumpiness)
        +2*randomInteger(0,1)*(mvp.bumpiness-teams[i][incom].bumpiness);


        return newPlayer;
      }

      function removeDuplicatePlayers(player,teams){

        for (var i = 1; i < player.length; i++) {
          if(JSON.stringify(player[i])==JSON.stringify(player[i-1])){
            //console.log(player[i]);
            mutate(player[i]);
            //console.log(player[i]);
            replace1(player[i],teams);
            //console.log("sama ini")
            console.log(player[i]);
            //console.log("hasil ini");
          }
        }
      }
      function checkbound(newPlayer){
        if(newPlayer.altitudeDifference > 1){
          newPlayer.altitudeDifference=1
        }
        else if (newPlayer.altitudeDifference<-1){
          newPlayer.altitudeDifference=-1;
        }

        if(newPlayer.linesWeight > 1){
          newPlayer.linesWeight=1;
        }
        else if (  newPlayer.linesWeight<-1){
          newPlayer.linesWeight=-1;
        }

        if(newPlayer.holesWeight > 1){
          newPlayer.holesWeight=1;}
          else if (  newPlayer.holesWeight<-1){
            newPlayer.holesWeight=-1;
          }

          if(newPlayer.sumWellsWeight > 1){
            newPlayer.sumWellsWeight=1;
          }
          else if (newPlayer.sumWellsWeight<-1){
            newPlayer.sumWellsWeight=-1;
          }

          if(newPlayer.pileHeightWeight > 1){
            newPlayer.pileHeightWeight=1;
          }
          else if (  newPlayer.pileHeightWeight<-1){
            newPlayer.pileHeightWeight=-1;
          }

          if(newPlayer.columnsTransitionsWeight > 1){
            newPlayer.columnsTransitionsWeight=1;
          }
          else if (  newPlayer.columnsTransitionsWeight<-1){
            newPlayer.columnsTransitionsWeight=-1;
          }

          if(newPlayer.rowTransitionsWeight > 1){
            newPlayer.rowTransitionsWeight=1;
          }
          else if (  newPlayer.rowTransitionsWeight<-1){
            newPlayer.rowTransitionsWeight=-1;
          }

          if(newPlayer.blockWeight > 1){
            newPlayer.blockWeight=1;
          }
          else if (  newPlayer.blockWeight<-1){
            newPlayer.blockWeight=-1;
          }

          if(newPlayer.maximumWellsDepthWeight > 1){
            newPlayer.maximumWellsDepthWeight=1;
          }
          else if (  newPlayer.maximumWellsDepthWeight<-1){
            newPlayer.maximumWellsDepthWeight=-1;
          }

          if(newPlayer.bumpiness > 1){
            newPlayer.bumpiness=1;
          }
          else if (  newPlayer.bumpiness<-1){
            newPlayer.bumpiness=-1;
          }
        }

        function mutate(player){
          player.altitudeDifference=player.altitudeDifference+(0.5*Math.random()+ 0.25*Math.random()*(Math.random()*2-1))/10;
          player.linesWeight=player.linesWeight+(0.5*Math.random()+ 0.25*Math.random()*(Math.random()*2-1))/10;
          player.holesWeight=player.holesWeight+(0.5*Math.random()+ 0.25*Math.random()*(Math.random()*2-1))/10;
          player.sumWellsWeight=player.sumWellsWeight+(0.5*Math.random()+ 0.25*Math.random()*(Math.random()*2-1))/10;
          player.pileHeightWeight =player.pileHeightWeight+(0.5*Math.random()+ 0.25*Math.random()*(Math.random()*2-1))/10;
          player.columnsTransitionsWeight=player.columnsTransitionsWeight+(0.5*Math.random()+ 0.25*Math.random()*(Math.random()*2-1))/10;
          player.rowTransitionsWeight=player.rowTransitionsWeight+(0.5*Math.random()+ 0.25*Math.random()*(Math.random()*2-1))/10;
          player.blockWeight=player.blockWeight+(0.5*Math.random()+ 0.25*Math.random()*(Math.random()*2-1))/10;
          player.maximumWellsDepthWeight=player.maximumWellsDepthWeight+(0.5*Math.random()+ 0.25*Math.random()*(Math.random()*2-1))/10;
          player.bumpiness=player.bumpiness+(0.5*Math.random()+ 0.25*Math.random()*(Math.random()*2-1))/10;
          player.fitness=player.fitness+0;

          console.log("Mutate");
          checkbound(player);
          // computeSingleFitnesses(player,1000);
        }
        function replace(newPlayer,teams){
          console.log("mulai replace");
          console.log("teams")
          for(i=0;i<newPlayer.length;i++){
            for(j=0;j<newPlayer[i].length;j++){
              console.log(teams[i][j].fitness);
            }
          }
          console.log("newplayer")
          for(i=0;i<newPlayer.length;i++){
            for(j=0;j<newPlayer[i].length;j++){
              console.log(newPlayer[i][j].fitness);
            }
          }
          console.log("hasil sebelum");
          for(i=0;i<newPlayer.length;i++){
            for(j=0;j<newPlayer[i].length;j++){
              if(newPlayer[i][j].fitness>teams[i][j].fitness){
                teams[i][j]=clone(newPlayer[i][j]);
                console.log("replace");
                //  break;
              }
            }
          }
          for(i=0;i<newPlayer.length;i++){
            for(j=0;j<newPlayer[i].length;j++){
              console.log(teams[i][j].fitness);
            }
          }
          console.log("hasil sesudah");
        }
        function replace1(player,teams){
          var stat=false;
          console.log(player.fitness +" fitness yang direplace")
          for(i=0;i<teams.length;i++){
            for(j=0;j<teams[i].length;j++){
              if(teams[i][j].fitness==player.fitness){

                  console.log("REPLACE "+ player.fitness);
                  computeSingleFitnesses(  player,1000);
                teams[i][j]=clone(player);
                //computeSingleFitnesses(  teams[i][j],1000);

                console.log("replace1 "+ teams[i][j].fitness);
                stat=true;
                break;
              }
            }
            if(stat){
              break;
            }
          }
        }
        function getPlayer(teams){

          for (var i = 0; i < teams.length; i++) {
            for (var j = 0; j < teams[i].length; j++) {
              player.push(teams[i][j]);
            }
          }
          sort(player);
          for (var i = 0; i < player.length; i++) {
            console.log(player[i].fitness);
          }
          console.log("SELESAI GET");
        }
        function elite(player,teams){
          var ctr=0;
          var numberElite=Math.round(player.length/3);
          for (var i = player.length-1; i > player.length-1-numberElite; i--) {

            searchPlayer(player[i],teams,player[ctr]);
            player[i]=clone(player[ctr]);
            ctr++;
          }
          console.log("ELITE");
          for (var i = 0; i < teams.length; i++) {
            for (var j = 0; j < teams[i].length; j++) {
              console.log(teams[i][j].fitness);
            }
          }

          console.log("ELITE");
          //console.log(player);
        }
        function searchPlayer(ind,teams,player){
          for (var i = 0; i < teams.length; i++) {
            for (var j = 0; j < teams[i].length; j++) {
              if(teams[i][j].fitness==ind.fitness){
                teams[i][j]=clone(player);
                break;
              }
            }
          }
        }
        this.tune = function(population,competition,group,k){
          var candidates = [];

          console.log('make population');
          for(var i = 0; i < population; i++){
            candidates.push(generateRandomCandidate());

          }

          console.log(" create candidate");
          var count=1;
          console.log('Computing fitnesses of initial population...');
          computeFitnesses(candidates,1000);
          console.log('finished computing');
          var teams=teamFormation(shuffle(candidates),group);

          var mvp=getMVP(teams);
          var count=0;
          //while(candidates[0].fitness!=(block/2.5)-1 || totalFitness==0){
          console.log('Start Competition');
          for(comp=0;comp<competition;comp++){

            mvp=getMVP(teams);
            // if(mvp.fitness==(block/2.5)-1 ){
            //   break;
            // }
            franchiseplayer=[];
            for (var i = 0; i < teams.length; i++) {
              franchiseplayer.push(getTeamfitness(teams[i]));
            }


            var newPlayer=[];

            for (i=0;i<teams.length;i++){
              newPlayer.push([]);

            }

            for (i=0;i<teams.length;i++){
              for (var j = 0; j < teams[i].length; j++) {
                newPlayer[i].push(clone(teams[i][j]));
              }


            }


            for (var i=0;i<teams.length; i++){
              //for team

              var j=generateRandom(0,teams.length-1,i);

              for (var incom=0;incom < teams[i].length;incom++){
                newPlayer[i][incom]=(individualCompetition(newPlayer,i,incom,mvp));

              }

              computeFitnesses(newPlayer[i],1000);



              var minim=getMinFitness(newPlayer);
              //  console.log(minim);
              if(whoWin(newPlayer[i],newPlayer[j],k,minim)>Math.random()){
                for (perPlayer=0;perPlayer<newPlayer[i].length;perPlayer++){
                  newPlayer[i][perPlayer]=winTeamCompetition(newPlayer,i,perPlayer,franchiseplayer[j]);
                }
              }else{
                for (perPlayer=0;perPlayer<newPlayer[i].length;perPlayer++){
                  newPlayer[i][perPlayer]=loseTeamCompetition(newPlayer,i,perPlayer,franchiseplayer[j]);
                }
              }
              computeFitnesses(newPlayer[i],1000);
              console.log("complate tournament team "+ i);

              console.log("selesai iterasi");

            }
            player=[];
            getPlayer(teams);
            replace(newPlayer,teams);
            for (var i = 0; i < teams.length; i++) {
              for (var j = 0; j < teams[i].length; j++) {
                console.log(teams[i][j].fitness);
              }
            }
            console.log("hasil bener");
            player=[];
            getPlayer(teams);
            console.log("STOP");
            sort(player);

            elite(player,teams);
            removeDuplicatePlayers(player,teams);


            var totalFitness=0;
            // var index=elit(teams);
            //
            // teams[index[0]][index[1]]=getMVP(teams);

            for(var i = 0; i < teams.length; i++){
              for (var j = 0; j < teams[i].length; j++) {
                totalFitness += teams[i][j].fitness;

              }

            }



            console.log("ini fitness");
            for (var i = 0; i < candidates.length; i++) {
              console.log(player[i].fitness);
            }

            console.log('Average fitness = ' + (totalFitness / candidates.length));
            console.log('Highest fitness = ' + getMVP(teams).fitness + '(' + count + ')');
            console.log('Fittest candidate = ' +  JSON.stringify(getMVP(teams)) + '(' + count + ')');
            //
            console.log('Fittest candidate = ' + JSON.stringify(teams) + '(' + count + ')');
            count++;
            if ((getMVP(teams).fitness)==(1000/2.5)-1){
              break;
            }
          };
        }
      }
