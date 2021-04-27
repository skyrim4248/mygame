var chicken, bg, coop, bridge;
var car, car2, car2, car3;

//var lives = 5;
var chickenImage, car1Image, car2Image, car3Image, coopImage, bgImage, bridgeImage;

var flapSound, dieSound, splashSound, winSound;

var carsGroup;

var END = 0;
var PLAY = 1;
var gameState = PLAY;
var lives = 10;



function preload(){
  chickenImage = loadImage("chicken.png");
  car1Image = loadImage("car1_img.png");
  car2Image = loadImage("car2_img.png");
  car3Image = loadImage("car3_img.png");
  coopImage = loadImage("coop.png");
  bgImage = loadImage("bg.jpg");
  bridgeImage = loadImage("bridge.png");
  flapSound = loadSound("flap.mp3");
  splashSound = loadSound("splash.mp3");
  dieSound = loadSound("die.mp3");
  winSound = loadSound("Win.mp3");
}
function setup() {
  createCanvas(400, 400);
  
bg = createSprite(200, 200, 400,400);
bg.addImage(bgImage);
  
bridge = createSprite(200, 208, 35, 100);
bridge.addImage(bridgeImage);
bridge.scale = 0.2;
  
chicken = createSprite(200, 380, 20, 20);
chicken.addImage(chickenImage);
chicken.scale = 0.1;
  
coop = createSprite(160, 40, 20, 20);
coop.addImage(coopImage);
coop.scale = 0.25;
  

carsGroup = createGroup();

}

function draw() {
    background(255);
  drawSprites();
  
  if(gameState === PLAY){
    
  if(keyDown("UP_ARROW")){
    chicken.y = chicken.y -3;
    
  }
  if(keyDown("DOWN_ARROW")){
    chicken.y = chicken.y +3;
  }
  if(keyDown("LEFT_ARROW")){
    chicken.x = chicken.x -3;
  }
  if(keyDown("RIGHT_ARROW")){
    chicken.x = chicken.x +3;
  }
  
  if(carsGroup.isTouching(chicken)){
    chicken.x = 200;
    chicken.y = 380;
    lives -= 1;
    dieSound.play();
    
  }
  
  if(chicken.x<190 && chicken.y > 165 && chicken.y < 250){
     chicken.x = 200;
     chicken.y = 380;
     lives -=1;
     splashSound.play();
  }
  if(chicken.x>225 && chicken.y > 165 && chicken.y < 250){
     chicken.x = 200;
     chicken.y = 380;
     lives -=1;
     splashSound.play();
  }
    
  if(lives === 10){
      textSize(10);
      fill("yellow");
     text("Use arrow keys to move the chicken, and help it cross the road.", 60, 340);
    text("Avoid the cars and the water along the way.", 100, 350);
    
   }
    
 
  
  RCars();
  GCars();
  YCars();
  
  if(lives === 0){
    textSize(30);
    fill("red");
    text("Game Over", 140, 220);
    gameState = END;
  }
    
  if(chicken.y < 40){
    textSize(35);
    fill("orange");
    text("You Won!",140, 220);
    winSound.play();
    gameState = END;
  }
  
  
  }
  
  else if(gameState === END) {
    carsGroup.setVelocityXEach(0);
    //carsGroup.destroyEach(1);
    chicken.velocityX = 0;
    chicken.velocityY = 0;
  
  if(lives === 0){
    textSize(30);
    textStyle(BOLD);
    fill("red");
    text("Game Over", 20, 230);
    
    textSize(15);
    text("Press 'R' to try again", 30, 190);
    
  }
    
  if(chicken.y < 40){
    textSize(35);
    
    fill("orange");
    text("You Won!",30, 230);
    textSize(15);
    text("Press 'R' to play again", 30, 190);
  }
  }

  textSize(25);
  fill("yellow");
  text("Lives: "+ lives, 20, 50);
  text("HOME", 210, 50);
  
  if (keyDown("r") && gameState === END) {
    gameState = PLAY;
    lives = 10;
    
    chicken.x = 200;
    chicken.y = 380;
    carsGroup.destroyEach(1);
  }
  
}

function RCars(){
  if(World.frameCount% 90 === 0){
    car = createSprite(-50, 310, 80, 40);
    //car.shapeColor = "red";
    car.addImage(car1Image);
    car.scale = 0.3;
    car.velocityX = random(5, 10);
    carsGroup.add(car);
  
  }
}

function GCars(){
  if(World.frameCount% 120 === 0){
    car1 = createSprite(430, 270, 80, 40);
    //car.shapeColor = "red";
    car1.addImage(car2Image);
    car1.scale = 0.2;
    car1.velocityX = random(-5, -10);
    carsGroup.add(car1);
    
    
    car3 = createSprite(430, 140, 80, 40);
    //car3.shapeColor = "red";
    car3.addImage(car2Image);
    car3.scale = 0.2;
    car3.velocityX = random(-5, -7);
    carsGroup.add(car3);
  }
}

function YCars(){
  if(World.frameCount% 150 === 0){
    car2 = createSprite(-30, 100, 80, 40);
    car2.addImage(car3Image);
    car2.scale = 0.3;
    car2.velocityX = random(8, 10);
    carsGroup.add(car2);
  }
}