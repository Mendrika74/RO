import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Sommet } from "../../model/sommet.model";

import * as go from 'gojs';

const $ = go.GraphObject.make;

@Component({
  selector: 'app-maximale',
  templateUrl: './maximale.component.html',
  styleUrls: ['./maximale.component.scss']
})
export class MaximaleComponent implements OnInit {
  tab = new Array();
  nRightClicks = 0;

  data: any = {
    "class": "go.GraphLinksModel",
    "nodeKeyProperty": "id",
    "nodeDataArray": [


      { id: -1, loc: "-163.75 8.25", category: "Start" },
      { id: -2, loc: "382.5 -7.5", category: "End" },
      { text: "a", id: -3, loc: "1.25 30.5" },
      { text: "b", loc: "66.25 -63.25", id: -4 },
      { text: "c", loc: "55 101.75", id: -5 },
      { text: "d", loc: "118.75 35.5", id: -6 },
      //Manuel
      /* { "id": -1, "loc": "155 -138", "category": "Start" },
      { "id": 0, "loc": "190 15", "text": "A" },
      { "id": 1, "loc": "375 0.75", "text": "B" },
      { "id": 2, "loc": "353 166", "text": "D" },
      { "id": 3, "loc": "143.5 170", "text": "C" },
      { "id": -2, "loc": "182.5 152.5", "category": "End" },*/
    ],
    "linkDataArray": [
      { from: -1, to: -3, points: Array(8), text: "10" },
      { from: -3, to: -4, text: "9", points: Array(8) },
      { from: -3, to: -5, text: "5", points: Array(8) },
      { from: -3, to: -6, text: "3", points: Array(8) },
      { from: -6, to: -2, points: Array(8), text: "6" },
      { from: -5, to: -2, points: Array(8), text: "1" },
      { from: -4, to: -6, points: Array(8), text: "2" },
        { from: -6, to: -5, points: Array(8), text: "8" }
      //Manuel
      /* { "from": -1, "to": 0, "text": "10" },
       { "from": 0, "to": 1, "progress": "true", "text": "9" },
       { "from": 0, "to": 2, "progress": "true", "text": "3" },
       { "from": 1, "to": 2, "progress": "true", "text": "2" },
       { "from": 0, "to": 3, "progress": "true", "text": "5" },
       { "from": 3, "to": -2, "progress": "true", "text": "1" },
       { "from": 2, "to": -2, "progress": "true", "text": "6" },*/
    ]
  }


  diagram: go.Diagram = null;

  @Input()
  model: go.Model;

  @Output()
  nodeClicked = new EventEmitter();


  data_in_diagrame: any = [];

  constructor() {
  }

  ngOnInit() {

  }

