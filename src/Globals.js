import Game from "./game";

function getCookie(name) {
    var name = name + '=';
    var cookies = decodeURIComponent(document.cookie).split(';');
    for (var i = 0; i < cookies.length; i++) {
        var c = cookies[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c;
        }
    }
}

let isPlayed = getCookie("state");


var state = new Game();

if (isPlayed != undefined) {
    var cook = getCookie("state");
    cook = cook.replace("state=", "")
    state = JSON.parse(cook)
    
}

export default state;