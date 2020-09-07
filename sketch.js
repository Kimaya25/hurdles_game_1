var database;
var gameState = 0;
var playerCount;
var runner1, runner2, runner3, runner4,runners;
var allPlayers;
var Game , Form, player;

function preload(){
 loadImage = ("images/hurdle1");
 loadImage = ("images/runner1");
 loaadImage = ("images/runner2");
 loadImage = ("images/runner3");
 loadImage = ("images/runner4");
 loadImages = ("images/race_track");
}

function setup() {
  createCanvas(400,400);
  database = firebase.database();
  Game = new game();
  Game.getState();
  Game.start();
}


function draw(){
  if(playerCount === 4){
    Game.update(1);
  }
  if(gameState === 1){
    clear();
    Game.play();
  }
  

  spawnObstacles();
 }

function spawnObstacles(){
  if(frameCount % 60 === 0){
    var hurdles1 = createSprite(200,300)
  }
}