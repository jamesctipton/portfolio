import Typewriter from './typewriter.js'; 

let sunIcon = '<svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48"><path d="M479.765-340Q538-340 579-380.765q41-40.764 41-99Q620-538 579.235-579q-40.764-41-99-41Q422-620 381-579.235q-41 40.764-41 99Q340-422 380.765-381q40.764 41 99 41Zm.235 60q-83 0-141.5-58.5T280-480q0-83 58.5-141.5T480-680q83 0 141.5 58.5T680-480q0 83-58.5 141.5T480-280ZM70-450q-12.75 0-21.375-8.675Q40-467.351 40-480.175 40-493 48.625-501.5T70-510h100q12.75 0 21.375 8.675 8.625 8.676 8.625 21.5 0 12.825-8.625 21.325T170-450H70Zm720 0q-12.75 0-21.375-8.675-8.625-8.676-8.625-21.5 0-12.825 8.625-21.325T790-510h100q12.75 0 21.375 8.675 8.625 8.676 8.625 21.5 0 12.825-8.625 21.325T890-450H790ZM479.825-760Q467-760 458.5-768.625T450-790v-100q0-12.75 8.675-21.375 8.676-8.625 21.5-8.625 12.825 0 21.325 8.625T510-890v100q0 12.75-8.675 21.375-8.676 8.625-21.5 8.625Zm0 720Q467-40 458.5-48.625T450-70v-100q0-12.75 8.675-21.375 8.676-8.625 21.5-8.625 12.825 0 21.325 8.625T510-170v100q0 12.75-8.675 21.375Q492.649-40 479.825-40ZM240-678l-57-56q-9-9-8.629-21.603.37-12.604 8.526-21.5 8.896-8.897 21.5-8.897Q217-786 226-777l56 57q8 9 8 21t-8 20.5q-8 8.5-20.5 8.5t-21.5-8Zm494 495-56-57q-8-9-8-21.375T678.5-282q8.5-9 20.5-9t21 9l57 56q9 9 8.629 21.603-.37 12.604-8.526 21.5-8.896 8.897-21.5 8.897Q743-174 734-183Zm-56-495q-9-9-9-21t9-21l56-57q9-9 21.603-8.629 12.604.37 21.5 8.526 8.897 8.896 8.897 21.5Q786-743 777-734l-57 56q-8 8-20.364 8-12.363 0-21.636-8ZM182.897-182.897q-8.897-8.896-8.897-21.5Q174-217 183-226l57-56q8.8-9 20.9-9 12.1 0 20.709 9Q291-273 291-261t-9 21l-56 57q-9 9-21.603 8.629-12.604-.37-21.5-8.526ZM480-480Z"/></svg>';
let moonIcon = '<svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48"><path d="M480-120q-150 0-255-105T120-480q0-150 105-255t255-105q8 0 17 .5t23 1.5q-36 32-56 79t-20 99q0 90 63 153t153 63q52 0 99-18.5t79-51.5q1 12 1.5 19.5t.5 14.5q0 150-105 255T480-120Zm0-60q109 0 190-67.5T771-406q-25 11-53.667 16.5Q688.667-384 660-384q-114.689 0-195.345-80.655Q384-545.311 384-660q0-24 5-51.5t18-62.5q-98 27-162.5 109.5T180-480q0 125 87.5 212.5T480-180Zm-4-297Z"/></svg>';

