class Door {
    constructor(selected, prize, revealed) {
        this.selected = selected;
        this.prize = prize;
        this.revealed = revealed;
    }
}

let doorObj = {
    0: new Door(false, "goat", false),
    1: new Door(false, "goat", false),
    2: new Door(false, "goat", false)
};

let choseToStay = 0;
let choseToSwitch = 0;
let stayWon = 0;
let switchWon = 0;
let numWonAttempts = 0;
let totalAttempts = 0;
let playWonStay = 0;
let playWonSwitch = 0;

let initializing = true;

function Select(id) {
    const doors = Array.from(document.querySelectorAll('#doors>li>div'));

    if (initializing) {
        for (let door in doorObj) {
            doorObj[door].selected = false;
            doorObj[door].prize = "goat";
            doorObj[door].revealed = false;
        }

        let ran = Math.floor(Math.random() * 3);
        doorObj[id].selected = true;
        doorObj[ran].prize = "car";
        
        let unselectedGoats = [];
        for (let door in doorObj) {
            if (doorObj[door].selected == false && doorObj[door].prize == "goat") {
                unselectedGoats.push(door);
            }
        }
    
        doorObj[unselectedGoats[Math.floor(Math.random() * unselectedGoats.length)]].revealed = true;
        initializing = false;
    } else {
        if (doorObj[id].revealed == true) {
            // cannot select door already revealed to be a goat
        } else {
            for (let door in doorObj) {
                doorObj[door].revealed = true;
            }
    
            totalAttempts += 1;
    
            if (doorObj[id].selected) {
                choseToStay += 1;
                if (doorObj[id].prize == "car") {
                    stayWon += 1;
                    playWonStay += 1;
                } else {
                    switchWon += 1;
                }
            } else {
                choseToSwitch += 1;
                if (doorObj[id].prize == "car") {
                    switchWon += 1;
                    playWonSwitch += 1;
                } else {
                    stayWon += 1;
                }
            }
    
            if (doorObj[id].prize == "car") {
                numWonAttempts += 1;
            }
    
            document.querySelector('#aa').innerHTML = `${choseToStay} (${Math.trunc((choseToStay/totalAttempts)*100)}%)`;
            document.querySelector('#ab').innerHTML = `${choseToSwitch} (${Math.trunc((choseToSwitch/totalAttempts)*100)}%)`;
            document.querySelector('#ac').innerHTML = totalAttempts;
            
            document.querySelector('#ba').innerHTML = `${stayWon} (${Math.trunc((stayWon/totalAttempts)*100)}%)`;
            document.querySelector('#bb').innerHTML = `${switchWon} (${Math.trunc((switchWon/totalAttempts)*100)}%)`;

            if (!stayWon) {
                document.querySelector('#ca').innerHTML = `${playWonStay} (0%)`;
            } else {
                document.querySelector('#ca').innerHTML = `${playWonStay} (${Math.trunc((playWonStay/stayWon)*100)}%)`;
            }
            if (!switchWon) {
                document.querySelector('#cb').innerHTML = `${playWonSwitch} (0%)`;
            } else {
                document.querySelector('#cb').innerHTML = `${playWonSwitch} (${Math.trunc((playWonSwitch/switchWon)*100)}%)`;
            }
            document.querySelector('#cc').innerHTML = `${numWonAttempts} (${Math.trunc((numWonAttempts/totalAttempts)*100)}%)`;
            
    
            initializing = true;
        }
    }
    
    for (let door in doorObj) {
        if (doorObj[door].revealed) {
            switch (doorObj[door].prize) {
                case "goat":
                    doors[door].style.background = '#e3735e';
                    continue;
                case "car":
                    doors[door].style.background = '#708f79';
                    // continue;
            }
        } else {
            if (doorObj[door].selected) {
                doors[door].style.background = '#8f754f';
                continue;
            }
            doors[door].style.background = '#d7b377';
        }
    }
}