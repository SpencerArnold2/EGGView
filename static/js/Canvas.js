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
    document.getElementById("label-input").className="show-text";
    var newLabel;
    cy.on('tap', 'node', function(evt){
        var node = evt.target;
        newLabel = document.getElementById("label-input").value;
        node.data("label", newLabel);
        cy.removeListener('tap');
        document.getElementById("label-input").className="hidden-input";
    });
    cy.on('tap', 'edge', function(evt){
        var edge = evt.target;
        newLabel = document.getElementById("label-input").value;
        edge.data("label", newLabel);
        cy.removeListener('tap');
        document.getElementById("label-input").className="hidden-input";
    });
}

function exportGraph(){
    var baseJSON = cy.json();
    var productionID = "1"; //tmp
    var directionStatus = "";
    if(baseJSON["style"][1]["style"]["target-arrow-shape"]=="triangle") directionStatus = "Directed";
    else directionStatus = "Undirected";
    var finalJSON = {
        "production":{
            "productionID":productionID,
            "directionStatus":directionStatus,

            "left":{
                "subgraph":{
                    
                }
            },

            "right":{
                "subgraph":{

                }
            }
        }
    }
    var line = 0;
    for(var i = 0; i < baseJSON["elements"]["nodes"].length; i++){
        finalJSON["production"]["right"]["subgraph"][line++]=([baseJSON["elements"]["nodes"][i]["group"], [baseJSON["elements"]["nodes"][i]["data"]]])
    }
    for(var i = 0; i < baseJSON["elements"]["edges"].length; i++){
        finalJSON["production"]["right"]["subgraph"][line++]=([baseJSON["elements"]["edges"][i]["group"], [baseJSON["elements"]["edges"][i]["data"]]])
    }
    
    console.log(finalJSON);
}

