/* 
 * This example shows you how you can completely manipulate the
 * look and feel of FCO by showing a welcome screen based on the 
 * popular film "The Matrix".
 */
fco.ready = function() {
    if (fco.authenticated()) {
        var user = fco.user();
        var cust = fco.customer();

        console.log(user);
        console.log(cust);

        popup(user, cust);
    }
}

var popup = function(user, cust) {
    var overlay = document.createElement("DIV");
    var popup = document.createElement("DIV");
    var rPill = document.createElement("DIV");
    var bPill = document.createElement("DIV");

    overlay.id = "matrix-overlay";
    popup.id = "matrix-popup";
    popup.innerHTML = "<h1>Welcome to the matrix, " + user.resourceName + ".</h1>" + "<h4>Before we continue, " + cust.resourceName + " requires you to make a decision...</h4>";

    document.body.appendChild(overlay);
    effect(overlay);
    overlay.appendChild(popup);

    rPill.id = "matrix-pill-red";
    rPill.className = "Primary Button";
    rPill.appendChild(fco.create.label("RED"));
    bPill.id = "matrix-pill-blue";
    bPill.className = "Primary Button";
    bPill.appendChild(fco.create.label("BLUE"));

    popup.appendChild(rPill);
    popup.appendChild(bPill);

    $(bPill).on('click', clickPill);
    $(rPill).on('click', clickPill);
}

var clickPill = function() {
    $('#matrix-overlay').remove();
}

var effect = function(parent) {
    var c = document.createElement("canvas");
    c.id = "matrix_canvas";
    parent.appendChild(c);

    var ctx = c.getContext("2d");

    //making the canvas full screen
    c.height = window.innerHeight;
    c.width = window.innerWidth;

    //chinese characters - taken from the unicode charset
    var chinese = "田由甲申甴电甶男甸甹町画甼甽甾甿畀畁畂畃畄畅畆畇畈畉畊畋界畍畎畏畐畑ﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏ0123456789";
    //converting the string into an array of single characters
    chinese = chinese.split("");

    var font_size = 8;
    var columns = c.width / font_size; //number of columns for the rain
    //an array of drops - one per column
    var drops = [];
    var z = [];
    //x below is the x coordinate
    //1 = y co-ordinate of the drop(same for every drop initially)
    for (var x = 0; x < columns; x++) {
        drops[x] = 1;
        z[x] = Math.floor(Math.random() * 8);
    }

    //drawing the characters
    function draw() {
        //Black BG for the canvas
        //translucent BG to show trail
        ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
        ctx.fillRect(0, 0, c.width, c.height);

        //looping over drops
        for (var i = 0; i < drops.length; i++) {
            var rgba = "0, 255, 0, " + (z[i] / 10);
            if (Math.random() < 0.01) {
                rgba = "153, 255, 204, " + ((z[i] / 10) + 0.2);
            }
            ctx.fillStyle = "rgba(" + rgba + ")"; //green text
            var cFontSize = (font_size + z[i])
            ctx.font = cFontSize + "px arial";
            //a random chinese character to print
            var text = chinese[Math.floor(Math.random() * chinese.length)];
            //x = i*font_size, y = value of drops[i]*font_size
            ctx.fillText(text, i * font_size, drops[i] * cFontSize);

            //sending the drop back to the top randomly after it has crossed the screen
            //adding a randomness to the reset to make the drops scattered on the Y axis
            if (drops[i] * cFontSize > c.height && Math.random() > 0.975)
                drops[i] = 0;

            //incrementing Y coordinate
            drops[i]++;
        }
    }

    setInterval(draw, 33);

}