var vID;
var eID;
function addVertexTop() {

    var eles = cy.add([
        { group: 'nodes', data: { label: 'n' + vID, id: 'n' + vID++, }, position: { x: 100, y: 100 } }
    ]);

}

function addEdgeTop() {
    var node1, node2;
    cy.on('tap', 'node', function (evt) {
        var node = evt.target;
        if (node1 == null) {
            node1 = node.id();
        }
        else {
            node2 = node.id();
        }
        if (node1 != null && node2 != null) {
            var eles = cy.add([
                { group: 'edges', data: { label: '', id: 'e' + eID++, source: node1, target: node2 } }
            ]);
            node1 = null;
            node2 = null;
            cy.removeListener('tap');
        }
    });
}

function deleteTop() {
    cy.on('tap', 'node', function (evt) {
        var node = evt.target;
        if (node != null) {
            cy.remove(node);
            cy.removeListener('tap');
        }
    });
    cy.on('tap', 'edge', function (evt) {
        var edge = evt.target;
        if (edge != null) {
            cy.remove(edge);
            cy.removeListener('tap');
        }
    });
}


function newDirected() { // creates new cytoscape for directed graphs
    // cy.destroy();
    vID = 0;
    eID = 0;
    cy = cytoscape({

        container: document.getElementById('cy'), // container to render in
    
        elements: [],
    
        style: [ // the stylesheet for the graph
            {
                selector: 'node',
                style: {
                    'background-color': '#666',
                    'label': 'data(label)'
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

function newUndirected() { // creates new cytoscape for undirected graphs

    vID = 0;
    eID = 0;
    cy = cytoscape({

    container: document.getElementById('cy'), // container to render in

    elements: [],

    style: [ // the stylesheet for the graph
        {
            selector: 'node',
            style: {
                'background-color': '#666',
                'label': 'data(label)',
            }
        },

        {
            selector: 'edge',
            style: {
                'width': 3,
                'line-color': '#ccc',
                'target-arrow-color': '#ccc',
                'target-arrow-shape': 'none',
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



