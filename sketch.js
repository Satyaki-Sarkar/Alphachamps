var pikachu,buildingGroup,monsterGroup;
var pikachuFront,pikachuJump,pikachuLeft,pikachuRight;
var building1,building2,building3;
var monster1,monster2,monster3;
var backgroundImage;
var invisibleGround,ground;

var database,allWords,wordObj,gameObj, letterObj;
var camVariable;

var buildingObj1, buildingObj2, buildingObj3, buildingObj4, buildingObj5;
var monsterObj1, monsterObj2, monsterObj3, monsterObj4, monsterObj5;
var alphabetObj1, alphabetObj2, alphabetObj3, alphabetObj4, alphabetObj5;

var allLetters = "abcdefghijklmnopqrstuvwxyz";
var allLettersArray = allLetters.split("");
var loadedAlphabetImages = [];
var lettersGroup;

var gameState = 0;

function preload(){
  pikachuFront=loadImage("Images/Pikachu/pikachuFront.png");
  pikachuJump=loadImage("Images/Pikachu/pikachuJump.png");
  pikachuLeft=loadImage("Images/Pikachu/pikachuLeft.png");
  pikachuRight=loadImage("Images/Pikachu/pikachuRight.png");
  building1=loadImage("Images/Buildings/Building1.png");
  building2=loadImage("Images/Buildings/Building2.png");
  building3=loadImage("Images/Buildings/Building3.png");
  monster1=loadImage("Images/Monsters/Monster1.png");
  monster2=loadImage("Images/Monsters/Monster2.png");
  monster3=loadImage("Images/Monsters/Monster3.png");
  backgroundImage = loadImage("Images/background.jpg");

  for(var i in allLettersArray) {
    loadedAlphabetImages.push(loadImage("Images/Alphabets/" + allLettersArray[i] + ".png"));
  }
}

function setup() {
  createCanvas(1200,400);

  database=firebase.database();

  camVariable=camera.position.x;

  gameObj = new Game();
  gameObj.start();

  wordObj = new Word();

  invisibleGround = createSprite(110000,400,220000,10);
  ground = createSprite(110000,390,220000,10);

  pikachu = createSprite(300,370,10,10);
  pikachu.scale=0.3;
  pikachu.debug=true;
  pikachu.addAnimation("Front",pikachuFront);
  pikachu.addAnimation("Right",pikachuRight);
  pikachu.addAnimation("Left",pikachuLeft);
  pikachu.addAnimation("Jump",pikachuJump);

  buildingGroup = new Group();
  monsterGroup = new Group();
  lettersGroup = new Group();

  console.log(pikachu.getAnimationLabel());

  // for(var a=200; a<=210000; a+=300){
  //   var rand = Math.round(random(1,3));
  //   var scaleNo =random(0.5,0.8);
  //   var building = createSprite(a,350,10,10);
  //   switch(rand){
  //     case 1:
  //       building.addImage("First",building1);
  //       break;
  //     case 2:
  //       building.addImage("Second",building2);
  //       break;
  //     case 3:
  //       building.addImage("Third",building3); 
  //       break;  
  //   }
  //   building.y=height-building.height/2+50;
  //   building.debug=true;
  //   building.scale=scaleNo;
  //   buildingGroup.add(building);
  // }

  // for(var b=300; b<=209993; b+=600){
  //   var rand=Math.round(random(1,3));
  //   var monster = createSprite(b,375,10,10);
  //   switch(rand){
  //     case 1:
  //       monster.addImage("First",monster1);
  //       break;
  //     case 2:
  //       monster.addImage("Second",monster2);
  //       break;
  //     case 3:
  //       monster.addImage("Third",monster3);
  //   }
  //   monster.scale=0.3;
  //   monster.debug=true;
  //   monsterGroup.add(monster);
  // }

  buildingObj1 = createSprite(300,375,10,10);
  buildingObj1.addImage("building1",building1);
  buildingObj2 = createSprite(900,375,10,10);
  buildingObj2.addImage("building2",building2);
  buildingObj3 = createSprite(1500,375,10,10);
  buildingObj3.addImage("building3",building3);
  buildingObj4 = createSprite(2100,375,10,10);
  buildingObj4.addImage("building4",building1);
  buildingObj5 = createSprite(2700,375,10,10);
  buildingObj5.addImage("building5",building2);
  buildingGroup.add(buildingObj1);
  buildingGroup.add(buildingObj2);
  buildingGroup.add(buildingObj3);
  buildingGroup.add(buildingObj4);
  buildingGroup.add(buildingObj5);
}

