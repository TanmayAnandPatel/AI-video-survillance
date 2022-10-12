video= "";
objects= [];
status= "";

function preload() {
    video= createVideo('video.mp4');
    video.hide();
}

function setup() {
    canvas= createCanvas(480,380);
    canvas.center();
}

function draw() {
    image(video,0,0,480,380);
    if(status!=""){
        object_detector.detect(video,gotposes);
        for(i=0;i<objects.length;i++){
            document.getElementById("status").innerHTML="status: Object detected";
            document.getElementById("number_object").innerHTML="Number of object detected are:"+objects.length;
            fill("#ff0000");
            persent= floor(objects[i].confidence*100);
            text(objects[i].label+" "+persent+"%",objects[i].x+15,objects[i].y+15);
            noFill();
            stroke("grey");
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
        }
    }
}

function start() {
    object_detector= ml5.objectDetector('cocossd',Modelloaded);
    document.getElementById("status").innerHTML= "Status: Detecting objects";
}

function Modelloaded() {
    console.log("Model is loaded");
    status= true;
    video.loop();
    video.speed(1);
    video.volume(0.5);
}

function gotposes(error,results) {
    if(error){
        console.error(error);
    }
    console.log(results);
    objects= results;
}