import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';

import * as go from 'gojs';

const $ = go.GraphObject.make;

import { TableauModel } from "./model/tableau.model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ford';

  //USE file:///D:/Dev/Documentation%20GOJS/GoJS/extensions/ParallelRoute.html

  nRightClicks = 0;

    nodeDataArray = [
      { key: 1, text: "x1", color: "lightblue", loc: " 60" },
      { key: 2, text: "x2", color: "orange", loc: "300 60" },
      { key: 3, text: "x3", color: "lightgreen", loc: "300 200" },
      { key: 4, text: "x4", color: "pink" ,loc: "0 60"},
      { key: 5, text: "x5", color: "green" ,loc: "0 60"},
      { key: 6, text: "x6", color: "lightblue" ,loc: "0 60"},
      { key: 7, text: "x7", color: "orange" ,loc: "0 60"},
      { key: 8, text: "x8", color: "lightgreen" ,loc: "0 60"},
      { key: 9, text: "x9", color: "pink" ,loc: "0 60"},
      { key: 10, text: "x10", color: "green" ,loc: "0 60"},
      { key: 11, text: "x11", color: "lightblue" ,loc: "0 60"},
      { key: 12, text: "x12", color: "orange" ,loc: "0 60"},
      { key: 13, text: "x13", color: "lightgreen" ,loc: "0 60"},
      { key: 14, text: "x14", color: "pink" ,loc: "0 60"},
      { key: 15, text: "x15", color: "green" ,loc: "0 60"},
      { key: 16, text: "x16", color: "green" ,loc: "0 60"}
    ];
    linkDataArray = [
      { from: 1, to: 2, color: "blue", text: "10" },
      { from: 2, to: 4, color: "red",text: "8" },
      { from: 2, to: 3, color: "green", text: "15" },
      { from: 3, to: 6, color: "purple", text: "1" },
      { from: 3, to: 11, color: "blue", text: "16" },
   //  { from: 4, to: 3, color: "red", text: "8" , },
      { from: 5, to: 9, color: "green", text: "1" },
      { from: 6, to: 5, color: "purple", text: "5" },
      { from: 6, to: 7, color: "blue", text: "4" },
      { from: 7, to: 8, color: "red",text: "1" },
      { from: 7, to: 11, color: "green", text: "8" },
      { from: 8, to: 7, color: "purple", text: "1" },
     /* { from: 8, to: 10, color: "blue", text: "2" },
      { from: 9, to: 8,  color: "red", text: "3" },
      { from: 9, to: 10, color: "green", text: "4" },
      { from: 10, to: 12, color: "purple", text: "7" },
      { from: 11, to: 12, color: "blue", text: "6" },
      { from: 11, to: 13, color: "red",text: "12" },
      { from: 12, to: 15, color: "green", text: "5" },
      { from: 13, to: 14, color: "purple", text: "3" },
      { from: 14, to: 16, color: "blue", text: "3" },
      { from: 15, to: 14, color: "red",text: "5" },
      { from: 15, to: 16, color: "red", text: "6" }*/
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


    this.diagram =
      $(go.Diagram, "myDiagramDiv",  // create a Diagram for the DIV HTML element
        {
          // allow double-click in background to create a new node
          "clickCreatingTool.archetypeNodeData": { text: "Node", color: "white" },

          // allow Ctrl-G to call groupSelection()
          "commandHandler.archetypeGroupData": { text: "Group", isGroup: true, color: "blue" },

          // enable undo & redo
          "undoManager.isEnabled": true,

           "layout": $(go.TreeLayout, // specify a Diagram.layout that arranges trees
                { angle: 90, layerSpacing: 35 })
        });

    // Define the appearance and behavior for Nodes:

    // First, define the shared context menu for all Nodes, Links, and Groups.

    // To simplify this code we define a function for creating a context menu button:
    function makeButton(text, action, visiblePredicate) {
      return $("ContextMenuButton",
        $(go.TextBlock, text),
        { click: action },
        // don't bother with binding GraphObject.visible if there's no predicate
        visiblePredicate ? new go.Binding("visible", "", function (o, e) { return o.diagram ? visiblePredicate(o, e) : false; }).ofObject() : {});
    }

    // a context menu is an Adornment with a bunch of buttons in them
    var partContextMenu =
      $("ContextMenu",
        // makeButton("Properties",
        //   function(e, obj) {  // OBJ is this Button
        //     var contextmenu = obj.part;  // the Button is in the context menu Adornment
        //     var part = contextmenu.adornedPart;  // the adornedPart is the Part that the context menu adorns
        //     // now can do something with PART, or with its data, or with the Adornment (the context menu)
        //     if (part instanceof go.Link) alert(linkInfo(part.data));
        //     else if (part instanceof go.Group) alert(groupInfo(contextmenu));
        //     else alert(nodeInfo(part.data));
        //   }),
        makeButton("Cut",
          function (e, obj) { e.diagram.commandHandler.cutSelection(); },
          function (o) { return o.diagram.commandHandler.canCutSelection(); }),
        makeButton("Copy",
          function (e, obj) { e.diagram.commandHandler.copySelection(); },
          function (o) { return o.diagram.commandHandler.canCopySelection(); }),
        makeButton("Paste",
          function (e, obj) { e.diagram.commandHandler.pasteSelection(e.diagram.toolManager.contextMenuTool.mouseDownPoint); },
          function (o) { return o.diagram.commandHandler.canPasteSelection(o.diagram.toolManager.contextMenuTool.mouseDownPoint); }),
        makeButton("Delete",
          function (e, obj) { e.diagram.commandHandler.deleteSelection(); },
          function (o) { return o.diagram.commandHandler.canDeleteSelection(); }),
        makeButton("Undo",
          function (e, obj) { e.diagram.commandHandler.undo(); },
          function (o) { return o.diagram.commandHandler.canUndo(); }),
        makeButton("Redo",
          function (e, obj) { e.diagram.commandHandler.redo(); },
          function (o) { return o.diagram.commandHandler.canRedo(); }),
        makeButton("Group",
          function (e, obj) { e.diagram.commandHandler.groupSelection(); },
          function (o) { return o.diagram.commandHandler.canGroupSelection(); }),
        makeButton("Ungroup",
          function (e, obj) { e.diagram.commandHandler.ungroupSelection(); },
          function (o) { return o.diagram.commandHandler.canUngroupSelection(); })
      );

    function nodeInfo(d) {  // Tooltip info for a node data object
      var str = "Node " + d.key + ": " + d.text + "\n";
      if (d.group)
        str += "member of " + d.group;
      else
        str += "top-level node";
      return str;
    }

    // These nodes have text surrounded by a rounded rectangle
    // whose fill color is bound to the node data.
    // The user can drag a node by dragging its TextBlock label.
    // Dragging from the Shape will start drawing a new link.


    this.diagram.nodeTemplate =
      $(go.Node, "Auto",
         new go.Binding("location", "loc", go.Point.parse),
       // { locationSpot: go.Spot.Center },
        $(go.Shape, "Ellipse",
          {
            fill: "white", // the default fill, if there is no data bound value
            portId: "", cursor: "pointer",  // the Shape is the port, not the whole Node
            // allow all kinds of links from and to this port
            fromLinkable: true, fromLinkableSelfNode: true, fromLinkableDuplicates: true,
            toLinkable: true, toLinkableSelfNode: true, toLinkableDuplicates: true
          },
          new go.Binding("fill", "color")),
        $(go.TextBlock,
          {
            font: "bold 14px sans-serif",
            stroke: '#333',
            margin: 6,  // make some extra space for the shape around the text
            isMultiline: false,  // don't allow newlines in text
            editable: true  // allow in-place editing by user
          },
          new go.Binding("text", "text").makeTwoWay()),  // the label shows the node data's text
        { // this tooltip Adornment is shared by all nodes
          toolTip:
            $("ToolTip",
              $(go.TextBlock, { margin: 4 },  // the tooltip shows the result of calling nodeInfo(data)
                new go.Binding("text", "", nodeInfo))
            ),
          // this context menu Adornment is shared by all nodes
          contextMenu: partContextMenu
        }
      );

    // Define the appearance and behavior for Links:

    function linkInfo(d) {  // Tooltip info for a link data object
      return "Link:\nfrom " + d.from + " to " + d.to;
    }

    // The link shape and arrowhead have their stroke brush data bound to the "color" property
    this.diagram.linkTemplate =
      $(go.Link,
        { curve: go.Link.Bezier },  // Bezier curve
        { toShortLength: 3, relinkableFrom: true, relinkableTo: true },  // allow the user to relink existing links
        $(go.Shape,
          { strokeWidth: 2 },
          new go.Binding("stroke", "color")),
        $(go.Shape,
          { toArrow: "Standard", stroke: null },
          new go.Binding("fill", "color")),
        { // this tooltip Adornment is shared by all links
          toolTip:
            $("ToolTip",
              $(go.TextBlock, { margin: 4 },  // the tooltip shows the result of calling linkInfo(data)
                new go.Binding("text", "", linkInfo))
            ),
          // the same context menu Adornment is shared by all links
          contextMenu: partContextMenu
        },
        $(go.TextBlock,                        // this is a Link label
          new go.Binding("text", "text"))
      );

    // Define the appearance and behavior for Groups:

    function groupInfo(adornment) {  // takes the tooltip or context menu, not a group node data object
      var g = adornment.adornedPart;  // get the Group that the tooltip adorns
      var mems = g.memberParts.count;
      var links = 0;
      g.memberParts.each(function (part) {
        if (part instanceof go.Link) links++;
      });
      return "Group " + g.data.key + ": " + g.data.text + "\n" + mems + " members including " + links + " links";
    }

    // Groups consist of a title in the color given by the group node data
    // above a translucent gray rectangle surrounding the member parts
    this.diagram.groupTemplate =
      $(go.Group, "Vertical",
        {
          selectionObjectName: "PANEL",  // selection handle goes around shape, not label
          ungroupable: true  // enable Ctrl-Shift-G to ungroup a selected Group
        },
        $(go.TextBlock,
          {
            //alignment: go.Spot.Right,
            font: "bold 19px sans-serif",
            isMultiline: false,  // don't allow newlines in text
            editable: true  // allow in-place editing by user
          },
          new go.Binding("text", "text").makeTwoWay(),
          new go.Binding("stroke", "color")),
        $(go.Panel, "Auto",
          { name: "PANEL" },
          $(go.Shape, "Rectangle",  // the rectangular shape around the members
            {
              fill: "rgba(128,128,128,0.2)", stroke: "gray", strokeWidth: 3,
              portId: "", cursor: "pointer",  // the Shape is the port, not the whole Node
              // allow all kinds of links from and to this port
              fromLinkable: true, fromLinkableSelfNode: true, fromLinkableDuplicates: true,
              toLinkable: true, toLinkableSelfNode: true, toLinkableDuplicates: true
            }),
          $(go.Placeholder, { margin: 10, background: "transparent" })  // represents where the members are
        ),
        { // this tooltip Adornment is shared by all groups
          toolTip:
            $("ToolTip",
              $(go.TextBlock, { margin: 4 },
                // bind to tooltip, not to Group.data, to allow access to Group properties
                new go.Binding("text", "", groupInfo).ofObject())
            ),
          // the same context menu Adornment is shared by all groups
          contextMenu: partContextMenu
        }
      );

    // Define the behavior for the Diagram background:

    function diagramInfo(model) {  // Tooltip info for the diagram's model
      return "Model:\n" + model.nodeDataArray.length + " nodes, " + model.linkDataArray.length + " links";
    }

    // provide a tooltip for the background of the Diagram, when not over any Part
    this.diagram.toolTip =
      $("ToolTip",
        $(go.TextBlock, { margin: 4 },
          new go.Binding("text", "", diagramInfo))
      );

    // provide a context menu for the background of the Diagram, when not over any Part
    this.diagram.contextMenu =
      $("ContextMenu",
        makeButton("Paste",
          function (e, obj) { e.diagram.commandHandler.pasteSelection(e.diagram.toolManager.contextMenuTool.mouseDownPoint); },
          function (o) { return o.diagram.commandHandler.canPasteSelection(o.diagram.toolManager.contextMenuTool.mouseDownPoint); }),
        makeButton("Undo",
          function (e, obj) { e.diagram.commandHandler.undo(); },
          function (o) { return o.diagram.commandHandler.canUndo(); }),
        makeButton("Redo",
          function (e, obj) { e.diagram.commandHandler.redo(); },
          function (o) { return o.diagram.commandHandler.canRedo(); })
      );

    // Create the Diagram's Model:
    /* var nodeDataArray = [
       { key: 1, text: "Alpha", color: "lightblue" },
       { key: 2, text: "Beta", color: "orange" },
       { key: 3, text: "Gamma", color: "lightgreen", group: 5 },
       { key: 4, text: "Delta", color: "pink", group: 5 },
       { key: 5, text: "Epsilon", color: "green", isGroup: true }
     ];
     var linkDataArray = [
       { from: 1, to: 2, color: "blue" },
       { from: 2, to: 2 },
       { from: 3, to: 4, color: "green" },
       { from: 3, to: 1, color: "purple" }
     ];*/

    this.diagram.model = new go.GraphLinksModel(this.nodeDataArray, this.linkDataArray);
    this.diagram.layout = $(go.TreeLayout);
  }

 algortithme(){
    let Data: TableauModel [] = [];
    let valDeltaIJ = [];
    console.log(valDeltaIJ);

    this.linkDataArray.forEach((element, index) => {
     if(index == 0) {
     //Data.push(new TableauModel(element.from, element.to, Infinity, 0, Infinity-0, Number(element.text) , 0+(Number(element.text))));
      //let j = "d"+element.to;
      //let i = "d"+element.from;
      //valDeltaIJ.push({j: Infinity , i: 0});
     }else{
      //  Data.push(new TableauModel(element.from,element.to,Data[index-1],0,Data[index-1]-0, Number(element.text) , 0+(Number(element.text))));
     }
       //Data.push(new TableauModel(element.from,element.to,("f"+element.to),("f"+element.from),("f"+element.to)-("f"+element.from), Number(element.text) , ("f"+element.from)+(Number(element.text))));
       //valDeltaIJ.push({"f"+element.to: "f"+element.to ; "f"+element.from : "f"+element.from})
    });

    //console.log("Data = " , Data);

    console.log(valDeltaIJ);
  }

  algo(){

    let Data: TableauModel [] = [];
    let i = 1, j =2;
    let lamdai = 0;
    let lamdaj = 0;

    for(;i<16;i++){
      
    }
  }



}
