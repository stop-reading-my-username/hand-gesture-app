Webcam.set({
    width:350,
    height:300,
    image_format : 'png',
    png_quality:90
});

camera = document.getElementById("camera");
Webcam.attach("#camera");

function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = "<img id='captured_image'src='"+data_uri+"'/>";
        
    })
}
classifier= ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/5E4b8vEk7/model.json", modelLoaded);

function modelLoaded(){
    console.log('model Loaded!');
}
function check(){
    img= document.getElementById("captured_image");
    classifier.classify(img, gotresult);
}
function gotresult(error, results){
    if (error){
        console.error(error);
    }
    else{
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML = results[0].label;
        gesture= results[0].label;
        toSpeak ="";
        if (gesture=="ok"){
            toSpeak = "This is looking amazing";
            document.getElementById("update_emoji").innerHTML= "&#128076;";
        }
        else if(gesture=="thumbs up"){
            toSpeak="All the best";
            document.getElementById("update_emoji").innerHTML= "&#128077;";
        }
        else if (gesture=="peace"){
            toSpeak="That was the marvelous victory";
            document.getElementById("update_emoji").innerHTML= "&#9996;";
        }
        speak();
    }
}
function speak(){
    var synth= window.speechSynthesis;
    speak_data = toSpeak;
    var utterThis = new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterThis)
}