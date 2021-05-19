var output = document.getElementById('check');
var prompt = document.getElementById('prompt')
const artyom = new Artyom();
const form = document.getElementById("form")

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
        indexes:["submit"],
        action:function(){
            prompt.innerText = "Redirecting..."
            //Write data to firebase here
            form.submit()
            setTimeout(()=>{
                res.redirect("/")
            },1000)
        }
    }
]);
artyom.say("Hello World!")

var nameField = document.getElementById("name")
var ageField = document.getElementById("age")
var phoneField = document.getElementById("phone")
var typeField = document.getElementById("type")


artyom.redirectRecognizedTextOutput(function(recognized,isFinal){
    if(isFinal){
        output.innerText = "Final recognized text: " + recognized;
        recognized = recognized.trimStart();
        if(recognized.split(" ")[0]=="name"){
            nameField.value = recognized.substring(recognized.indexOf(" ")+1)
        }else if(recognized.split(" ")[0]=="age"){
            ageField.value = recognized.split(" ")[1]
        }else if(recognized.split(" ")[0]=="phone"){
            phoneField.value = recognized.substring(recognized.indexOf(" ")+1).replace(/ +/g, "");
        }else if(recognized.split(" ")[0]=="type"){
            typeField.value = recognized.split(" ")[1]
        }
    }else{
        output.innerText = `You said ${recognized}`
    }
});