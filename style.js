let textArea=document.getElementById("text");

let delIcon=document.querySelector(".icon2");
let voiceSelect=document.getElementById("voice-lang");
let speedSlider=document.getElementById("speed");
let pitchSlider=document.getElementById("pitch");
let volumeSlider=document.getElementById("volume");
let playButton=document.querySelector("button");

let voices=[];//store available voice
function loadvoice(){
    voices=speechSynthesis.getVoices();//get all voice available on browser
    voiceSelect.innerHTML="";
    voices.forEach((voice)=>{
        const option=document.createElement("option");//make option
        option.value=voice.name;//store name
        option.textContent=`${voice.name} (${voice.lang})`;//show name+lang
        voiceSelect.appendChild(option);// add to dropdown
    })
}
loadvoice();
speechSynthesis.onvoiceschanged = loadvoice;
playButton.addEventListener("click",()=>{
    if(!textArea.value) return; //if there is no text 
    const utterance=new SpeechSynthesisUtterance(textArea.value); //what to speak


//select voice from dropdown
let selectedvoice= voices.find(voice=>voice.name===voiceSelect.value);
if(selectedvoice){
    utterance.voice=selectedvoice;
}
//set pitch,rate,voulume
utterance.rate=parseFloat(speedSlider.value);//the value you get from any slider aways its a string 
utterance.pitch=parseFloat(pitchSlider.value);//but utterance always expects number
utterance.volume=parseFloat(volumeSlider.value);//using parsefloat we get exact value that's why we used it
speechSynthesis.speak(utterance);
});
delIcon.addEventListener("click",()=>{
    textArea.value="";
    speechSynthesis.cancel();//if you user clicked trash then stop ongoing speech;
});