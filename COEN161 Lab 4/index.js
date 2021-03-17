const buttons = Array.from(document.querySelectorAll('a'));
const title = document.querySelector('h1');
const img = document.querySelector('img');
const alt = document.querySelector('alt');

//user side basic url
const xkcdBaseUrl = "https://xkcd.now.sh/?comic="; //this is for information from user request
const myBaseUrl = "index.html?issue="; //for button url
let comicVersion = "latest"; //latest comic issue
let latestNum = 1;

//return random issue
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function load() {

    //fetching comic version from xkcd
    fetch(xkcdBaseUrl + comicVersion)
        .then(response => response.json())
        .then(data => {
            latestNum = data.num;
        });

    //get parameter from my own index.html page url
    let params = new URLSearchParams(document.location.search.substring(1));

    //if user requests certain issue, we will get the desired issue for comic version
    //else default is latest comic issue 
    if (params.get("issue") != null) {
        comicVersion = params.get("issue");
    }

    fetch(xkcdBaseUrl + comicVersion)
        .then(response => response.json())
        .then(data => {
            const comicNum = data.num;
            title.innerHTML = data.title;
            alt.innerHTML = data.alt;
            img.src = data.img;

            //if you are on the first comic issue, you can't do previous. Otherwise, you can go previous or next.
            buttons[0].href = (comicNum == "1" ? "#" : myBaseUrl + (parseInt(comicNum) - 1));
            buttons[1].href = myBaseUrl + (getRandomInt(latestNum) + 1);
            //if you are on the latest comic issue, you can't do next. Otherwise, you can go prev or next.
            buttons[2].href = (latestNum === comicNum ? "#" : myBaseUrl + (parseInt(comicNum) + 1));
        });

}
window.onload = load;