function draw() {
  background(backgroundImage);

  if(gameState === 1) {
    wordObj.display();
    wordObj.generateLetters();

    if(pikachu.isTouching(lettersGroup)) {
      letterObj.checkChosenLetter();
    }
  }
  console.log(camera.position.x,camVariable+300);
  // if(camera.position.x===camVariable+300){
  //   console.log(camera.position.x);
  //   var building=createSprite(camera.position.x,350,10,10);
  //   var rand = Math.round(random(1,3));
  //   switch(rand){
  //     case 1:
  //       building.addImage("First",building1);
  //       break;
  //     case 2:
  //       building.addImage("Second",building2);
  //       break;
  //     case 3:
  //       building.addImage("Third",building3); 
  //       break;  
  //   }
  //   buildingGroup.add(building);
  // }
  movement();
  reset();

  for(var i=0;i<buildingGroup.length;i++){
    var building = buildingGroup.get(i);
    pikachu.collide(building);
  }
  for(var i=0;i<monsterGroup.length;i++){
    var monster = monsterGroup.get(i);
    if(pikachu.isTouching(monster)){
      console.log("Game Ended");
    }
  }

  monsterGroup.setVelocityYEach(3);
  // buildingGroup.setVelocityYEach(3);
  pikachu.velocityY+=0.5;

  pikachu.x=camera.position.x-560;
  pikachu.collide(invisibleGround);
  buildingGroup.collide(invisibleGround);
  monsterGroup.collide(invisibleGround);

  // wordObj.display();
  
  drawSprites();
}

function createBuildings(){
  if(frameCount%60===0){
    var building=createSprite(camera.position.x+200,200,10,10);
    var monsterRand = Math.round(random(1,2));
    var n = Math.round(random(1,3));
    switch(n){
      case 1:
        building.addImage("First",building1);
        break;
      case 2:
        building.addImage("Second",building2);
        break;
      case 3:
        building.addImage("Third",building3);
        break;  
    }
    buildingGroup.add(building);

    if(monsterRand===1){
      createMonsters(building.x+20);
    }
  }
}

function createMonsters(posX){
  var monster = createSprite(posX,370,10,10);
  var rand = Math.round(random(1,3));
  switch(rand){
    case 1:
      monster.addImage("First",monster1);
      break;
    case 2:
      monster.addImage("Second",monster2);
      break;
    case 3:
      monster.addImage("Third",monster3);
  }
  monsterGroup.add(monster);
}

function movement(){
  if(keyDown("right")){
    pikachu.changeImage("Right");
    pikachu.scale=0.2;
    buildingObj1.velocityX=-10;
    buildingObj2.velocityX=-10;
    buildingObj3.velocityX=-10;
    buildingObj4.velocityX=-10;
    buildingObj5.velocityX=-10;
  }
  if(keyDown("left")){
    pikachu.changeImage("Left");
    pikachu.scale=0.2;
  }
  if(keyDown("up")){
    pikachu.changeImage("Jump");
    if(pikachu.isTouching(ground)){
      pikachu.velocityY=-30;
    }
  }
  if(keyWentUp("right") || keyWentUp("left")){
    pikachu.changeImage("Front");
    pikachu.scale=0.3;
    buildingObj1.velocityX=0;
    buildingObj2.velocityX=0;
    buildingObj3.velocityX=0;
    buildingObj4.velocityX=0;
    buildingObj5.velocityX=0;
  }
}

function reset(){
  if(buildingObj1.x<-900){
    buildingObj1.x=2100;
  }
  if(buildingObj2.x<-900){
    buildingObj2.x=2100;
  }
  if(buildingObj3.x<-900){
    buildingObj3.x=2100;
  }
  if(buildingObj4.x<-900){
    buildingObj4.x=2100;
  }
  if(buildingObj5.x<-900){
    buildingObj5.x=2100;
  }
}