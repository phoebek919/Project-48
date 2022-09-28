var database;
var allPlayers;
var gameState = 0;
var playerCount = 0;

var backgroundImage;

var doggie1_img;
var doggie2_img;
var chocolateImage,chocolateGroup,chocolate;

var fruitImage;
var fruits;
var fruit1_img, fruit2_img;
var fruitGroup;

var score = 0;
var doggie1score = 0;
var doggie2score = 0;

var doggie1;
var doggie2;
var doggies; 

var form, player, game;



function preload() {
  backgroundImage = loadImage("assets/background.png");
  doggie1_img = loadImage("assets/doggie1.png");
  doggie2_img = loadImage("assets/doggie2.png");
  chocolateImage = loadImage("assets/chocolate.png");
  fruit1_img = loadImage("assets/watermelon.png");
  fruit2_img = loadImage("assets/orange.png");
  fruitGroup = new Group();
}

function setup() {
 createCanvas(1000, 600);
  database = firebase.database(); //is this really needed

  game = new Game();
  game.getState();
  game.start();
}

function draw() {
  background(backgroundImage);

  if(playerCount===2){
    game.update(1);
  }
  if(gameState===1){
    clear();
    game.play();
  }
  if(gameState===2){
    game.end();
  }
}

//function windowResized() {
 // resizeCanvas(windowWidth-5, windowHeight-1);
//}
