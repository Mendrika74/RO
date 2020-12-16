import { Component, OnInit , EventEmitter, Input, Output} from '@angular/core';

import * as go from 'gojs';

const $ = go.GraphObject.make;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ford';

  nodeDataArray = [
              { key: "A", loc: "0 60" , color: "red"},
              { key: "B", loc: "100 15" },
              { key: "C", loc: "200 0" },
              { key: "D", loc: "200 30" },
              { key: "E", loc: "100 90" },
              { key: "F", loc: "200 60" },
              { key: "G", loc: "200 90" },
              { key: "H", loc: "200 120" }
            ];
  linkDataArray = [
              { from: "A", to: "B" },
              { from: "B", to: "C" },
              { from: "B", to: "D" },
              { from: "A", to: "E" },
              { from: "E", to: "F" },
              { from: "E", to: "G" },
              { from: "E", to: "H" }
            ];

  
  diagram: go.Diagram = null;

  @Input()
  model: go.Model;

  @Output()
  nodeClicked = new EventEmitter();


  constructor() {
  }

  ngOnInit(){

  }

   ngAfterViewInit() {

    this.diagram = $(go.Diagram, 'myDiagramDiv',
      {
        layout:
          $(go.TreeLayout,
            {
              isOngoing: true,
              treeStyle: go.TreeLayout.StyleLastParents,
              arrangement: go.TreeLayout.ArrangementHorizontal,
              // properties for most of the tree:
             // angle: 90,
              layerSpacing: 100,
              // properties for the "last parents":
              //alternateAngle: 90,
              //alternateLayerSpacing: 35,
              //alternateAlignment: go.TreeLayout.AlignmentBus,
              //alternateNodeSpacing: 20
            }),
        'undoManager.isEnabled': true
      }
    );

     this.diagram.layout = $(go.TreeLayout);

       // the node template describes how each Node should be constructed
      this.diagram.nodeTemplate =
        $(go.Node, "Horizontale",
          { selectionAdorned: false },
          $(go.Panel, "Auto",
          // the Shape automatically fits around the TextBlock
          $(go.Shape, "Ellipse",
            {fill: null},  
            // use this kind of figure for the Shape
            // bind Shape.fill to Node.data.color
            new go.Binding("fill", "color")),
          $(go.TextBlock,
            { margin: 3 },  // some room around the text
            // bind TextBlock.text to Node.data.key
            new go.Binding("text", "key")
            )
        ),
        {
          click: function(e, obj) { 
            document.getElementById("changeMethodsMsg").textContent = "Clicked on " + obj.part.data.key; 
          },
          selectionChanged: function(part) {
            var shape = part.elt(0);
            shape.fill = part.isSelected ? "red" : "white";
          }
        }
      );

      // the Model holds only the essential information describing the diagram
      this.diagram.model = new go.GraphLinksModel(this.nodeDataArray,this.linkDataArray);

      // enable Ctrl-Z to undo and Ctrl-Y to redo
      this.diagram.undoManager.isEnabled = true;
  }

  newTache(){
    this.nodeDataArray.push({ key: "I", loc: "300 120" });
    this.linkDataArray.push({ from: "H", to: "I" });
    this.diagram.model = new go.GraphLinksModel(this.nodeDataArray,this.linkDataArray);
  }

}
