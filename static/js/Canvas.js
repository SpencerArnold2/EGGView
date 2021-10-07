// function dropdown() {
//     document.getElementById("myDropdown").classList.toggle("show");
//     document.getElementById("myDropdown_productions").classList.toggle("show")
// }

// window.onclick = function (event) {
//     if (!event.target.matches('.dropbtn')) {
//         var dropdowns = document.getElementsByClassName("dropdown-content");
//         var i;
//         for (i = 0; i < dropdowns.length; i++) {
//             var openDropdown = dropdowns[i];
//             if (openDropdown.classList.contains('show')) {
//                 openDropdown.classList.remove('show');
//             }
//         }
//     }
// }

function addTextLeft() {
    document.getElementById("label-input_left").className = "show-text";
    var newLabel;
    cy_left.on('tap', 'node', function (evt) {
        var node = evt.target;
        newLabel = document.getElementById("label-input_left").value;
        node.data("label", newLabel);
        cy_left.removeListener('tap');
        document.getElementById("label-input_left").className = "hidden-input";
    });
    cy_left.on('tap', 'edge', function (evt) {
        var edge = evt.target;
        newLabel = document.getElementById("label-input_left").value;
        edge.data("label", newLabel);
        cy_left.removeListener('tap');
        document.getElementById("label-input_left").className = "hidden-input";
    });
}
function addTextRight() {
    document.getElementById("label-input_right").className = "show-text";
    var newLabel;
    cy_right.on('tap', 'node', function (evt) {
        var node = evt.target;
        newLabel = document.getElementById("label-input_right").value;
        node.data("label", newLabel);
        cy_right.removeListener('tap');
        document.getElementById("label-input_right").className = "hidden-input";
    });
    cy_right.on('tap', 'edge', function (evt) {
        var edge = evt.target;
        newLabel = document.getElementById("label-input_right").value;
        edge.data("label", newLabel);
        cy_right.removeListener('tap');
        document.getElementById("label-input_right").className = "hidden-input";
    });
}

function addIDLeft(){
    document.getElementById("label-input_left").className = "show-text";
    var newLabel;
    cy_left.on('tap', 'node', function (evt) {
        var node = evt.target;
        newLabel = document.getElementById("label-input_left").value;
        node.data("_id", newLabel);
        cy_left.removeListener('tap');
        document.getElementById("label-input_left").className = "hidden-input";
    });
    cy_left.on('tap', 'edge', function (evt) {
        var edge = evt.target;
        newLabel = document.getElementById("label-input_left").value;
        edge.data("_id", newLabel);
        cy_left.removeListener('tap');
        document.getElementById("label-input_left").className = "hidden-input";
    });
}

var productions = [];
var currentProduction = 0;
var directionStatus = "";

function saveGraph() {
    var leftJSON = cy_left.json();
    var rightJSON = cy_right.json();
    var productionID = currentProduction; //tmp
    if (leftJSON["style"][1]["style"]["target-arrow-shape"] == "triangle") directionStatus = "Directed";
    else directionStatus = "Undirected";
    var finalJSON = {
        "production": {
            "productionID": productionID,
            "directionStatus": directionStatus,

            "left": {
                "subgraph": []
            },

            "right": {
                "subgraph": []
            }
        }
    }
    var left_line = 0;
    var right_line = 0;
    if(leftJSON["elements"]["nodes"] == null){
        finalJSON["production"]["left"]["subgraph"][left_line++] = [];
    }else{
        for (var i = 0; i < leftJSON["elements"]["nodes"].length; i++) {
            finalJSON["production"]["left"]["subgraph"][left_line++] = ([leftJSON["elements"]["nodes"][i]["group"], [leftJSON["elements"]["nodes"][i]["data"]], [leftJSON["elements"]["nodes"][i]["position"]]])
        }
    }
    if(rightJSON["elements"]["nodes"] == null){
        finalJSON["production"]["right"]["subgraph"][right_line++] = [];
    }else{
        for (var i = 0; i < rightJSON["elements"]["nodes"].length; i++) {
            finalJSON["production"]["right"]["subgraph"][right_line++] = ([rightJSON["elements"]["nodes"][i]["group"], [rightJSON["elements"]["nodes"][i]["data"]], [rightJSON["elements"]["nodes"][i]["position"]]])
        }
    }
    if(leftJSON["elements"]["edges"] == null){
        finalJSON["production"]["left"]["subgraph"][left_line++] = [];
    }else{
        for (var i = 0; i < leftJSON["elements"]["edges"].length; i++) {
            finalJSON["production"]["left"]["subgraph"][left_line++] = ([leftJSON["elements"]["edges"][i]["group"], [leftJSON["elements"]["edges"][i]["data"]], [leftJSON["elements"]["edges"][i]["position"]]])
        }
    }
    if(rightJSON["elements"]["edges"] == null){
        finalJSON["production"]["right"]["subgraph"][right_line++] = [];
    }else{
        for (var i = 0; i < rightJSON["elements"]["edges"].length; i++) {
            finalJSON["production"]["right"]["subgraph"][right_line++] = ([rightJSON["elements"]["edges"][i]["group"], [rightJSON["elements"]["edges"][i]["data"]], [rightJSON["elements"]["edges"][i]["position"]]])
        }
    }

    finalJSON["production"]["left"]["subgraph"] = finalJSON["production"]["left"]["subgraph"].filter(e => e.length);
    finalJSON["production"]["right"]["subgraph"] = finalJSON["production"]["right"]["subgraph"].filter(e => e.length);

    finalJSON = JSON.stringify(finalJSON);
    var blob = new Blob([finalJSON], { type: "application/json;charset=utf-8" });
    if(productions[currentProduction]!= null){
        productions[currentProduction] = finalJSON;
    }else{
        productions.push(finalJSON);
    }
}

