const gridButtons = Array.from(document.querySelectorAll('[data-position]'));
const currentSymbol = document.getElementById("current-turn");
const win = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleGridButtonClick(event) {
    let currentTurn = currentSymbol.innerText;
    if (this.textContent === "") {
        this.textContent = currentTurn;
        this.style.backgroundColor = "#eee";
        if (checkWinner(currentTurn)) {
            document.getElementById("status").innerText = "Winner: " + currentTurn
            gridButtons.forEach(button => button.disabled = true);
        } else
            currentSymbol.innerText = (currentTurn == "🦄" ? "🦔" : "🦄");
    }
}


function checkWinner(currentTurn) {
    const checkSquares = (currentTurn) => {
        const currentList = gridButtons.filter(button => button.textContent === currentTurn);
        const currentMap = currentList.map(button => button.getAttribute("data-position"));
        let Winner = false;

        if (currentMap.length > 2) {
            win.forEach((arr) => {
                let count = 0;
                for (let i = 0; i < 3; i++) {
                    for (let j = 0; j < currentMap.length; j++) {
                        if (arr[i] == currentMap[j])
                            count++;
                    }
                }
                if (count === 3) {
                    Winner = true;
                }
            })
        }

        return Winner;
    }
    return checkSquares(currentTurn);
}



function main() {
    currentSymbol.innerText = "🦄";
    for (let i = 0; i < gridButtons.length; i++) {
        const numberButton = gridButtons[i];
        numberButton.addEventListener('click', handleGridButtonClick);
    }
}

main()