var cy = cytoscape({

  container: document.getElementById('cy'), // container to render in

  elements: [ // list of graph elements to start with
    // { // node a
    //   data: { id: 'a' }
    // },
    // { // node b
    //   data: { id: 'b' }
    // },
    // { // edge ab
    //   data: { id: 'ab', source: 'a', target: 'b' }
    // }
  ],

  style: [ // the stylesheet for the graph
    {
      selector: 'node',
      style: {
        'background-color': '#666',
        'label': 'data(id)'
      }
    },

    {
      selector: 'edge',
      style: {
        'width': 3,
        'line-color': '#ccc',
        'target-arrow-color': '#ccc',
        'target-arrow-shape': 'triangle',
        'curve-style': 'bezier'
      }
    }
  ],

  layout: {
    name: 'grid',
    rows: 1
  }

});
var vID =0;
var eID =0;

function addVertexTop(){

  var eles = cy.add([
    { group: 'nodes', data: { id: 'n' + vID++ }, position: { x: 100, y: 100 } }
  ]);

}

function addEdgeTop(){
  var node1, node2;
  cy.on('tap', 'node', function(evt){
    var node = evt.target;
    if(node1==null){
      node1 = node.id();
    }
    else{
      node2 = node.id();
    }
    if(node1 != null && node2 != null){
      var eles = cy.add([
        { group: 'edges', data: { source: node1, target: node2 } }
      ]);
      node1 = null;
      node2 = null;
      cy.removeListener('tap');
    }
  });
}

function deleteTop(){
  cy.on('tap', 'node', function(evt){
    var node = evt.target;
    if(node!=null){
      cy.remove(node);
      cy.removeListener('tap');
    }
  });
  cy.on('tap', 'edge', function(evt){
    var edge = evt.target;
    if(edge!=null){
      cy.remove(edge);
      cy.removeListener('tap');
    }
  });
}