// expanded info blocks for projects - to be inserted dynamically
const info = {
    emission : 'First Place Winner at MLH Tigerhacks 2022. I collaborated with 3 colleagues to write a React Native mobile app that tracks CO₂ emissions, average fuel economy, speed, and location of your car in real-time. <span><a href="https://github.com/jamesctipton/JASK" target="_blank">Github Link</a></span>',
    oilSpill : 'A research project in conjunction with the US Geological Survey to create a new way to detect oil content in water using a mobile phone. I worked on creating an Angular/Ionic web application to display and handle data, as well as employ a machine learning model to predict oil content from a photo. <span><a href="https://github.com/jamesctipton/WOD" target="_blank">Github Link</a></span>',
    fri : "My senior capstone project in Computer Science. Frí is a vacation planning app that I and 3 fellow students constructed in ReactJS with a Python Flask server backend. The app's main focus is to streamline group vacation planning and aggregate live data relevant to planning a trip. <span><a href='https://github.com/jamesctipton/capstone' target='_blank'>Github Link</a></span>",
    depression : 'A school project that used Python and various libraries to create a natural language model to predict depressive features in various text datasets from social media. <span><a href="https://github.com/jamesctipton/MLFinal" target="_blank">Github Link</a></span>',
    portfolio : "You're looking at it! This is a website I constructed using plain HTML, CSS, and JavaScript. Though most of my expertise is in JavaScript and TypeScript frameworks, I felt it was important to make everything in this portfolio from the ground up. " + '<span><a href="https://github.com/jamesctipton/portfolio" target="_blank">Github Link</a></span>',
    pong : 'My first delve into using GUI libraries with Python, and my first bigger project. This was early in my education in Computer Science and I learned a lot about object oriented and functional programming. <span><a href="https://github.com/jamesctipton/pong" target="_blank">Github Link</a></span>'
    
}

// similar to insertBefore DOM function, just inserts after a sibling node
function insertAfter(referenceNode, newNode) {
    return referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

// global function
window.expandInfo = function(elem) {
    // get element that called the function
    let span = document.getElementById(elem);
    let infoDiv = document.getElementById(elem + "-info");
    infoDiv.classList.toggle("collapsed");
    infoDiv.classList.toggle("expanded");
    // $('#'+ elem + '-info').slideToggle();
    if(span.innerHTML != "▼") {
        span.innerHTML = "▼"
        document.getElementById("hint").innerHTML = "// click ▼ to expand"
        
        // remove whitespace and indents
        infoDiv.parentNode.removeChild(infoDiv.nextSibling);
        infoDiv.parentNode.removeChild(infoDiv.nextSibling);
    } else {
        span.innerHTML = "▲"
        document.getElementById("hint").innerHTML = "// click ▲ to contract"
        
        // preserve whitespace with indents
        var lineBreak = document.createElement("br");
        var indentAfter = document.createElement("span");
        indentAfter.innerHTML = "        ";
        insertAfter(infoDiv, lineBreak);
        insertAfter(lineBreak, indentAfter);
    }
}

function darkmode() {
    document.documentElement.setAttribute('data-theme', 'light');
    document.getElementById("lightdark").innerHTML = moonIcon;
    sessionStorage.setItem("darkmode", true);
}

function lightmode() {
    document.documentElement.setAttribute('data-theme', 'dark');
    document.getElementById("lightdark").innerHTML = sunIcon;
    sessionStorage.setItem("darkmode", false);
}

// called via onclick
// global function
window.lightDark = function() {
    (document.documentElement.getAttribute('data-theme') == 'dark') ? darkmode() : lightmode();
}

$(document).ready(function() {

    // detect browser dark/light state
    (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) ? darkmode() : lightmode();
    (sessionStorage.getItem("darkmode") == true) ? darkmode() : lightmode();
    
    // clicking on dropdowns gets weird while the animation is going
    document.body.style.pointerEvents = "none";

    // start typewriter
    const elem = document.getElementById('typewriter');

    let typewriter = new Typewriter(document, elem);

    typewriter.typePage();

    // the original html document flashes briefly before the animation without this tag and the corresponding visibility css
    document.body.style.visibility = "visible";
});

function insertInfoDivs() {
    // info divs for projects are long, so it'd slow down the typing generator if they were written on the html page
    // this will create and insert the info divs dynamically
    for(let i=0; i < Object.keys(info).length; i++) {
        let elem = Object.keys(info)[i];

        let span = document.getElementById(elem);
        let newDiv = document.createElement("div");
        // insert after next sibling
        insertAfter(span.parentNode.nextSibling, newDiv);

        // span.parentNode.classList.add("info-container");

        newDiv.id = elem + "-info";
        newDiv.classList.add("project-info");
        newDiv.classList.add("collapsed");

        newDiv.innerHTML = info[elem];
    }
}

// called by the typePage function upon completion
export function finishTyping() {
    document.body.style.pointerEvents = "auto";
    insertInfoDivs();
}
