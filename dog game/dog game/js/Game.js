class Game {
  constructor() {

  }

  getState() {
    var gameStateRef = database.ref('gameState');
    gameStateRef.on("value", function(data) {
      gameState = data.val();
    })
  }
  update(state) {
    database.ref('/').update({
      gameState: state
    });
  }
//should i add async??
  async start() {
    if(gameState===0){
    player = new Player();
    
    var playerCountRef = await database.ref('playerCount').once("value"); 
    if (playerCountRef.exists()) { 
        playerCount = playerCountRef.val(); 
        player.getCount();
    }
    
    form = new Form();
    form.display();
    }
    doggie1 = createSprite(200, 500);
    doggie1.addImage("doggie1", doggie1_img);
    doggie1.scale = 0.04;

    doggie2 = createSprite(800, 500);
    doggie2.addImage("doggie2", doggie2_img);
    doggie2.scale = 0.04;

    doggies = [doggie1, doggie2];

    chocolateGroup = new Group();
}

play() {
  form.hide();

  Player.getPlayerInfo();
  player.getPlayerAtEnd();

  image(backgroundImage,0,0,1000,800);

  var x = 100;
  var y = 200;

  var index = 0;
  drawSprites();

  for(var plr in allPlayers){
index=index+=1;
x=500-allPlayers[plr].distance;
y=500;

doggies[index-1].x=x;
doggies[index-1].y=y;

if(index=player.index){
  textSize(25);
  fill("black");
  text(allPlayers[plr].name,x-25,y+25);
}
textSize(25);
fill("black");
text("Player 1:"+allPlayers.doggie1.score,50,50);
text("Player 2:"+allPlayers.doggie2.score,50,100);
  }

  if(player.score >= 8){
    gameState = 2;
    player.rank+=1;
    Player.updatePlayerAtEnd(player.rank);
    player.update();
    this.showRank();
  }

  if (keyIsDown(RIGHT_ARROW) && player.index !== null) {
    player.distance -= 10
    player.update();
}
if (keyIsDown(LEFT_ARROW) && player.index !== null) {
    player.distance += 10
    player.update();
}
if(frameCount%20===0){
  fruits = createSprite(random(100,1000),0,100,100);
  fruits.velocityY = 6;
  var rand=Math.round(random(1,2));
  switch(rand){
    case 1: fruits.addImage("fruit1",fruit1_img);
    break;
    case 2: fruits.addImage("fruit2",fruit2_img);
    break;
  }
  fruitGroup.add(fruits);
}

if(frameCount%15===0){
  this.addChocolate();
}

if(player.index != null){
  for(var i=0; i<fruitGroup.length; i++){
if(fruitGroup.get(i).isTouching(doggies)){
  fruitGroup.get(i).destroy();
  player.score = player.score+=1;
  player.update();
}
  }
  if(chocolateGroup.isTouching(doggies)){
    gameState = 2;
  }
}



}

showRank(){
  alert("Great Job! Your rank is:"+player.rank);
}

gameOver(){
  textSize(40);
  fill("black");
  text("Game Over!",500,50);
}

end(){
  console.log("Game Ended");
  console.log(player.rank)
  this.gameOver();
}

addChocolate(){
var x,y;
var x = random(0,width-100);
var y = 0;

var chocolate = createSprite(x,y);
chocolate.velocityY = 4;
chocolate.addImage("chocolate",chocolateImage);
chocolate.scale = 0.15;
chocolateGroup.add(chocolate);

}
}
