var blocker = false;
let x = document.querySelector(".ad-zone");
let x_height = x.offsetHeight;
let msg = document.getElementById("msg")
if(x_height){
    blocker = false
} else{
    blocker = true
}

window.blocker = blocker

export { blocker }