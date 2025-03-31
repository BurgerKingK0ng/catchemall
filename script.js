var documentGame = document.querySelector("#game");
var documentBtn = document.querySelector("#btn");
var docScore = document.querySelector("#score");
var docDiff = document.getElementById("diff");


let i = 0;
let difficulty = 1;

var screenHaut =  documentGame.offsetHeight;
var screenLarg = documentGame.offsetWidth;

var centre = documentGame.offsetHeight/2;
var diveScreenLarg = documentGame.offsetWidth/2;

function randomM(max) {
    return Math.floor(Math.random() * max);
}

function waitms(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function StartSim() {

    var fruit = Math.random();
    let temp;

    if (fruit >= 0.6) {
        temp = 3;
    };
    if (fruit < 0.6 && fruit >= 0.3) {
        temp = 2;
    };
    if (fruit < 0.3) {
        temp = 1;
    };

    fruit = temp;

    documentBtn.innerHTML = "<img class='game' id='fruit-item' src='img/fruit/" + fruit + ".png' alt='Fruit " + fruit + "' />";
}

async function changePos(pepero1, pepero2, peperoni, time) {
    await waitms(time);
    
    peperoni.style.removeProperty("top");
    peperoni.style.removeProperty("bottom");
    peperoni.style.removeProperty("left");
    peperoni.style.removeProperty("right");

    let setpp1 = 1;
    while (setpp1 > 0.7) {
        setpp1 = Math.random();
    }

    let pos1 = setpp1 * screenHaut;

    if (pepero1 == 1) {
        peperoni.style.setProperty('top', pos1 + 'px');
    } else {
        peperoni.style.setProperty('bottom', pos1 + 'px');
    };



    let setpp2 = 1;

    while (setpp2 > 0.7) {
        setpp2 = Math.random();
    }

    let pos2 = setpp2 * screenHaut;

    if (pepero2 == 1) {
        peperoni.style.setProperty('left', pos2 + 'px');
    } else {
        peperoni.style.setProperty('right', pos2 + 'px');
    };

    i = i + 1;
}

function CanvasConf() {
    var myConfetti = confetti.create(document.querySelector('#game-canvas'), {
        resize: true,
        useWorker: true
      });
      myConfetti({
        particleCount: 50,
        spread: 360
      }); 
}

docDiff.addEventListener('input', function() {

    var diffTxt = "";

    if (docDiff.value == 1) {
        diffTxt = "Easy";
    };
    if (docDiff.value == 2) {
        diffTxt = "Medium"; 
    };
    if (docDiff.value == 3) {
        diffTxt = "Hard"; 
    };
    if (docDiff.value == 4) {
        diffTxt = "Impossible"; 
    };

    document.getElementById("diffic").textContent = "Difficulty : " + diffTxt;
});

let scoreVal = localStorage.getItem("score");
if (scoreVal) {
    scoreVal = parseInt(scoreVal, 10);  
    localStorage.setItem("score", scoreVal);
    document.getElementById("score").innerHTML = "Score = " + scoreVal;
    console.log("def score = "+ scoreVal);
} else {
    localStorage.setItem("score", 0);
    document.getElementById("score").innerHTML = "Score = 0";
    console.log("score = 0");
}


documentGame.addEventListener('mouseover', function(event) {
    if (event.target && event.target.id === 'fruit-item') {
        var documentItem = document.querySelector("#fruit-item"); 


        var pprand1 = randomM(2);       
        let pepe1 = {0: 1, 1: 2}[pprand1];

        var pprand2 = randomM(2);       
        let pepe2 = {0: 1, 1: 2}[pprand2];
        
        if (i != 0) {
            if (docDiff.value == 1) {
                changePos(pepe1, pepe2, documentItem, 250);
            };
            if (docDiff.value == 2) {
                changePos(pepe1, pepe2, documentItem, 200); 
            };
            if (docDiff.value == 3) {
                changePos(pepe1, pepe2, documentItem, 100); 
            };
            if (docDiff.value == 4) {
                changePos(pepe1, pepe2, documentItem, 0); 
            }; 
        }else{
            changePos(pepe1, pepe2, documentItem, 0);   
        }

        
    }
});

documentGame.addEventListener('click', function(event) {
    if (event.target && event.target.id === 'fruit-item') {
        scoreVal = scoreVal + 1;
        
        document.getElementById("score").innerHTML = "Score = " + scoreVal;
        console.log("def score = "+ scoreVal);
        
        localStorage.setItem("score", scoreVal);

        CanvasConf();
    }
});
