var C;
var ctx;
window.onload = function() {
    C = document.getElementById("bg");
    ctx = C.getContext("2d");
    clear(ctx);
}

window.onmousedown = function(e) {
    var bounding = C.getBoundingClientRect();
    var x = e.clientX - bounding.left;
    var y = e.clientY - bounding.top;
    clear(ctx);
    ctx.linewidth = 20;
    ctx.strokeStyle = "white";
    var i = 0;
    var ivl = setInterval(() => {
        ctx.beginPath();
        ctx.arc(x, y, i, 0, 2*Math.PI);
        ctx.stroke();
        ctx.fillStyle = "rgba(6, 6, 6, 0.5)";
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        i++;
    }, 10);
    setTimeout(() => {
        clearInterval(ivl);
    }, 5000);
};

function clear(ctx) {
    ctx.fillStyle = "#060606";
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}