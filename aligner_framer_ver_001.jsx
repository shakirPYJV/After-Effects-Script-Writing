(function () {
    var scriptName = "Aligner_Framer";

    var myPanel = new Window("palette", scriptName, undefined, {
        resizeable: true,
        dockable: true
    });

    var centerButton = myPanel.add("button", undefined, "Center");
    centerButton.size = [40, 40]; 
    centerButton.onClick = function () {
        centerSelectedLayer();
    };

    var adjLayerButton = myPanel.add("button", undefined, "Adj");
    adjLayerButton.size = [40, 40]; 
    adjLayerButton.onClick = function () {
        createAdjustmentLayer();
    };

     function centerSelectedLayer() {
        var comp = app.project.activeItem;
        if (comp && comp instanceof CompItem) {
            var selectedLayers = comp.selectedLayers;
            if (selectedLayers.length > 0) {
                var centerX = comp.width / 2;
                var centerY = comp.height / 2;
                var layer = selectedLayers[0];
                layer.property("Position").setValueAtTime(comp.time, [centerX, centerY]);
            }
        }
    }

    function createAdjustmentLayer() {
        var comp = app.project.activeItem;
        if (comp && comp instanceof CompItem) {
            var adjLayer = comp.layers.addSolid([1, 1, 1], "AdjLayer", comp.width, comp.height, 1);
            adjLayer.adjustmentLayer = true;
            adjLayer.startTime = comp.time;
            adjLayer.inPoint = comp.time;
            adjLayer.outPoint = comp.time + (1 / comp.frameDuration);
        }
    }

    myPanel.layout.layout(true);
    if (myPanel instanceof Window) {
        myPanel.show();
    } else {
        myPanel.layout.layout(true);
    }
})();
