var pikachu,buildingGroup,monsterGroup;
var pikachuFront,pikachuJump,pikachuLeft,pikachuRight;
var building1,building2,building3;
var monster1,monster2,monster3;
var backgroundImage;
var invisibleGround,ground;

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
}

function setup() {
  createCanvas(1200,400);

  invisibleGround = createSprite(110000,400,220000,10);
  ground = createSprite(110000,390,220000,10);

  pikachu = createSprite(300,370,10,10);
  pikachu.scale=0.3;
  pikachu.addImage("Front",pikachuFront);
  pikachu.addImage("Right",pikachuRight);
  pikachu.addImage("Left",pikachuLeft);
  pikachu.addImage("Jump",pikachuJump);

  buildingGroup = new Group();
  monsterGroup = new Group();

  for(var a=200; a<=210000; a+=300){
    var rand = Math.round(random(1,3));
    var scaleNo =random(0.5,0.8);
    var building = createSprite(a,350,10,10);
    switch(rand){
      case 1:
        building.addImage("First",building1);
        break;
      case 2:
        building.addImage("Second",building2);
        break;
      case 3:
        building.addImage("Third",building3);   
    }
    building.y=height-building.height/2+50;
    building.scale=scaleNo;
    buildingGroup.add(building);
  }

  for(var b=300; b<=209993; b+=600){
    var rand=Math.round(random(1,3));
    var monster = createSprite(b,375,10,10);
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
    monster.scale=0.3;
    monsterGroup.add(monster);
  }
}

function draw() {
  background(backgroundImage);
  if(keyDown("right")){
    camera.position.x+=10;
    pikachu.changeImage("Right");
    pikachu.scale=0.2;
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
  }

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

  monsterGroup.velocityY+=3;
  buildingGroup.velocityY+=3;
  pikachu.velocityY+=1.5;

  pikachu.x=camera.position.x-560;
  pikachu.collide(invisibleGround);
  buildingGroup.collide(invisibleGround);
  monsterGroup.collide(invisibleGround);
  
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