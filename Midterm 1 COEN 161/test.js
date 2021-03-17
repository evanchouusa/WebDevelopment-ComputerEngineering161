const convertSnakeToCamelCase = (currentValue) => {
    const arr = currentValue.split("_");
    let currentWord = arr[0];
    for (let i = 1; i < arr.length; i++) {
        arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
        currentWord += arr[i];
    }
    return currentWord;
}

const snakeCased = [
    'baby_yoda', 'porgs', 'corgis_are_floofy'
]

const converted = snakeCased.map(convertSnakeToCamelCase)
console.log(converted)