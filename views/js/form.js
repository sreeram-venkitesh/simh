var output = document.getElementById('check');
var prompt = document.getElementById('prompt')
const artyom = new Artyom();

const form = document.getElementById("form")

var nameField = document.getElementById("name")
var ageField = document.getElementById("age")
var phoneField = document.getElementById("phone")
var typeField = document.getElementById("type")


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
            prompt.innerText = "Submitting information..."
            //Write data to firebase here

            const firebaseConfig = 
            { 
                apiKey: "AIzaSyDFaQDbmtrf-h1iawaZ4ZpIooZA-RBBqPU", 
                authDomain: "simh-batch10.firebaseapp.com", 
                databaseURL: "https://simh-batch10-default-rtdb.asia-southeast1.firebasedatabase.app", 
                projectId: "simh-batch10", 
                storageBucket: "simh-batch10.appspot.com", 
                messagingSenderId: "342199879516", 
                appId: "1:342199879516:web:dad545fb416ec9aa366399", 
                measurementId: "G-ZFXD927VQV" 
            }; 
            // Initialize Firebase 
            firebase.initializeApp(firebaseConfig); 
            //---------------------------------------------------------------CONFIG 
            
            
            //---------------------------------------------------------------INSERT 
            
            var d = new Date()
            firebase.database()
                .ref(`${d.getDate()}-${d.getMonth()+1}-${d.getFullYear()}/${nameField.value}`)
                .set({ 
                    name:nameField.value, 
                    age:ageField.value, 
                    phone:phoneField.value, 
                    type:typeField.value, 
                }); 
                
            //---------------------------------------------------------------INSERT 
            
            setTimeout(()=>{
                form.submit()
            },1000)
        }
    }
]);
artyom.say("Hello World!")



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