ethereum.autoRefreshOnNetworkChange = false;
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