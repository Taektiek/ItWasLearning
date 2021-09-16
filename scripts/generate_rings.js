function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
  var angleInRadians = (angleInDegrees-90) * Math.PI / 180.0;

  return {
    x: centerX + (radius * Math.cos(angleInRadians)),
    y: centerY + (radius * Math.sin(angleInRadians))
  };
}

function describeArc(x, y, radius, startAngle, endAngle){

    var start = polarToCartesian(x, y, radius, endAngle);
    var end = polarToCartesian(x, y, radius, startAngle);

    var largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

    var d = [
        "M", start.x, start.y, 
        "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y
    ].join(" ");

    return d;       
}

function createArc(x, y, radius, startAngle, endAngle) {
    var path = document.createElementNS("http://www.w3.org/2000/svg", "path")
    var svg = document.getElementById("svg")
    svg.insertBefore(path, svg.lastChild)
    path.classList.add("arc")
    path.setAttribute("d", describeArc(x, y, radius, startAngle, endAngle));
}

function createRing(amount, marginFactor, radius) {
    let margin = amount*marginFactor;

    for (let i=0; i<amount; i++) {
        createArc(50, 50, radius, (360/amount)*i+margin, (360/amount)*i+(90-margin))
    }
}

createRing(5, 3, 28)
// createRing(8, 3, 40)