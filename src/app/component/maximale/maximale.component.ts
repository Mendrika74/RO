import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';

import * as go from 'gojs';

const $ = go.GraphObject.make;

@Component({
  selector: 'app-maximale',
  templateUrl: './maximale.component.html',
  styleUrls: ['./maximale.component.scss']
})
export class MaximaleComponent implements OnInit {


  title = 'ford';

  nodeDataArray = [
    { key: "A", loc: "0 60", color: "red" },
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

  ngOnInit() {

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
            { fill: null },
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
          click: function (e, obj) {
            document.getElementById("changeMethodsMsg").textContent = "Clicked on " + obj.part.data.key;
          },
          selectionChanged: function (part) {
            var shape = part.elt(0);
            shape.fill = part.isSelected ? "red" : "white";
          }
        }
      );

    // the Model holds only the essential information describing the diagram
    this.diagram.model = new go.GraphLinksModel(this.nodeDataArray, this.linkDataArray);

    // enable Ctrl-Z to undo and Ctrl-Y to redo
    this.diagram.undoManager.isEnabled = true;
  }

  newTache() {
    this.nodeDataArray.push({ key: "I", loc: "300 120" });
    this.linkDataArray.push({ from: "H", to: "I" });
    this.diagram.model = new go.GraphLinksModel(this.nodeDataArray, this.linkDataArray);
  }





















  /*ngAfterViewInit() {
   this.diagram = $(go.Diagram, 'myDiagramDiv',
     {
       layout:
         $(go.TreeLayout,
           {
             isOngoing: true,
             treeStyle: go.TreeLayout.StyleLastParents,
             arrangement: go.TreeLayout.ArrangementHorizontal,
             // properties for most of the tree:
             angle: 90,
             layerSpacing: 35,
             // properties for the "last parents":
             alternateAngle: 90,
             alternateLayerSpacing: 35,
             alternateAlignment: go.TreeLayout.AlignmentBus,
             alternateNodeSpacing: 20
           }),
       'undoManager.isEnabled': true
     }
   );

   // define the Node template
   this.diagram.nodeTemplate =
     $(go.Node, 'Auto',
       // for sorting, have the Node.text be the data.name
       new go.Binding('text', 'name'),
       // bind the Part.layerName to control the Node's layer depending on whether it isSelected
       new go.Binding('layerName', 'isSelected', function(sel) { return sel ? 'Foreground' : ''; }).ofObject(),
       // define the node's outer shape
       $(go.Shape, 'Rectangle',
         {
           name: 'SHAPE', fill: 'lightblue', stroke: null,
           // set the port properties:
           portId: '', fromLinkable: true, toLinkable: true, cursor: 'pointer'
         },
         new go.Binding('fill', '', function(node) {
           // modify the fill based on the tree depth level
           const levelColors = ['#AC193D', '#2672EC', '#8C0095', '#5133AB',
             '#008299', '#D24726', '#008A00', '#094AB2'];
           let color = node.findObject('SHAPE').fill;
           const dia: go.Diagram = node.diagram;
           if (dia && dia.layout.network) {
             dia.layout.network.vertexes.each(function(v: go.TreeVertex) {
               if (v.node && v.node.key === node.data.key) {
                 const level: number = v.level % (levelColors.length);
                 color = levelColors[level];
               }
             });
           }
           return color;
         }).ofObject()
       ),
       $(go.Panel, 'Horizontal',
         $(go.Picture,
           {
             name: 'Picture',
             desiredSize: new go.Size(39, 50),
             margin: new go.Margin(6, 8, 6, 10)
           },
           new go.Binding('source', 'key', function(key) {
             if (key < 0 || key > 16) return ''; // There are only 16 images on the server
             return 'assets/HS' + key + '.png';
           })
         ),
         // define the panel where the text will appear
         $(go.Panel, 'Table',
           {
             maxSize: new go.Size(150, 999),
             margin: new go.Margin(6, 10, 0, 3),
             defaultAlignment: go.Spot.Left
           },
           $(go.RowColumnDefinition, { column: 2, width: 4 }),
           $(go.TextBlock, { font: '9pt  Segoe UI,sans-serif', stroke: 'white' },  // the name
             {
               row: 0, column: 0, columnSpan: 5,
               font: '12pt Segoe UI,sans-serif',
               editable: true, isMultiline: false,
               minSize: new go.Size(10, 16)
             },
             new go.Binding('text', 'name').makeTwoWay()),
           $(go.TextBlock, 'Title: ', { font: '9pt  Segoe UI,sans-serif', stroke: 'white' },
             { row: 1, column: 0 }),
           $(go.TextBlock, { font: '9pt  Segoe UI,sans-serif', stroke: 'white' },
             {
               row: 1, column: 1, columnSpan: 4,
               editable: true, isMultiline: false,
               minSize: new go.Size(10, 14),
               margin: new go.Margin(0, 0, 0, 3)
             },
             new go.Binding('text', 'title').makeTwoWay()),
           $(go.TextBlock, { font: '9pt  Segoe UI,sans-serif', stroke: 'white' },
             { row: 2, column: 0 },
             new go.Binding('text', 'key', function(v) { return 'ID: ' + v; })),
           $(go.TextBlock, { font: '9pt  Segoe UI,sans-serif', stroke: 'white' },
             { name: 'boss', row: 2, column: 3 }, // we include a name so we can access this TextBlock when deleting Nodes/Links
             new go.Binding('text', 'parent', function(v) { return 'Boss: ' + v; })),
           $(go.TextBlock, { font: '9pt  Segoe UI,sans-serif', stroke: 'white' },  // the comments
             {
               row: 3, column: 0, columnSpan: 5,
               font: 'italic 9pt sans-serif',
               wrap: go.TextBlock.WrapFit,
               editable: true,  // by default newlines are allowed
               minSize: new go.Size(10, 14)
             },
             new go.Binding('text', 'comments').makeTwoWay())
         )  // end Table Panel
       ) // end Horizontal Panel
     );  // end Node

   this.diagram.model = this.model;

   // when the selection changes, emit event to app-component updating the selected node
   this.diagram.addDiagramListener('ChangedSelection', (e) => {
     const node = this.diagram.selection.first();
     this.nodeClicked.emit(node);
   });
 }*/

}