function deactivate(){
    saveGraph();
    var lastButton = document.getElementsByClassName("active")[0];
    lastButton.setAttribute("class", "");
}
function deactivateAll(){
    saveGraph();
    var lastButtons = document.getElementsByClassName("active");
    for(var i = 0; i<lastButtons.length; i++){
        lastButtons[i].setAttribute("class", "");
    }
}
function activate(){
    var currentButton = document.getElementById("dropdown_pro" + currentProduction);
    currentButton.setAttribute("class", "active");
}


function createProduction(){
    if(directionStatus=='Directed'){
        newDirected('left');
        newDirected('right');
    }
    else{
        newUndirected('left');
        newUndirected('right');
    }

    var newButton = document.createElement("BUTTON");
    newButton.setAttribute('onclick', 'deactivate();currentProduction = ' + currentProduction + ';document.getElementById("dropdown_pro" + currentProduction).setAttribute("class", "");generateGraph(productions[' + currentProduction + ']);activate()')
    newButton.setAttribute('id', 'dropdown_pro' + currentProduction);
    newButton.setAttribute('class', "active");
    var text = document.createTextNode('Production ' + (currentProduction+1))
    newButton.appendChild(text);
    var newPro = document.getElementById("dropdown_newPro")
    newPro.before(newButton);
}

function addProduction(){
    var newButton = document.createElement("BUTTON");
    newButton.setAttribute('onclick', 'deactivate();currentProduction = ' + currentProduction + ';document.getElementById("dropdown_pro" + currentProduction).setAttribute("class", "");generateGraph(productions[' + currentProduction + ']);activate()')
    newButton.setAttribute('id', 'dropdown_pro' + currentProduction);
    newButton.setAttribute('class', "active");
    var text = document.createTextNode('Production ' + (currentProduction+1))
    newButton.appendChild(text);
    var newPro = document.getElementById("dropdown_newPro")
    newPro.before(newButton);
}

function setCurrentProduction(num){
    currentProduction = num;
}

