var backImage,backgr;
var player, player_running;
var ground,ground_img;

var END =0;
var PLAY =1;
var gameState = 1;
var score;
var FoodGroup;
var ObstacleGroup;
function preload(){
  backImage=loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");

  bananaI = loadImage("banana.png");
  stoneI = loadImage("stone.png");

  gameOverI = loadImage("gameOver.png");
}

function setup() {
  createCanvas(800,400);
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;
  player.visibile = true; 
  
  ground = createSprite(400,350,800,10);
  ground.x=ground.width/2;
  ground.visible=false;

  gameOver = createSprite(400,200,30, 300);
  gameOver.addImage(gameOverI);
  gameOver.scale = 1;


  FoodGroup = new Group();
  ObstacleGroup = new Group();
  
  score =0;
}

function draw() { 
  background(0);

  if(gameState===1){
   
   backgr.visible = true;
   player.visible = true; 
   gameOver.visible = false; 

   backgr.velocityX=-4;
    if(backgr.x<100){
    backgr.x=backgr.width/2;
    }

    if(keyDown("space") ) {
      player.velocityY = -12;
    }
    player.velocityY = player.velocityY + 0.8;
    player.collide(ground);

    if(FoodGroup.isTouching(player)){
      FoodGroup.destroyEach();
      score = score +1;
      player.scale += +0.01;
    }
  
    if(ObstacleGroup.collide(player)){
      gameState = 0;
    }
    spawnBananas();
    spawnObstacles();
  } else if(gameState === 0){
   background(0);

   backgr.velocityX=0;
   backgr.visible = false;
   player.visible = false; 
  
   FoodGroup.destroyEach();
   ObstacleGroup.destroyEach();

   gameOver.visible = true;
   textSize(25);
   fill("white");
   text("Press 'r' to Start Over",300, 300);

   if(keyDown("r")){
    gameState = 1;
    score = 0;
   }
  }
   
  drawSprites();
  textSize(25);
    fill("white");
    text("Score : "+ score, 600,50);
}

function spawnBananas(){
  if(frameCount %100 === 0){
    var banana = createSprite(800,20,40,10);
    banana.y = random(120,200);
    banana.addImage(bananaI);
    banana.scale =0.05;
    banana.velocityX=-4;

    banana.lifetime =300;
    player.depth = banana.depth +1;
    FoodGroup.add(banana);
  }

}

function spawnObstacles(){
  if(frameCount %80 === 0){
    var stone = createSprite(800,330,40,10);
    stone.addImage(stoneI);
    stone.scale = 0.1;
    stone.velocityX=-4;

    stone.lifetime =300;
    player.depth = stone.depth +1;
    ObstacleGroup.add(stone);
  }
}
