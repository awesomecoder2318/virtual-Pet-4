
var readState, changeState;
var dog,sadDog,happyDog, database;
var foodS,foodStock;
var fedTime,lastFed;
var feed,addFood;
var foodObj;
var bedroom, washroom, garden;

function preload(){
sadDog=loadImage("images/dogImg.png");
happyDog=loadImage("images/dogImg1.png");
bedroom = loadImage("images/bedroom.jpg")
washroom = loadImage("images/washroom.jpg")
garden = loadImage("images/garden.jpg")

}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  readState = database.ref('gameState');
  readState.on('value', function(data){
    gameState = data.val()
  })

 // foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;
  
  feed=createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}

function draw() {
  background(46,139,87);
 // foodObj.display();

 if(foodS == 0){
    dog.addImage(happyDog)
    milkBottle.visible=false
  }else{
    dog.addImage(sadDog)
    milkBottle.visible=true
  }

  if(gameState===1){
    dog.addImage(happyDog)
    dog.scale=0.175
    dog.y=250
  }
  if(gameState===2){
    dog.addImage(sadDog)
    dog.scale=0.175
    milkBottle.visible=false
    dog.y=250
  }
  

  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  });

  var Bath = createButton("i want to take a bath!!!")
  Bath.position(580,125)
  if(Bath.mousePressed(function(){
    gameState=3
    database.ref('/').update({'gameState':gameState })
  }))
  if(gameState===3){
    dog.addImage(washroom)
    dog.scale=1
    milkBottle.visible=false
  }
  var Sleep = createButton("i am very sleepy!!!")
  Sleep.position(710,125)
  if(Sleep.mousePressed(function(){
    gameState=4
    database.ref('/').update({'gameState':gameState })
  }))
  if(gameState===4){
    dog.addImage(bedroom)
    dog.scale=1
    milkBottle.visible=false
  }
  var Play = createButton("Lets Play!!!")
  Play.position(500,160)
  if(Play.mousePressed(function(){
    gameState=5
    database.ref('/').update({'gameState':gameState })
  }))
  if(gameState===5){
    dog.addImage(garden)
    dog.scale=1
    milkBottle.visible=false
  }
  if(gameState=!'Hungry'){
    feed.hide()
    addFood.hide()
    dog.remove()
  }else{
    feed.show()
    addFood.show()
    dog.addImage(sadDog)
  }
  var button=createButton("feed the dog!")
  button.position(400,125)

  if(button.mousePressed(function(){
    foodS=foodS-1
    gameState=1
    database.ref('/').update({"gameState": gameState})
  
  }

  var button1=createButton("add food!")
  button1.position(500,125)

  if(button1.mousePressed(function(){
    foodS=foodS+1
    gameState=2
    database.ref('/').update({"gameState": gameState})
  }))
  

 /* currentTime=hour()
  if(currentTime==(lastFed+1)){
    update("Playing");
    foodObj.garden()
  }else if(currentTime==(lastFed+2)){
update("Sleeping")
foodObj.bedroom()
  }else if(currentTime>(lastFed+2) && currentTime<=(lastFed+4)){
  update("Bathing")
  foodObj.washroom()
  }else{
    update("Hungry")
    foodObj.display*/
  }
  
 
  /*fill(255,255,254);
  textSize(15);
  if(lastFed>=12){
    text("Last Feed : "+ lastFed%12 + " PM", 350,30);
   }else if(lastFed==0){
     text("Last Feed : 12 AM",350,30);
   }else{
     text("Last Feed : "+ lastFed + " AM", 350,30);
   }*/
 
 // drawSprites();
  

//function to read food Stock
function readStock(data){
  foodS=data.val();
}

function writeStock(x){
  database.ref('/').update({
    food:x
  })
}


//function to update food stock and last fed time




//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
function update(state){
  database.ref('/').update({
    gameState:state
  })
}