function exportProduction(pID) {
    var leftJSON = cy_left.json();
    var rightJSON = cy_right.json();
    var productionID = pID;
    if (leftJSON["style"][1]["style"]["target-arrow-shape"] == "triangle") directionStatus = "Directed";
    else directionStatus = "Undirected";
    var finalJSON = {
        "production": {
            "productionID": productionID,
            "directionStatus": directionStatus,

            "left": {
                "subgraph": []
            },

            "right": {
                "subgraph": []
            }
        }
    }
    var left_line = 0;
    var right_line = 0;
    if(leftJSON["elements"]["nodes"] == null){
        finalJSON["production"]["left"]["subgraph"][left_line++] = [];
    }else{
        for (var i = 0; i < leftJSON["elements"]["nodes"].length; i++) {
            finalJSON["production"]["left"]["subgraph"][left_line++] = ([leftJSON["elements"]["nodes"][i]["group"], [leftJSON["elements"]["nodes"][i]["data"]], [leftJSON["elements"]["nodes"][i]["position"]]])
        }
    }
    if(rightJSON["elements"]["nodes"] == null){
        finalJSON["production"]["right"]["subgraph"][right_line++] = [];
    }else{
        for (var i = 0; i < rightJSON["elements"]["nodes"].length; i++) {
            finalJSON["production"]["right"]["subgraph"][right_line++] = ([rightJSON["elements"]["nodes"][i]["group"], [rightJSON["elements"]["nodes"][i]["data"]], [rightJSON["elements"]["nodes"][i]["position"]]])
        }
    }
    if(leftJSON["elements"]["edges"] == null){
        finalJSON["production"]["left"]["subgraph"][left_line++] = [];
    }else{
        for (var i = 0; i < leftJSON["elements"]["edges"].length; i++) {
            finalJSON["production"]["left"]["subgraph"][left_line++] = ([leftJSON["elements"]["edges"][i]["group"], [leftJSON["elements"]["edges"][i]["data"]], [leftJSON["elements"]["edges"][i]["position"]]])
        }
    }
    if(rightJSON["elements"]["edges"] == null){
        finalJSON["production"]["right"]["subgraph"][right_line++] = [];
    }else{
        for (var i = 0; i < rightJSON["elements"]["edges"].length; i++) {
            finalJSON["production"]["right"]["subgraph"][right_line++] = ([rightJSON["elements"]["edges"][i]["group"], [rightJSON["elements"]["edges"][i]["data"]], [rightJSON["elements"]["edges"][i]["position"]]])
        }
    }

    // finalJSON = JSON.stringify(finalJSON);
    return finalJSON;
}

function exportGraph(){
    saveGraph();
    var exportJSON = {productions};
    // exportJSON = exportJSON.toString();
    // exportJSON = '[' + exportJSON + ']';
    // exportJSON = JSON.stringify(exportJSON);
    var blob = new Blob([exportJSON], { type: "application/json;charset=utf-8" });
    console.log(exportJSON);
    saveAs(blob, "export.json");
}

function importGraph() {
    $("#file_import").trigger("click");
}
let importString;
function readImport() {
    const selectedFile = document.getElementById('file_import').files[0];
    const reader = new FileReader();
    reader.onload = function (evt) {
        var output = evt.target.result;
        $("[id*='dropdown_pro']").remove();
        // for(var i =0; i<productions.length; i++){
        //     $("[id*='dropdown_pro']").remove();
        // }
        console.log(output);
        outputJSON = JSON.parse(output);
        productions = outputJSON["productions"];
        generateGraph(productions[0]);
        for(var i =0; i<productions.length; i++){
            var newButton = document.createElement("BUTTON");
            newButton.setAttribute('onclick', 'deactivate();currentProduction = ' + i + ';document.getElementById("dropdown_pro" + currentProduction).setAttribute("class", "");generateGraph(productions[' + i + ']);activate()')
            newButton.setAttribute('id', 'dropdown_pro' + i);
            newButton.setAttribute('class', "");
            var text = document.createTextNode('Production ' + (i+1))
            newButton.appendChild(text);
            var newPro = document.getElementById("dropdown_newPro")
            newPro.before(newButton);
        }
        currentProduction = 0;
        activate();
    };
    reader.readAsText(selectedFile);
}

