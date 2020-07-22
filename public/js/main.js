const msgEL = document.querySelector("#msg");
const randomNumber = getRandomNumber();
console.log(randomNumber);

// for firefox  browser
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition = new window.SpeechRecognition();
recognition.start();

function getRandomNumber() {
    return Math.floor(Math.random() * 100 + 1);
}

function writeMsg(msg) {

    if (Number.isNaN(+msg)) {
        msgEL.innerHTML = `<div>That is Not valid Number </div>`;
    } else {
        const num = +msg;
        console.log(typeof (num));

        if (num <= 100 && num >= 1) {
            msgEL.innerHTML = `
                <div> You Said : </div>
                <span class="box">${msg}</span> 
                `;
            //  check number 
            if (num === randomNumber) {
                document.body.innerHTML = `
                       <h2>Congrats! you have guess the number
                       <br><br>
                       It was ${num}
                       </h2>
                       <button class="play-again" id="play-again">Play Again</button>
                `;
            } else if (num > randomNumber) {
                msgEL.innerHTML = `
                <div> You Said : </div>
                <span class="box">${msg}</span> 
                <div>GO LOWER</div>`;
            } else if (num < randomNumber) {
                msgEL.innerHTML = `
                
                <div> You Said : </div>
                <span class="box">${msg}</span> 
                <div>GO HEIGHER </div>`;

            }


        } else {
            msgEL.innerHTML = `<div>Number must be between 1 and 100 </div>`;

        }
    }

}



recognition.addEventListener("result", (e) => {
    // console.log(e);
    const msg = e.results[0][0].transcript;
    console.log(msg);

    writeMsg(msg);
    // checkNumber(msg);
})

// for reloading recognitaion

recognition.addEventListener("end", (e) => {
    recognition.start();
})
document.body.addEventListener("click", (e) => {
    if (e.target.id === "play-again") {
        recognition.stop();
        window.location.reload();
    }
})