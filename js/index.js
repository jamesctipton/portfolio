var C;
var ctx;
var bounding;
var bgcolor = "#080808";
window.onload = function() {
    C = document.getElementById("bg");
    ctx = C.getContext("2d");
    bounding = C.getBoundingClientRect()
    clear(ctx);
    $('body').css({
        'background-image':"url(" + C.toDataURL("image/png")+ ");",
        'background-repeat':"no-repeat;",
        'background-size':"cover;"
    });
    $('.container').addClass('top');
    $('#main').css({"opacity":1})
}

window.onmousemove = function(e) {
    clear(ctx);

    var scaleX = C.width / bounding.width;
    var scaleY = C.height / bounding.height;
    var x = ((e.clientX - bounding.left) / (bounding.right - bounding.left) * C.width) / scaleX;
    var y = ((e.clientY - bounding.top) / (bounding.bottom - bounding.top) * C.height) / scaleY;

    // Create gradient
    var grd = ctx.createRadialGradient(x, y, 5, x, y, 1000);
    grd.addColorStop(0, "white");
    grd.addColorStop(0.1, "#676767");
    // grd.addColorStop(0.6, "#141414");
    grd.addColorStop(1, bgcolor);

    // Fill with gradient
    ctx.fillStyle = grd;
    ctx.beginPath();
    ctx.arc(x, y, 1000, 0, 2 * Math.PI);
    ctx.fill();
    $('body').css({'background-image':"url(" + C.toDataURL("image/png")+ ")" });
}

function clear(ctx) {
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
    ctx.fillStyle = bgcolor;
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}