function generateGraph(str) {
    var newJSON = JSON.parse(str);
    var directionStatus = newJSON["production"]["directionStatus"];

    if (directionStatus == "Directed") {
        newDirected("left");
        newDirected("right");
    } else {
        newUndirected("left");
        newUndirected("right")
    }

    var cyLeft = newJSON["production"]["left"];
    var cyRight = newJSON["production"]["right"];
    for (var i =0; i<cyLeft["subgraph"].length;i++) {
        if (cyLeft["subgraph"][i][0] == "nodes") {
            if(cyLeft["subgraph"][i][1][0]["type"]== "ellipse"){
                _addVertexLeft(cyLeft["subgraph"][i][1][0]["id"], cyLeft["subgraph"][i][1][0]["label"], cyLeft["subgraph"][i][2][0]["x"], cyLeft["subgraph"][i][2][0]["y"]);
            }
            else{
                _addDEdgeLeft(cyLeft["subgraph"][i][1][0]["id"], cyLeft["subgraph"][i][1][0]["label"], cyLeft["subgraph"][i][2][0]["x"], cyLeft["subgraph"][i][2][0]["y"]);
            }
            
        } else if(cyLeft["subgraph"][i][0] == "edges"){
            // console.log(cyLeft["subgraph"][i][1][0][""]);
            _addEdgeLeft(cyLeft["subgraph"][i][1][0]["id"], cyLeft["subgraph"][i][1][0]["label"], cyLeft["subgraph"][i][1][0]["source"], cyLeft["subgraph"][i][1][0]["target"]);
        }

    }
    var line = 0;
    for (var i =0; i<cyRight["subgraph"].length;i++) {
        if (cyRight["subgraph"][i][0] == "nodes") {
            if(cyRight["subgraph"][i][1][0]["type"]== "ellipse"){
                _addVertexRight(cyRight["subgraph"][i][1][0]["id"], cyRight["subgraph"][i][1][0]["label"], cyRight["subgraph"][i][2][0]["x"], cyRight["subgraph"][i][2][0]["y"]);
            }
            else{
                _addDEdgeRight(cyRight["subgraph"][i][1][0]["id"], cyRight["subgraph"][i][1][0]["label"], cyRight["subgraph"][i][2][0]["x"], cyRight["subgraph"][i][2][0]["y"]);
            }
        } else if(cyRight["subgraph"][i][0] == "edges"){
            // console.log(cyRight["subgraph"][i][1][0][""]);
            _addEdgeRight(cyRight["subgraph"][i][1][0]["id"], cyRight["subgraph"][i][1][0]["label"], cyRight["subgraph"][i][1][0]["source"], cyRight["subgraph"][i][1][0]["target"])
        }
    }
    cy_left.center();
    cy_right.center();
}

function stringToJSON(str){
    return JSON.parse(str);
}

function verifyProductions(){ // Verifies if each production follows rules.
    saveGraph();
    var JSONProductions = [];
    for(var i = 0;i < productions.length; i++){ //makes the string productions into objects
        var tmp = stringToJSON(productions[i]);
        JSONProductions.push(tmp);
    }
    var initialProd = [];
    for(var i = 0; i < JSONProductions.length; i++){ 
        if(JSONProductions[i]["production"]["left"]["subgraph"].length == 0 || JSONProductions[i]["production"]["right"]["subgraph"].length == 0){ //checks if any graph is empty.
            console.log("Production " + (i+1) + " has one or two empty graphs");
            return false;
        }
        // if(JSONProductions[i]["production"]["left"]["subgraph"].length == 1){ //checks if there is only one graph with one vertex
        //     initialProd.push(i);
        //     if(initialProd.length > 1){
        //         console.log("There can not be more than one production with one vertex.");
        //         return false;
        //     }
        // }
        if(JSONProductions[i]["production"]["left"]["subgraph"].length > JSONProductions[i]["production"]["right"]["subgraph"].length){
            console.log("Production " + (i+1) + "'s left side is larger than its right."); //may need some refining. Needs to check for vertex
            return false;
        }
        
    }


    console.log("All tests passed.");
    return true;
}

