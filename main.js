song1="";
song2="";
rightWristX=0;
rightWristY=0;
leftWristX=0;
leftWristY=0;
song1_status="";
song2_status="";
scoreLeftWrist=0;
scoreRightWrist=0;

function preload(){
    song1=loadSound("music.mp3");
    song2=loadSound("music2.mp3")
}
function setup(){
    canvas=createCanvas(600,500);
    canvas.center();

    video=createCapture(VIDEO);
    video.hide();
    poseNet=ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses)
}
function modelLoaded(){
    console.log('PoseNet Is Intialized');
}
function gotPoses(results){
    if(results.length>0){
        scoreLeftWrist=results[0].pose.keypoints[9].score;
        scoreRightWrist=results[0].pose.keypoints[10].score;
        rightWristX=results[0].pose.rightWrist.x;
        rightWristY=results[0].pose.rightWrist.y;
        leftWristX=results[0].pose.leftWrist.x;
        leftWristY=results[0].pose.leftWrist.y;
    }
}
function draw(){
    image(video,0,0,600,500);
    song1_status=song1.isPlaying();
    song2_status=song2.isPlaying();
    fill("#ff0000");
    stroke("#ff0000");
    
    if(scoreRightWrist>0.2){
        circle(rightWristX,rightWristY,20);
        song2.stop();
        if(song1_status==false){
            song1.play();
            document.getElementById("song").innerHTML="Playing - Harry Potter Theme Song";
        }
        
        }
        if(scoreLeftWrist>0.2){
            circle(leftWristX,leftWristY,20);
            song1.stop();
        if(song2_status==false){
            song2.play();
            document.getElementById("song").innerHTML="Playing - Peter Pan Theme Song";
        }
    }
}
function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}