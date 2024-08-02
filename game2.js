// setting game name
let gamename = "Guess The Password";
document.titel = gamename ;
document.querySelector("h1").innerHTML = gamename;
document.querySelector("footer").innerHTML = `${gamename} game created by AHF`

// setting game opions
let numbersOfTries = 5;
let numbersOfLetters = 4;
let currentTry = 1;

// manage words
let wordToGuess = "";
const words =["MC31"];
wordToGuess = words[Math.floor(Math.random() * words.length)].toLowerCase();
// console.log(wordToGuess);
let messageArea = document.querySelector(".message");


function generateInput(){
    const inputsContainer = document.querySelector(".inputs");

    // create main try div 

    for (let i = 1; i <= numbersOfTries; i++) {
        const tryDiv = document.createElement("div");
        tryDiv.classList.add(`try-${i}`);
        tryDiv.innerHTML = `<span>Try ${i}</span>`;

        
        // if(i !== 1) tryDiv.classList.add("disabled-inputs");

        // create inputs
        for (let j = 1; j <= numbersOfLetters; j++){
            const input = document.createElement("input");
            input.type = "text";
            input.id = `guess-${i}-letter-${j}`;
            input.setAttribute("maxlength", "1");
            tryDiv.appendChild(input);
        }

        inputsContainer.appendChild(tryDiv);
    }
    inputsContainer.children[0].children[1].focus();

//    disabled all inputs except first one 
    const inputsInDisabledDiv = document.querySelectorAll(".disabled-inputs input");
    inputsInDisabledDiv.forEach((input) => (input.disabled = true));
    const inputs = document.querySelectorAll("input");
    inputs.forEach((input , index) =>{
        // input to uppercase
        input.addEventListener("input", function(){
            this.value = this.value.toUpperCase();
            const nextInput = inputs[index +1];
            if (nextInput) nextInput.focus();
        });

        input.addEventListener("keydown", function(event){
            // console.log(event);
            const currentIndex = Array.from(inputs).indexOf(event.target);
            if(event.key === "ArrowRight"){
                const nextInput = currentIndex +1;
                if (nextInput < inputs.length) inputs[nextInput].focus();
            }
            if(event.key === "ArrowLeft"){
                const lastInput = currentIndex -1;
                if (lastInput >=0)  inputs[lastInput].focus();
            }
        });
    })
    
}

const guessButton = document.querySelector(".check");
guessButton.addEventListener("click", handelGuesses);

function handelGuesses(){
    let successGuess = true;
    for(let i = 1; i <= numbersOfLetters; i++){
        const inputField = document.querySelector(`#guess-${currentTry}-letter-${i}`);
        const letter = inputField.value.toLowerCase();
        const actualLetter = wordToGuess[i-1];

        // game logic 
        if(letter === actualLetter){
            inputField.classList.add("yes-in-place");
        }else if(wordToGuess.includes(letter) && letter !==""){
            inputField.classList.add("not-in-place");
            successGuess = false;
        }else{
            inputField.classList.add("no");
            successGuess = false;
        }
        console.log("successGuess: ", successGuess);
        console.log("currentTry: ", currentTry);
    }

    // check if user win or lose
    if(successGuess){
        console.log("enter if condition");
        messageArea.innerHTML = `You Win The Word Is <span>${wordToGuess}</span>`;
        let allTries = document.querySelectorAll(".inputs > div");
        allTries.forEach((tryDiv) => tryDiv.classList.add("disabled-inputs"));
        guessButton.disabled = true;
    }else{
        console.log("enter else condition");
        console.log("currentTry else: ", currentTry);

        document.querySelector(`.try-${currentTry}`).classList.add("disabled-input");
        const currentTryInputs = document.querySelectorAll(`try-${currentTry} input`);
        currentTryInputs.forEach((input) => (input.disabled = true));

        currentTry++;
        console.log("currentTryInputs: ", currentTryInputs);

        document.querySelector(`.try-${currentTry}`).classList.remove("disabled-input");
        const nextTryInputs = document.querySelectorAll(`try-${currentTry} input`);
        nextTryInputs.forEach((input) => (input.disabled = false));
    }
}


window.onload = function(){
    generateInput();
};