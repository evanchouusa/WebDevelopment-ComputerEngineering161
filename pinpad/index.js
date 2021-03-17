const PASSCODE = '1022';

const inputElement = document.getElementsByTagName('input')[0];


const calculate = (event) => {
    const input = event.currentTarget;
    let currentInput = inputElement.value + input.textContent;
    if (currentInput.length === 4) {
        if (currentInput === PASSCODE) {
            console.log("Success");
            inputElement.className = "success";
        } else {
            inputElement.className = "error";
        }
        Array.from(document.getElementsByTagName('button')).forEach(button => {
            button.disabled = true
        })
    } else if (currentInput.length < 4) {
        inputElement.className = "";
    }
    inputElement.value = currentInput;
}

Array.from(document.getElementsByTagName('button')).forEach(element => element.addEventListener('click', calculate))