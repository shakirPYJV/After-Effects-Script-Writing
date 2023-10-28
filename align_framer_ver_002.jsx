function centerSelectedLayers() {
    var comp = app.project.activeItem; // Get the active composition
    if (comp && comp instanceof CompItem && comp.selectedLayers.length > 0) {
        var compWidth = comp.width;
        var compHeight = comp.height;
        app.beginUndoGroup("Center Selected Layers");
        try {
            for (var i = 0; i < comp.selectedLayers.length; i++) {
                var layer = comp.selectedLayers[i];
                var xPos = (compWidth / 2);
                var yPos = (compHeight / 2);
                layer.property("Transform").property("Position").setValue([xPos, yPos]);
            }
        } catch (e) {
            // Handle any potential errors
            alert("An error occurred: " + e.toString());
        } finally {
            app.endUndoGroup();
        }
    } else {
        alert("No active composition or no layers selected.");
    }
}

function createOneFrameAdjustmentLayer() {
    var comp = app.project.activeItem; // Get the active composition
    if (comp && comp instanceof CompItem) {
        app.beginUndoGroup("1frameAdj");
	var currentTime = comp.time;
        var newLayer = comp.layers.addSolid([1, 1, 1], "Adjustment Layer", comp.width, comp.height, 1, 1);
        newLayer.adjustmentLayer = true;
        newLayer.startTime = currentTime;
        newLayer.outPoint = currentTime + comp.frameDuration;
	app.endUndoGroup();
    } else {
        alert("No active composition");
    }
}



function buildUI(thisObj) {
    var myPanel = (thisObj instanceof Panel) ? thisObj : new Window("palette", "Shakir's Script", undefined, { resizeable: true, closeButton: false });

    var lay =
        "group{orientation:'column', " +
        "centerButton: Button{text:'Center',size:[40, 40]}, " +
        "adjustmentButton: Button{text:'Adj',size:[40, 40]} " +
        "}";

    myPanel.grp = myPanel.add(lay);

    myPanel.grp.centerButton.onClick = function () {
        centerSelectedLayers();
    };

    myPanel.grp.adjustmentButton.onClick = function () {
        createOneFrameAdjustmentLayer();
    };

    myPanel.layout.layout(true);

    return myPanel;
}

var inst = buildUI(this);

if (inst != null && inst instanceof Window) {
    inst.center();
    inst.show();
}
