let drawNumberImg = function(dx, dy, i) {
    let img = document.createElement("img");
    if (currentGame == "easierPuzzel")
        img.src = "/assets/images/images/numbers" + i + ".gif";
    else if (currentGame == "harderPuzzel")
        img.src = "/assets/images/images/puzzel15/numbers" + i + ".gif";
    img.addEventListener("load", function() {
        if (currentGame == "harderPuzzel") {
            canvasContext.clearRect(dx, dy, 80, 70);
            canvasContext.drawImage(img, dx, dy, 80, 70);
        } else {
            canvasContext.clearRect(dx, dy, 100, 80);
            canvasContext.drawImage(img, dx, dy);
        }
    });
}
module.exports = drawNumberImg;