var output = document.getElementById('check');
var prompt = document.getElementById('prompt')
console.log("hi there")
const artyom = new Artyom();

function startContinuousArtyom(){
    artyom.fatality();// use this to stop any of

    setTimeout(function(){// if you use artyom.fatality , wait 250 ms to initialize again.
         artyom.initialize({
            lang:"en-GB",// A lot of languages are supported. Read the docs !
            continuous:true,// Artyom will listen forever
            listen:true, // Start recognizing
            debug:true, // Show everything in the console
            speed:1 // talk normally
        }).then(function(){
            console.log("Ready to work !");
        });
    },250);
}
startContinuousArtyom()

artyom.addCommands([
    {
        indexes:["start"],
        action:function(){
            prompt.innerText = "Redirecting..."
            setTimeout(()=>{
                window.location = '/temperature';
            },1000)
        }
    }
]);
artyom.say("Hello World!")

artyom.redirectRecognizedTextOutput(function(recognized,isFinal){
    if(isFinal){
        output.innerText = "Final recognized text: " + recognized;
    }else{
        output.innerText = `You said ${recognized}`
    }
});