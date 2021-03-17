const baseURL = 'https://api.covid19api.com/dayone/country'
let death = 0;
let active = 0;
let recovered = 0;

const countries = [
    'taiwan',
    'Japan',
    'korea-south',
    'south-africa',
    'italy',
    'spain'
]

const results = await Promise.all( //I'm using Promise.all to take an array of promises and give a single promise of all the values of countries
    countries.map(country =>
        fetch(`${baseURL}/${country}`)
        .then(response => response.text())
        .then(result => {
            death += parseInt(result.slice(result.lastIndexOf('Deaths') + 8, result.lastIndexOf(',"Recovered"')));
            active += parseInt(result.slice(result.lastIndexOf('Active') + 8, result.lastIndexOf(',"Date"')));
            recovered += parseInt(result.slice(result.lastIndexOf('Recovered') + 11, result.lastIndexOf(',"Active"')));
        }))

);
console.log(`death: ${death}`); //print out total number of deaths from the 6 countries
console.log(`active: ${active}`); //print out total number of actives from the 6 countries
console.log(`recovered: ${recovered}`); //print out total number of recoveries from the 6 countries