function exportGML(){
    saveGraph();
    var exportJSON = productions[currentProduction];
    exportJSON = JSON.parse(exportJSON);
    exportNodesLeft = [];
    exportEdgesLeft = [];
    exportNodesRight = [];
    exportEdgesRight = [];
    for(var i =0; i<exportJSON["production"]["left"]["subgraph"].length; i++){
        if(exportJSON["production"]["left"]["subgraph"][i][0]=="nodes" && exportJSON["production"]["left"]["subgraph"][i][1][0]["type"]=="ellipse"){
            exportNodesLeft.push("\t\t\t\tnode [ id " + exportJSON["production"]["left"]["subgraph"][i][1][0]["_id"] + " label " + exportJSON["production"]["left"]["subgraph"][i][1][0]["label"] + " ] \n");
        }
        // if(exportJSON["production"]["left"]["subgraph"][i][0]=="nodes" && exportJSON["production"]["left"]["subgraph"][i][1][0]["type"]=="round-tag"){
        //     exportEdgesLeft.push("\t\t\t\tedge [ id " + exportJSON["production"]["left"]["subgraph"][i][1][0]["id"][1] + " label " + exportJSON["production"]["left"]["subgraph"][i][1][0]["label"] + " ] \n");
        // }
        if(exportJSON["production"]["left"]["subgraph"][i][0]=="edges"){
            if(exportJSON["production"]["left"]["subgraph"][i][1][0]["source"][0]=="d"){
                exportEdgesLeft.push("\t\t\t\tedge [ id " + exportJSON["production"]["left"]["subgraph"][i][1][0]["_id"] + " target " + exportJSON["production"]["left"]["subgraph"][i][1][0]["target"] + " ] \n");
            }
            else if (exportJSON["production"]["left"]["subgraph"][i][1][0]["target"][0]=="d"){
                exportEdgesLeft.push("\t\t\t\tedge [ id " + exportJSON["production"]["left"]["subgraph"][i][1][0]["_id"] + " source " + exportJSON["production"]["left"]["subgraph"][i][1][0]["source"] + " ] \n");
            }
            else {
                exportEdgesLeft.push("\t\t\t\tedge [ id " + exportJSON["production"]["left"]["subgraph"][i][1][0]["_id"] + " source " + exportJSON["production"]["left"]["subgraph"][i][1][0]["source"] + " target " + exportJSON["production"]["left"]["subgraph"][i][1][0]["target"] + " ] \n");
            }
        }
    }

    for(var i =0; i<exportJSON["production"]["right"]["subgraph"].length; i++){
        if(exportJSON["production"]["right"]["subgraph"][i][0]=="nodes"  && exportJSON["production"]["right"]["subgraph"][i][1][0]["type"]=="ellipse"){
            exportNodesRight.push("\t\t\t\tnode [ id " + exportJSON["production"]["right"]["subgraph"][i][1][0]["_id"] + " label " + exportJSON["production"]["right"]["subgraph"][i][1][0]["label"] + " ] \n");
        }
        if(exportJSON["production"]["right"]["subgraph"][i][1][0]["source"][0]=="d"){
            exportEdgesRight.push("\t\t\t\tedge [ id " + exportJSON["production"]["right"]["subgraph"][i][1][0]["_id"] + " target " + exportJSON["production"]["right"]["subgraph"][i][1][0]["target"] + " ] \n");
        }
        else if (exportJSON["production"]["right"]["subgraph"][i][1][0]["target"][0]=="d"){
            exportEdgesRight.push("\t\t\t\tedge [ id " + exportJSON["production"]["right"]["subgraph"][i][1][0]["_id"] + " source " + exportJSON["production"]["right"]["subgraph"][i][1][0]["source"] + " ] \n");
        }
        else {
            exportEdgesRight.push("\t\t\t\tedge [ id " + exportJSON["production"]["right"]["subgraph"][i][1][0]["_id"] + " source " + exportJSON["production"]["right"]["subgraph"][i][1][0]["source"] + " target " + exportJSON["production"]["right"]["subgraph"][i][1][0]["target"] + " ] \n");
        }
    }

    finalGML = "production [\n" +
        "\tproductionID " + exportJSON["production"]["productionID"] + "\n" +
        "\tdirectionStatus " + exportJSON["production"]["directionStatus"] + "\n" +
        "\n" +
        "\t\tleft [\n" +
            "\t\t\tsubgraph [\n"
    for(var i=0; i<exportNodesLeft.length; i++){
        finalGML+= exportNodesLeft[i];
    }
    finalGML+= "\n";
    for(var i=0; i<exportEdgesLeft.length; i++){
        finalGML+= exportEdgesLeft[i];
    }
    finalGML+= "\t\t\t]\n" + "\t\t]\n" + "\n" + "\t\tright [\n" + "\t\t\tsubgraph [\n";
    for(var i=0; i<exportNodesRight.length; i++){
        finalGML+= exportNodesRight[i];
    }
    finalGML+= "\n";
    for(var i=0; i<exportEdgesRight.length; i++){
        finalGML+= exportEdgesRight[i];
    }

    finalGML+= "\t\t\t]\n" + "\t\t]\n" + "\t]\n" + "]\n";

    // return finalGML;
    var blob = new Blob([finalGML], { type: "application/gml;charset=utf-8" });
    console.log(finalGML);
    saveAs(blob, "export.gml");

}

function deleteProduction(){
    if(currentProduction == 0) return null;
    productions.splice(currentProduction, 1);
    $("[id*='dropdown_pro" + currentProduction + "']").remove();
    generateGraph(productions[productions.length-1]);
    currentProduction = productions.length-1;
    activate();
}