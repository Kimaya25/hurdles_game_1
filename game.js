class game {
    constructor(){
  
    }
  
    getState(){
      var gameStateRef  = database.ref('gameState');
      gameStateRef.on("value",function(data){
         gameState = data.val();
      })
  
    }
  
    update(state){
      database.ref('/').update({
        gameState: state
      });
    }
  
    async start(){
      if(gameState === 0){
        player = new players();
        var playerCountRef = await database.ref('playerCount').once("value");
        if(playerCountRef.exists()){
          playerCount = playerCountRef.val();
          player.getCount();
        }
        Form = new form()
        Form.display();
      }
  
      runner1 = createSprite(100,200);
      runner1.addImage(runner1.jpg);
      runner2 = createSprite(300,200);
      runner2.addImage(runner2.jpg);
      runner3 = createSprite(500,200);
      runner3.addImage(runner3.jpg);
      runner4 = createSprite(700,200);
      runner4.addImage(runner4.jpg);
      runners = [runner1, runner2, runner3, runner4];
    }
  
    play(){
      Form.hide();
      player.getRunnersAtEnd();
  
      players.getPlayerInfo();
      
      if(allPlayers !== undefined){
        background(rgb(198,50,38));
        image(race_track,0,-displayHeight * 4 , displayWidth,displayHeight * 5);
        //var display_position = 100;
        
        //index of the array
        var index = 0;
  
        //x and y position of the cars
        var x = 175;
        var y;
  
        for(var plr in allPlayers){
          //add 1 to the index for every loop
          index = index + 1 ;
  
          //position the cars a little away from each other in x direction
          x = x + 200;
          //use data form the database to display the cars in y direction
          y = displayHeight - allPlayers[plr].distance;
          runners[index-1].x = x;
          runners[index-1].y = y;
  
          if (index === player.index){
            fill("red");
            ellipse(x,y,60,60);
  
            runners[index - 1].shapeColor = "red";
            camera.position.x = displayWidth/2;
            camera.position.y = runners[index-1].y
  
          }
         
          //textSize(15);
          //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
        }
  
      }
  
      if(keyIsDown(UP_ARROW) && player.index !== null){
        player.distance +=10
        player.update();
      }
      if(player.distance > 3078 ){
        gameState = 2;
        player.rank = player.rank + 1;
        players.updateRunnersAtEnd(player.rank);
  
      }
  
      drawSprites();
    }
    end(){
      game.update(2);
    }
  
  }
  