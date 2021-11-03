var left_vID;
var right_vID;
var left_eID;
var right_eID, left_dvID, right_dvID;
function addVertexLeft() {

    var eles = cy_left.add([
        { group: 'nodes', data: { label:"", id: left_vID++, type: "ellipse", _id: left_vID-1}, position: { x: 100, y: 100 } }
    ]);

}

function _addVertexLeft(id, label, newX, newY) {
    var eles = cy_left.add([
        { group: 'nodes', data: { label: label, id: id, type: "ellipse", _id: id}, position: { x: newX, y: newY } }
    ]);
    left_vID++;
}
function addVertexRight() {

    var eles = cy_right.add([
        { group: 'nodes', data: { label:"", id: right_vID++, type: "ellipse", _id: right_vID-1}, position: { x: 100, y: 100 } }
    ]);

}
function _addVertexRight(id, label, newX, newY) {
    var eles = cy_right.add([
        { group: 'nodes', data: { label: label, id: id, type: "ellipse", _id: id}, position: { x: newX, y: newY } }
    ]);
    right_vID++;
}

function addDEdgeLeft() {

    var eles = cy_left.add([
        { group: 'nodes', data: { label: '', id: 'dv' + left_dvID++, type: "round-tag", _id: left_dvID-1}, position: { x: 100, y: 100 } }
    ]);

}

function _addDEdgeLeft(id, label, newX, newY) {
    var eles = cy_left.add([
        { group: 'nodes', data: { label: label, id: id, type: "round-tag", _id: id}, position: { x: newX, y: newY } }
    ]);
    left_dvID++;
}
function addDEdgeRight() {

    var eles = cy_right.add([
        { group: 'nodes', data: { label: '', id: 'dv' + right_dvID++, type: "round-tag", _id: right_dvID-1}, position: { x: 100, y: 100 } }
    ]);

}
function _addDEdgeRight(id, label, newX, newY) {
    var eles = cy_right.add([
        { group: 'nodes', data: { label: label, id: id, type: "round-tag", _id: id}, position: { x: newX, y: newY } }
    ]);
    right_dvID++;
}



function addEdgeLeft() {
    var node1, node2;
    cy_left.on('tap', 'node', function (evt) {
        var node = evt.target;
        if (node1 == null) {
            node1 = node.id();
        }
        else {
            node2 = node.id();
        }
        if (node1 != null && node2 != null) {
            var eles = cy_left.add([
                { group: 'edges', data: { label: '', id:'e' +left_eID++, source: node1, target: node2, _id: left_eID-1 } }
            ]);
            node1 = null;
            node2 = null;
            cy_left.removeListener('tap');
        }
    });
}

function addEdgeRight() {
    var node1, node2;
    cy_right.on('tap', 'node', function (evt) {
        var node = evt.target;
        if (node1 == null) {
            node1 = node.id();
        }
        else {
            node2 = node.id();
        }
        if (node1 != null && node2 != null) {
            var eles = cy_right.add([
                { group: 'edges', data: { label: '', id:'e' + right_eID++, source: node1, target: node2, _id: right_eID-1 } }
            ]);
            node1 = null;
            node2 = null;
            cy_right.removeListener('tap');
        }
    });
}


function _addEdgeRight(id, label, node1, node2){
    var eles = cy_right.add([
        { group: 'edges', data: { label: label, id: id, source: node1, target: node2 } }
    ]);
    right_eID++;
}

function _addEdgeLeft(id, label, node1, node2){
    var eles = cy_left.add([
        { group: 'edges', data: { label: label, id: id, source: node1, target: node2 } }
    ]);
    left_eID++;
}

function deleteLeft() {
    cy_left.on('tap', 'node', function (evt) {
        var node = evt.target;
        if (node != null) {
            cy_left.remove(node);
            cy_left.removeListener('tap');
        }
    });
    cy_left.on('tap', 'edge', function (evt) {
        var edge = evt.target;
        if (edge != null) {
            cy_left.remove(edge);
            cy_left.removeListener('tap');
        }
    });
}