  ngAfterViewInit() {
    var roundedRectangleParams = {
      parameter1: 2,  // set the rounded corner
      spot1: go.Spot.TopLeft, spot2: go.Spot.BottomRight  // make content go all the way to inside edges of rounded corners
    };

    this.diagram =
      $(go.Diagram, "myDiagramDive",  // must name or refer to the DIV HTML element
        {
          "animationManager.initialAnimationStyle": go.AnimationManager.None,
          "InitialAnimationStarting": function (e) {
            var animation = e.subject.defaultAnimation;
            animation.easing = go.Animation.EaseOutExpo;
            animation.duration = 900;
            animation.add(e.diagram, 'scale', 0.1, 1);
            animation.add(e.diagram, 'opacity', 0, 1);
          },

          // have mouse wheel events zoom in and out instead of scroll up and down
          "toolManager.mouseWheelBehavior": go.ToolManager.WheelZoom,
          // support double-click in background creating a new node
          "clickCreatingTool.archetypeNodeData": { text: "SOMMET" },
          // enable undo & redo
          "undoManager.isEnabled": true,
          positionComputation: function (diagram, pt) {
            return new go.Point(Math.floor(pt.x), Math.floor(pt.y));
          }
        });

    // when the document is modified, add a "*" to the title and enable the "Save" button
    this.diagram.addDiagramListener("Modified", function (e) {
      var idx = document.title.indexOf("*");/*
      if (this.diagram.isModified) {
        if (idx < 0) document.title += "*";
      } else {
        if (idx >= 0) document.title = document.title.substr(0, idx);
      }*/
    });

    // define the Node template
    this.diagram.nodeTemplate =
      $(go.Node, "Auto",
        {
          locationSpot: go.Spot.Top,
          isShadowed: true, shadowBlur: 1,
          shadowOffset: new go.Point(0, 1),
          shadowColor: "rgba(0, 0, 0, .14)"
        },
        new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
        // define the node's outer shape, which will surround the TextBlock
        $(go.Shape, "Circle", roundedRectangleParams,
          {
            name: "SHAPE", fill: "#ffffff", strokeWidth: 0,
            stroke: null,
            portId: "",  // this Shape is the Node's port, not the whole Node
            fromLinkable: true, fromLinkableSelfNode: true, fromLinkableDuplicates: true,
            toLinkable: true, toLinkableSelfNode: true, toLinkableDuplicates: true,
            cursor: "pointer"
          }),
        $(go.TextBlock,
          {
            font: "bold small-caps 11pt helvetica, bold arial, sans-serif", margin: 7, stroke: "rgba(0, 0, 0, .87)",
            editable: true  // editing the text automatically updates the model data
          },
          new go.Binding("text").makeTwoWay()),
        $("TreeExpanderButton",
          {
          // set the two additional properties used by "TreeExpanderButton"
          // that control the shape depending on the value of Node.isTreeExpanded
          "_treeExpandedFigure": "TriangleUp",
          "_treeCollapsedFigure": "TriangleDown",
          // set properties on the icon within the border
          "ButtonIcon.fill": "darkcyan",
          "ButtonIcon.strokeWidth": 0,
          // set general "Button" properties
          "ButtonBorder.figure": "Circle",
          "ButtonBorder.stroke": "darkcyan",
          "_buttonStrokeOver": "darkcyan"
        },
        { margin: new go.Margin(0, -6, -6, 0) },
        { alignment: go.Spot.Bottom, alignmentFocus: go.Spot.Top },

        { visible: true })
      );


    // unlike the normal selection Adornment, this one includes a Button
    this.diagram.nodeTemplate.selectionAdornmentTemplate =
      $(go.Adornment, "Spot",
        $(go.Panel, "Auto",
          $(go.Shape, "Circle", roundedRectangleParams,
            { fill: null, stroke: "#7986cb", strokeWidth: 3 }),
          $(go.Placeholder)  // a Placeholder sizes itself to the selected Node
        ),
        // the button to create a "next" node, at the top-right corner
        $("Button",
          {
            alignment: go.Spot.TopRight,
            click: addNodeAndLink  // this function is defined below
          },
          $(go.Shape, "PlusLine", { width: 6, height: 6 })
        ) // end button
      ); // end Adornment

    this.diagram.nodeTemplateMap.add("Start",
      $(go.Node, "Spot", { desiredSize: new go.Size(75, 75) },
        new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
        $(go.Shape, "Circle",
          {
            fill: "#52ce60", /* green */
            stroke: null,
            portId: "",
            fromLinkable: true, fromLinkableSelfNode: true, fromLinkableDuplicates: true,
            toLinkable: true, toLinkableSelfNode: true, toLinkableDuplicates: true,
            cursor: "pointer"
          }),
        $(go.TextBlock, "Start",
          {
            font: "bold 16pt helvetica, bold arial, sans-serif",
            stroke: "whitesmoke"
          })
      )
    );

    this.diagram.nodeTemplateMap.add("End",
      $(go.Node, "Spot", { desiredSize: new go.Size(75, 75) },
        new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
        $(go.Shape, "Circle",
          {
            fill: "maroon",
            stroke: null,
            portId: "",
            fromLinkable: true, fromLinkableSelfNode: true, fromLinkableDuplicates: true,
            toLinkable: true, toLinkableSelfNode: true, toLinkableDuplicates: true,
            cursor: "pointer"
          }),
        $(go.Shape, "Circle", { fill: null, desiredSize: new go.Size(65, 65), strokeWidth: 2, stroke: "whitesmoke" }),
        $(go.TextBlock, "End",
          {
            font: "bold 16pt helvetica, bold arial, sans-serif",
            stroke: "whitesmoke"
          })
      )
    );

    // clicking the button inserts a new node to the right of the selected node,
    // and adds a link to that new node
    function addNodeAndLink(e, obj) {
      var adornment = obj.part;
      var diagram = e.diagram;
      diagram.startTransaction("Add State");

      // get the node data for which the user clicked the button
      var fromNode = adornment.adornedPart;
      var fromData = fromNode.data;

      // create a new "State" data object, positioned off to the right of the adorned Node
      var toData = { text: "SOMMET ", loc: "32" };
      var p = fromNode.location.copy();

      p.x += 200;
      toData.loc = go.Point.stringify(p);  // the "loc" property is a string, not a Point object
      // add the new node data to the model
      var model = diagram.model;
      model.addNodeData(toData);

      // create a link data from the old node data to the new node data
      var linkdata = {
        from: model.getKeyForNodeData(fromData),  // or just: fromData.id
        to: model.getKeyForNodeData(toData),
        text: "distance"
      };
      // and add the link data to the model
      model.addLinkData(linkdata);

      // select the new Node
      var newnode = diagram.findNodeForData(toData);
      diagram.select(newnode);

      diagram.commitTransaction("Add State");

      // if the new node is off-screen, scroll the diagram to show the new node
      diagram.scrollToRect(newnode.actualBounds);
    }

    // replace the default Link template in the linkTemplateMap
    this.diagram.linkTemplate =
      $(go.Link,  // the whole link panel
        {
          curve: go.Link.Bezier,
          adjusting: go.Link.Stretch,
          reshapable: true, relinkableFrom: true, relinkableTo: true,
          toShortLength: 3
        },
        new go.Binding("points").makeTwoWay(),
        new go.Binding("curviness"),
        $(go.Shape,  // the link shape
          { strokeWidth: 1.5 },
          new go.Binding('stroke', 'progress', function (progress) {
            return progress ? "#52ce60" /* green */ : 'black';
          }),
          new go.Binding('strokeWidth', 'progress', function (progress) {
            return progress ? 2.5 : 1.5;
          })
        ),
        $(go.Shape,  // the arrowhead
          { toArrow: "standard", stroke: null },
          new go.Binding('fill', 'progress', function (progress) {
            return progress ? "#52ce60" /* green */ : 'black';
          })),
        $(go.Panel, "Auto",
          $(go.Shape,  // the label background, which becomes transparent around the edges
            {
              fill: $(go.Brush, "Radial",
                { 0: "rgb(245, 245, 245)", 0.7: "rgb(245, 245, 245)", 1: "rgba(245, 245, 245, 0)" }),
              stroke: null
            }),
          $(go.TextBlock, "distance",  // the label text
            {
              textAlign: "center",
              font: "9pt helvetica, arial, sans-serif",
              margin: 4,
              editable: true  // enable in-place editing
            },
            // editing the text automatically updates the model data
            new go.Binding("text").makeTwoWay())
        )
      );

 
    // read in the JSON data from the "mySavedModel" element
    this.load();
  }

