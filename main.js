song="";
Status="";
object=[];

function setup ()
{
    canvas=createCanvas(380,380);
    canvas.center();
    video=createCapture(VIDEO);
    video.size(380,380);
    video.hide();
    

    objectDetector= ml5.objectDetector("cocossd",modelloaded);
    document.getElementById("status").innerHTML="Status: Detecting objects";

    

}

function modelloaded ()
{
    console.log("model Loaded !");
    Status=true;
    
}

function gotresults (error,results)
{
    if(error)
    {
        console.error(error)
    }
    else {
console.log(results);
object=results;
}

}

function preload ()
{
    song=loadSound("alert.mp3");
}

function draw ()
{
    image(video,0,0,380,380);
    if(Status !="")
    {
        r=random(255);
        g=random(255);
        b=random(255);
        objectDetector.detect(video,gotresults);
    for(i=0;i<object.length;i++){
        document.getElementById("status").innerHTML="Status: Object detected";
        

        percent=floor(object[i].confidence*100);
        document.getElementById("number_of_object").innerHTML="Number of objects detected are:"+object.length;
        fill(r,g,b);
        text(object[i].label+" " +percent +"%",object[i].x,object[i].y);
        noFill();
        stroke(r,g,b);
        rect(object[i].x,object[i].y,object[i].width,object[i].height);

        if(object[i].label == "person")
        {
            document.getElementById("number_of_object").innerHTML="Baby found";
            console.log("stop");
            song.stop();
        }

        else{

            document.getElementById("number_of_object").innerHTML="Baby not found";
            console.log("play");
            song.play();

        }

        if(object.length == 0)
        {
            document.getElementById("number_of_object").innerHTML="Baby not found";
            console.log("play");
            song.play();
        }

        

    }

    }




  
    
}