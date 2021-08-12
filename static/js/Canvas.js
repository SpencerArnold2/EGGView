function dropdown() {
    document.getElementById("myDropdown").classList.toggle("show");
}

window.onclick = function (event) {
    if (!event.target.matches('.dropbtn')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}

function addText() {
    document.getElementById("label-input").className = "show-text";
    var newLabel;
    cy.on('tap', 'node', function (evt) {
        var node = evt.target;
        newLabel = document.getElementById("label-input").value;
        node.data("label", newLabel);
        cy.removeListener('tap');
        document.getElementById("label-input").className = "hidden-input";
    });
    cy.on('tap', 'edge', function (evt) {
        var edge = evt.target;
        newLabel = document.getElementById("label-input").value;
        edge.data("label", newLabel);
        cy.removeListener('tap');
        document.getElementById("label-input").className = "hidden-input";
    });
}

function exportGraph() {
    var baseJSON = cy.json();
    var productionID = "1"; //tmp
    var directionStatus = "";
    if (baseJSON["style"][1]["style"]["target-arrow-shape"] == "triangle") directionStatus = "Directed";
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
    var line = 0;
    for (var i = 0; i < baseJSON["elements"]["nodes"].length; i++) {
        finalJSON["production"]["right"]["subgraph"][line++] = ([baseJSON["elements"]["nodes"][i]["group"], [baseJSON["elements"]["nodes"][i]["data"]], [baseJSON["elements"]["nodes"][i]["position"]]])
    }
    for (var i = 0; i < baseJSON["elements"]["edges"].length; i++) {
        finalJSON["production"]["right"]["subgraph"][line++] = ([baseJSON["elements"]["edges"][i]["group"], [baseJSON["elements"]["edges"][i]["data"]]])
    }

    finalJSON = JSON.stringify(finalJSON);
    var blob = new Blob([finalJSON], { type: "application/json;charset=utf-8" });
    console.log(finalJSON)
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
        generateGraph(output);
    };
    reader.readAsText(selectedFile);
}

function generateGraph(str) {
    var newJSON = JSON.parse(str);
    console.log(newJSON);
    var directionStatus = newJSON["production"]["directionStatus"];

    if (directionStatus == "Directed") {
        newDirected();
    } else {
        newUndirected();
    }

    var cyLeft = newJSON["production"]["left"];
    var cyRight = newJSON["production"]["right"];
    var line = 0;
    for (var i =0; i<cyRight["subgraph"].length;i++) {
        if (cyRight["subgraph"][i][0] == "nodes") {
            addVertex(cyRight["subgraph"][i][1][0]["id"], cyRight["subgraph"][i][1][0]["label"], cyRight["subgraph"][i][2][0]["x"], cyRight["subgraph"][i][2][0]["y"]);
        } else {
            // console.log(cyRight["subgraph"][i][1][0][""]);
            addEdge(cyRight["subgraph"][i][1][0]["id"], cyRight["subgraph"][i][1][0]["label"], cyRight["subgraph"][i][1][0]["source"], cyRight["subgraph"][i][1][0]["target"])
            console.log("test")
        }

    }

}