  // Show the diagram's model in JSON format
  save() {
    // document.getElementById("mySavedModel").innerHTML = this.diagram.model.toJson();

    this.data_in_diagrame = JSON.parse(this.diagram.model.toJson());
    console.log(this.data_in_diagrame);
    var x = this.data_in_diagrame.linkDataArray.length;
    console.log(x * -1);

    //this.diagram.isModified = false;
  }
  load() {
    this.diagram.model = go.Model.fromJson(this.data);

    this.diagram.grid.visible = true;
  }

  createTab() {
    /*let from: number = 1;
    let taille: number = this.data_in_diagrame.linkDataArray.length;
    let sommet: Sommet;
    sommet = new Sommet(0, from - 1);
    sommet.addIndex_succ(this.data_in_diagrame.linkDataArray[0].to * (-1)); sommet.addArc(parseInt(this.data_in_diagrame.linkDataArray[0].text));
    this.tab.push(sommet);
    for (let i = 1; i < taille; i++) {
      from = this.data_in_diagrame.linkDataArray[i].from * (-1)
      sommet = new Sommet(70, from - 1);
      sommet.addIndex_succ((this.data_in_diagrame.linkDataArray[i].to * (-1)) - 1); sommet.addArc(parseInt(this.data_in_diagrame.linkDataArray[i].text));
      this.tab.push(sommet);
    }
    console.log(this.tab);*/

    let x6: Sommet;
    let x5: Sommet;
    let x4: Sommet;
    let x3: Sommet;
    let x2: Sommet;
    let x1: Sommet;


    x6 = new Sommet(Infinity, 5);
    x6.addIndex_succ(0); x6.addArc(0);


    x5 = new Sommet(Infinity, 4);
    x5.addIndex_succ(3); x5.addArc(8);
    x5.addIndex_succ(5); x5.addArc(6);

    x4 = new Sommet(Infinity, 3);
    x4.addIndex_succ(5); x4.addArc(20);

    x3 = new Sommet(Infinity, 2);
    x3.addIndex_succ(4); x3.addArc(2);

    x2 = new Sommet(Infinity, 1);
    x2.addIndex_succ(2); x2.addArc(9);
    x2.addIndex_succ(3); x2.addArc(5);
    x2.addIndex_succ(4); x2.addArc(3);

    x1 = new Sommet(0, 0);
    x1.addIndex_succ(1); x1.addArc(10);

    this.tab.push(x1);
    console.log(x2);
    this.tab.push(x2);
    this.tab.push(x3);
    this.tab.push(x4);
    this.tab.push(x5);
    this.tab.push(x6);
    this.minFord();
  }