function deleteRight() {
    cy_right.on('tap', 'node', function (evt) {
        var node = evt.target;
        if (node != null) {
            cy_right.remove(node);
            cy_right.removeListener('tap');
        }
    });
    cy_right.on('tap', 'edge', function (evt) {
        var edge = evt.target;
        if (edge != null) {
            cy_right.remove(edge);
            cy_right.removeListener('tap');
        }
    });
}

function nodeListener() {
    var tmp = "";
    cy_left.removeAllListeners();
    cy_right.removeAllListeners();
    cy_left.on('taphold', 'node', function(event){
        var node = event.target;
        console.log(node.data("id")!=node.data("label"))
        if(node.data("id")!=node.data("label")){
            tmp = node.data("label");
            node.data("label",node.data("id"));
        }
        else{
            node.data("label", tmp);
        }
    })
    cy_right.on('taphold', 'node', function(event){
        var node = event.target;
        console.log(node.data("id")!=node.data("label"))
        if(node.data("id")!=node.data("label")){
            tmp = node.data("label");
            node.data("label",node.data("id"));
        }
        else{
            node.data("label", tmp);
        }
    })
    
}


function _newDirected(direction) { // USED FOR BUTTON
    // cy.destroy();
    productions = [];
    setCurrentProduction(0);
    $("[id*='dropdown_pro']").remove();
    left_vID = 1;
    right_vID = 1;
    left_dvID = 1;
    right_dvID = 1;
    left_eID = 1;
    right_eID = 1;
    if(direction=="left"){
        con = document.getElementById('cy_left');
        cy_left = cytoscape({

            container: con, // container to render in
        
            elements: [],
        
            style: [ // the stylesheet for the graph
                {
                    selector: 'node',
                    style: {
                        'background-color': '#666',
                        'label': 'data(label)',
                        'shape': 'data(type)'
                    }
                },
        
                {
                    selector: 'edge',
                    style: {
                        'width': 3,
                        'line-color': '#ccc',
                        'target-arrow-color': '#ccc',
                        'target-arrow-shape': 'triangle', //difference between the two graphs
                        'curve-style': 'bezier',
                        'label': 'data(label)'
                    }
                }
            ],
        
            layout: {
                name: 'grid',
                rows: 1
            }
        
        });
    }else{
        con = document.getElementById('cy_right');
        cy_right = cytoscape({

            container: con, // container to render in
        
            elements: [],
        
            style: [ // the stylesheet for the graph
                {
                    selector: 'node',
                    style: {
                        'background-color': '#666',
                        'label': 'data(label)',
                        'shape': 'data(type)'
                    }
                },
        
                {
                    selector: 'edge',
                    style: {
                        'width': 3,
                        'line-color': '#ccc',
                        'target-arrow-color': '#ccc',
                        'target-arrow-shape': 'triangle', //difference between the two graphs
                        'curve-style': 'bezier',
                        'label': 'data(label)'
                    }
                }
            ],
        
            layout: {
                name: 'grid',
                rows: 1
            }
        
        });
    }
    addProduction();
}

function newDirected(direction) { // creates new cytoscape for directed graphs
    // cy.destroy();
    left_vID = 1;
    right_vID = 1;
    left_dvID = 1;
    right_dvID = 1;
    left_eID = 1;
    right_eID = 1;
    if(direction=="left"){
        con = document.getElementById('cy_left');
        cy_left = cytoscape({

            container: con, // container to render in
        
            elements: [],
        
            style: [ // the stylesheet for the graph
                {
                    selector: 'node',
                    style: {
                        'background-color': '#666',
                        'label': 'data(label)',
                        'shape': 'data(type)'
                    }
                },
        
                {
                    selector: 'edge',
                    style: {
                        'width': 3,
                        'line-color': '#ccc',
                        'target-arrow-color': '#ccc',
                        'target-arrow-shape': 'triangle', //difference between the two graphs
                        'curve-style': 'bezier',
                        'label': 'data(label)'
                    }
                }
            ],
        
            layout: {
                name: 'grid',
                rows: 1
            }
        
        });
    }else{
        con = document.getElementById('cy_right');
        cy_right = cytoscape({

            container: con, // container to render in
        
            elements: [],
        
            style: [ // the stylesheet for the graph
                {
                    selector: 'node',
                    style: {
                        'background-color': '#666',
                        'label': 'data(label)',
                        'shape': 'data(type)'
                    }
                },
        
                {
                    selector: 'edge',
                    style: {
                        'width': 3,
                        'line-color': '#ccc',
                        'target-arrow-color': '#ccc',
                        'target-arrow-shape': 'triangle', //difference between the two graphs
                        'curve-style': 'bezier',
                        'label': 'data(label)'
                    }
                }
            ],
        
            layout: {
                name: 'grid',
                rows: 1
            }
        
        });
    }
    
}

