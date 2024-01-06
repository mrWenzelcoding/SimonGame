//Step1: Create cos and sin of a angle
//Step2: Map cos and sin to the canvas
//Step3: Check if mouse overlaps circles or center
//Step4: Create Board
//Step5: Create an array with random values between 1 and 4
//Step6: In mousePressed, have the program check which quadrant is clicked
//Step 7: Have the quadrants light up and change when clicked. Have gameover with a score if lose
//Additional Features: Slowly increase speed of circles as turns move on. Have a high score. Have the score decrease with time

let aX
let aY
let order=[]
let turn;
let active;
let clicked;
let t;
let highScore=0
let allTime;
let gameOver=false

function setup() {
  //Setting up
  createCanvas(600, 600);
  noStroke()
  angleMode(DEGREES)
  rectMode(CENTER)
  
  //Setting initial value. Order will randomly determine light order
  aX=0;
  aY=0;
  t=0
  clicked = 0;
  turn = 0;
  active = 0;
  for(let i =0; i<10000;i++){
    order[i] = int(random(1,5))
  }
}

function draw() {
  background(255);
  t++
  
  //board and lights
  if(order[turn] == 1){
    fill("lightGreen")
  } else{
  fill("darkGreen")
  }
  rect(width/4,height/4,300)
  if(order[turn] == 2){
    fill("rgb(255,140,140)")
  } else{
  fill("darkRed")
  }
  rect(width*3/4,height/4,300)
  if(order[turn] == 3){
    fill("rgb(255,255,159)")
  } else{
  fill("gold")
  }
  rect(width/4,height*3/4,300)
  if(order[turn] == 4){
    fill("lightBlue")
  } else{
  fill("darkBlue")
  }
  rect(width*3/4,height*3/4,300)
  
  //tracks
  fill("black")
  rect(width/2,height/2,width,50)
  fill("white")
  rect(width/2,height/2,50,height)
  fill(126)
  rect(width/2,height/2,50)
  
  //circles motion
  x = cos(aX)
  x = map(x,-1,1,0,width)
  y = sin(aY)
  y = map(y,-1,1,0,height)
  aX+=1+turn*0.01
  aY+=1+turn*0.015
  
  //drawing circles
  fill(255)
  circle(x,height/2,50)
  fill(0)
  circle(width/2,y,50)
  
  //checking for overlap
  if(dist(mouseX,mouseY,x,width/2)<25){
    gameOver = true
  }
  if(dist(mouseX,mouseY,height/2,y)<25){
    gameOver = true
  }
  
  //gameover screen
  if(gameOver==true){
    background(0)
    textSize(20)
    textAlign(CENTER)
    fill(255)
    let score = turn*2-t/60
    
    if(score>highScore){
      highScore = round(score);
    }
    allTime = getItem("allTime")
      if (allTime === null) {
     allTime = 0;
   }
    if(highScore > allTime){
      allTime = highScore
      storeItem("allTime",allTime)
    }
    text("Score: " + round(score),width/2,height/2)
    text("Press 'r' to reset",width/2,height/2+30)
    text("Your High Score: " + highScore, width/2,40)
    text("All Time High Score: " + allTime, width/2,height-40)
    noLoop()
  }
}

function mousePressed(){
  //checking which quadrant is clicked
  if(mouseX<width/2-25 && mouseY < height/2-25){
    clicked = 1
  } else if(mouseX>width/2+25 && mouseY < height/2-25){
    clicked = 2
  } else if(mouseX<width/2-25 && mouseY > height/2+25){
    clicked = 3
  } else if(mouseX>width/2+25 && mouseY > height/2+25){
    clicked = 4
  } else{
    clicked = 0
  }
  //Checking if clicked quadrant is the lit quadrant
  if(order[turn]==clicked){
    turn++
  } else{
    //resetting game and calculating score
    gameOver=true
  }
}

//restarting game
function keyPressed(){
  if(key == "r"){
    setup()
    gameOver=false
    loop()
  }
}