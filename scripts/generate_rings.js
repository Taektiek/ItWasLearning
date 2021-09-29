let ringCount = 0;

let ring1 = [
    {
        "text": "berichten",
        "link": "index.html"
    },
    {
        "text": "vakken",
        "onclick": "toggleRing()"
    },
    {
        "text": "agenda",
        "link": "agenda.html"
    },
    {
        "text": "cijfers",
        "link": "index.html"
    },
]

let ring2 = [
    {
        "text": "Wiskunde D",
        "link": "index.html"
    },
    {
        "text": "Informatica",
        "link": "informatica.html"
    },
    {
        "text": "Spaans",
        "link": "index.html"
    },
    {
        "text": "Engels",
        "link": "index.html"
    },
    {
        "text": "Nederlands",
        "link": "index.html"
    },
    {
        "text": "Filosofie",
        "link": "index.html"
    },
    {
        "text": "Wiskunde B",
        "link": "index.html"
    },
]

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

function createText(path, text, href, onclick, id, svg) {
    var svgText = document.createElementNS("http://www.w3.org/2000/svg", "text")
    var svgTextPath = document.createElementNS("http://www.w3.org/2000/svg", "textPath")
    var svgLink = document.createElementNS("http://www.w3.org/2000/svg", "a")
    svg.insertBefore(svgLink, path.nextSibling)
    if (href != undefined) {
        svgLink.setAttribute("href", href)
    }
    if (onclick != undefined) {
        svgLink.setAttribute("onclick", onclick)
    }

    svgLink.appendChild(svgText)
    svgText.appendChild(svgTextPath)
    svgText.setAttribute("text-anchor", "middle")
    svgText.setAttribute("dominant-baseline", "middle")
    svgText.classList.add("ring-"+ringCount)
    svgTextPath.setAttribute("href", "#" + ringCount + "-" +id)
    svgTextPath.setAttribute("startOffset", "50%")
    svgText.classList.add("ring-text")
    svgTextPath.textContent = text
}

function createArc(x, y, radius, startAngle, endAngle, text, href, onclick, id) {
    var path = document.createElementNS("http://www.w3.org/2000/svg", "path")
    var svg = document.getElementById("svg")
    svg.insertBefore(path, svg.lastChild)
    path.classList.add("arc")
    path.setAttribute("d", describeArc(x, y, radius, startAngle, endAngle));
    path.setAttribute("id", ringCount + "-" + id)
    path.classList.add("ring-"+ringCount)
    createText(path, text, href, onclick, id, svg)
    if (href != undefined) {
        path.setAttribute("href", href)
    }
    if (onclick != undefined) {
        path.setAttribute("onclick", onclick)
    }
}

function createRingFromDict(margin, radius, dict) {

    ringCount++

    let k = 0;

    dict.forEach(function(i) {
        createArc(50, 50, radius, (360/dict.length)*k+margin, (360/dict.length)*k+(90-margin), i["text"], i["link"], i["onclick"], k)
        k++
    })
}

function toggleRing() {
    [...document.getElementsByClassName("ring-2")].forEach(function(i){
        if (i.classList.contains("none")) {
            i.classList.remove("none")
        } else {
            i.classList.add("none")
        }
    })
}

createRingFromDict(3, 28, ring1)
createRingFromDict(20, 40, ring2)
toggleRing()