  minFord() {
    let current: number = 0;
    let compte: number = 0;
    let next: number;
    let sub: number;
    let pos_i: number;
    let pos_j: number;
    let demitour: boolean = false;
    while (compte < this.tab.length - 1) {
     
      if (demitour) {
        current = pos_i;
      }else{
         pos_i = this.tab[current].getPosi();
      }
      for (let sous_cp = 0; sous_cp < this.tab[current].getIndex_succ().length; sous_cp++) {
        let res: number;
        //next = Integer.parseInt(tab.get(current).getIndex_succ().get(sous_cp).toString());
        pos_j = parseInt(this.tab[current].getIndex_succ()[sous_cp]);
        sub = this.tab[pos_j].getLambda() - this.tab[current].getLambda();
        console.log("Sub_before = " , this.tab[pos_j].getLambda());
        if (pos_i < pos_j) {
          if (sub > parseInt(this.tab[current].getArc()[sous_cp])) {
            res = this.tab[current].getLambda() + parseInt(this.tab[current].getArc()[sous_cp]);
            this.tab[pos_j].setLambda(res);
              console.log("Sub_after = " , this.tab[pos_i].getLambda());
            console.log("*******************IF****************");
            console.log("I : " + pos_i);
            console.log("J  : " + pos_j);
            console.log("Lamda "+pos_j+" = "+ this.tab[current].getLambda() + " + " + this.tab[current].getArc()[sous_cp] + " = " + res);
            demitour = false;
          }
        }
        else {
          if (sub <= parseInt(this.tab[current].getArc()[sous_cp])) {
            console.log("****************NOTHING*******************");
            demitour = false;
          } else {
            res = this.tab[current].getLambda() + parseInt(this.tab[current].getArc()[sous_cp]);
            this.tab[pos_j].setLambda(res);
            pos_i = pos_j;
            demitour = true;
            console.log("*************ELSE**********************");
            console.log("I : " + pos_i);
            console.log("J  : " + pos_j);
            console.log(this.tab[current].getLambda() + " + " + this.tab[current].getArc()[sous_cp] + " = " + res);
            compte = pos_i -1 ;
            break;
          }
        }
      }
      compte++;
      current++;
    }
  }




}