function _newUndirected(direction) { // creates new cytoscape for undirected graphs
    productions = [];
    currentProduction = 0;
    $("[id*='dropdown_pro']").remove();
    vID = 1;
    eID = 1;
    if(direction=="left"){
        con = document.getElementById('cy_left');
        cy_left = cytoscape({

            container: con, // container to render in
        
            elements: [],
        
            style: [ // the stylesheet for the graph
                {
                    selector: 'node',
                    style: {
                        'background-color': '#666',
                        'label': 'data(label)',
                        'shape': 'data(type)'
                    }
                },
        
                {
                    selector: 'edge',
                    style: {
                        'width': 3,
                        'line-color': '#ccc',
                        'target-arrow-color': '#ccc',
                        'target-arrow-shape': 'none', //difference between the two graphs
                        'curve-style': 'bezier',
                        'label': 'data(label)'
                    }
                }
            ],
        
            layout: {
                name: 'grid',
                rows: 1
            }
        
        });
    }else{
        con = document.getElementById('cy_right');
        cy_right = cytoscape({

            container: con, // container to render in
        
            elements: [],
        
            style: [ // the stylesheet for the graph
                {
                    selector: 'node',
                    style: {
                        'background-color': '#666',
                        'label': 'data(label)',
                        'shape': 'data(type)'
                    }
                },
        
                {
                    selector: 'edge',
                    style: {
                        'width': 3,
                        'line-color': '#ccc',
                        'target-arrow-color': '#ccc',
                        'target-arrow-shape': 'none', //difference between the two graphs
                        'curve-style': 'bezier',
                        'label': 'data(label)'
                    }
                }
            ],
        
            layout: {
                name: 'grid',
                rows: 1
            }
        
        });
    }
    addProduction();
    
}

function newUndirected(direction) { // creates new cytoscape for undirected graphs
    vID = 1;
    eID = 1;
    if(direction=="left"){
        con = document.getElementById('cy_left');
        cy_left = cytoscape({

            container: con, // container to render in
        
            elements: [],
        
            style: [ // the stylesheet for the graph
                {
                    selector: 'node',
                    style: {
                        'background-color': '#666',
                        'label': 'data(label)',
                        'shape': 'data(type)'
                    }
                },
        
                {
                    selector: 'edge',
                    style: {
                        'width': 3,
                        'line-color': '#ccc',
                        'target-arrow-color': '#ccc',
                        'target-arrow-shape': 'none', //difference between the two graphs
                        'curve-style': 'bezier',
                        'label': 'data(label)'
                    }
                }
            ],
        
            layout: {
                name: 'grid',
                rows: 1
            }
        
        });
    }else{
        con = document.getElementById('cy_right');
        cy_right = cytoscape({

            container: con, // container to render in
        
            elements: [],
        
            style: [ // the stylesheet for the graph
                {
                    selector: 'node',
                    style: {
                        'background-color': '#666',
                        'label': 'data(label)',
                        'shape': 'data(type)'
                    }
                },
        
                {
                    selector: 'edge',
                    style: {
                        'width': 3,
                        'line-color': '#ccc',
                        'target-arrow-color': '#ccc',
                        'target-arrow-shape': 'none', //difference between the two graphs
                        'curve-style': 'bezier',
                        'label': 'data(label)'
                    }
                }
            ],
        
            layout: {
                name: 'grid',
                rows: 1
            }
        
        });
    }
    
}


