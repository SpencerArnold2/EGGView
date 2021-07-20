var topVID = 1;
var bottomVID = 1;

// function addVertexTop(){

//     Cytoscape.cy.add({
//         group: 'nodes',
//         data: { weight: 75 },
//         position: { x: 200, y: 200 }
//     });

// }

// function addEdgeTop(){
//     const drawStart = (e) =>{
//         if(!e.target.classList.contains("vertex")) return;
//         let eventX = e.type == "mousedown" ? e.clientX - canvas.offsetLeft : e.targetTouches[0].clientX - canvas.offsetLeft;
//         let eventY = e.type == "mousedown" ? e.clientY - canvas.offsetTop + window.scrollY : e.targetTouches[0].clientY - canvas.offsetTop + window.scrollY;
//         let lineEl = document.createElementNS('http://www.w3.org/2000/svg','line')
//         currentLine = lineEl;
//         currentLine.setAttribute("x1", eventX)
//         currentLine.setAttribute("y1", eventY)
//         currentLine.setAttribute("x2", eventX)
//         currentLine.setAttribute("y2", eventY)
//         currentLine.setAttribute("stroke", "blue")
//         currentLine.setAttribute("stroke-width", "4")

//         canvas.appendChild(currentLine)
//         sources.push({ line: lineEl, start: e.target, end: null })

//         drag = true
//     }
//     const drawMove = (e) =>{
//         if (!drag || currentLine == null) return;
//         let eventX = e.type == "mousedown" ? e.clientX - canvas.offsetLeft : e.targetTouches[0].clientX - canvas.offsetLeft
//         let eventY = e.type == "mousedown" ? e.clientY - canvas.offsetTop + window.scrollY : e.targetTouches[0].clientY - canvas.offsetTop + window.scrollY
//         currentLine.setAttribute("x2", eventX)
//         currentLine.setAttribute("y2", eventY) 
//     }
//     const drawEnd = (e) =>{
//         if (!drag || currentLine == null) return;
//         let targetHook = e.type == "mouseup" ? e.target : document.elementFromPoint(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
//         if (!targetHook.classList.contains("vertex") || targetHook == sources[sources.length - 1].start) {
//             currentLine.remove()
//             sources.splice(sources.length - 1, 1)
//           } else {
//             sources[sources.length - 1].end = targetHook
          
//             let deleteElem = document.createElement("div")
//             deleteElem.classList.add("delete")
//             deleteElem.innerHTML = "&#10005"
//             deleteElem.dataset.position = sources.length - 1
//             deleteElem.addEventListener("click", deleteLine)
//             let deleteElemCopy = deleteElem.cloneNode(true)
//             deleteElemCopy.addEventListener("click", deleteLine)
          
//             sources[sources.length - 1].start.appendChild(deleteElem)
//             sources[sources.length - 1].end.appendChild(deleteElemCopy)
//           }
          
//           drag = false
//     }
//     const sources = [];
//     let currentLine = null;
//     let drag = false;
//     const canvas = document.querySelector(".canvas");
//     const svgScene = canvas.querySelector(".canvas svg");
//     canvas.addEventListener("mousedown", drawStart);
//     canvas.addEventListener("mousemove", drawMove);
//     canvas.addEventListener("mouseup", drawEnd);
// }
function addTextTop(){
    const canvas = document.getElementById('top');
    const newText = document.createElement("p");
    newText.style.position = "absolute";
    newText.innerHTML = "T";
    canvas.appendChild(newText);

    const onMouseMove = (e) =>{
        // console.log(e.clientX);
        newText.style.left = e.clientX -525+ "px";
        newText.style.top = e.clientY + -150 + 'px';
    }
    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mousedown', function stop(e){
        canvas.removeEventListener("mousemove", onMouseMove);
    })

    newText.addEventListener('mousedown', dragElement(newText));

    function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    elmnt.onmousedown = dragMouseDown;
    

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
    }
    }

}





