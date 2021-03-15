import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Sommet } from "../../model/sommet.model";

import * as go from 'gojs';
const $ = go.GraphObject.make;  // for conciseness in defining templates

@Component({
  selector: 'app-minimale',
  templateUrl: './minimale.component.html',
  styleUrls: ['./minimale.component.scss']
})
export class MinimaleComponent implements OnInit {

  tab = new Array();
  nRightClicks = 0;

  data: any = {
    "class": "go.GraphLinksModel",
    "nodeKeyProperty": "id",
    "nodeDataArray": [
      { text: "x1", id: -1, loc: "-446 -46" },

      { text: "x2", id: -2, loc: "-314 -101" },

      { text: "x3", id: -3, loc: "-217 87" },

      { text: "x4", id: -4, loc: "-210 -178" },

      { text: "x5", id: -5, loc: "-25 -204" },

      { text: "x6", id: -6, loc: "-71 70" },

      { text: "x7", id: -7, loc: "20 -75" },

      { text: "x8", id: -8, loc: "176 -69" },

      { text: "x9", id: -9, loc: "110 -169" },

      { text: "x10", id: -10, loc: "275 -170" },

      { text: "x11", id: -11, loc: "79 74" },

      { text: "x12", id: -12, loc: "392 -150" },

      { text: "x13", id: -13, loc: "279 115" },

      { text: "x14", id: -14, loc: "551 55" },

      { text: "x15", id: -15, loc: "534 -112" },

      { text: "x16", id: -16, loc: "630 -45" },

      /*
        { text: "x1", id: -1, loc: "-338 -17", color: "white" },
        { text: "x2", loc: "-211 -96", id: -2, color: "white" },
        { text: "x3", loc: "-213 16", id: -3, color: "white" },
        { text: "x4", loc: "-112 79", id: -4, color: "white" },
        { text: "x5", loc: "-13 16", id: -5, color: "white" },
        { text: "x6", loc: "129 -61", id: -6, color: "white" },*/
    ],
    "linkDataArray": [

      { from: -1, to: -2, text: "10" },
      { from: -2, to: -3, text: "15" },
      { from: -2, to: -4, text: "8" },
      { from: -4, to: -3, text: "8" },
      { from: -3, to: -6, text: "1" },
      { from: -4, to: -5, text: "6" },
      { from: -6, to: -5, text: "5" },
      { from: -6, to: -7, text: "4" },
      { from: -5, to: -9, text: "1" },
      { from: -7, to: -8, text: "1" },

      // { from: -8, to: -7, text: "1" },

      { from: -9, to: -8, text: "3" },

      { from: -8, to: -10, text: "2" },

      { from: -9, to: -10, text: "4" },

      { from: -3, to: -11, text: "16" },

      { from: -7, to: -11, text: "8" },

      { from: -10, to: -12, text: "7" },

      { from: -11, to: -12, text: "6" },

      { from: -11, to: -13, text: "12" },

      { from: -13, to: -14, text: "3" },

      { from: -12, to: -15, text: "9" },

      { from: -15, to: -16, text: "6" },

      { from: -14, to: -16, text: "3" },

      { from: -15, to: -14, text: "5" }
      /*
            { from: -1, to: -2, text: "20", points: Array(8) },
            { from: -1, to: -3, text: "5", points: Array(8) },
            { from: -3, to: -4, text: "1", points: Array(8) },
            { from: -3, to: -5, text: "4", points: Array(8) },
            { from: -5, to: -6, text: "1", points: Array(8) },
            { from: -4, to: -5, points: Array(8), text: "3" },
            { from: -2, to: -6, points: Array(8), text: "4" },
      */
    ]
  }

  diagram: go.Diagram = null;

  @Input()
  model: go.Model;

  @Output()
  nodeClicked = new EventEmitter();


  data_in_diagrame: any = [];
  /*
    x16: Sommet;
    x15: Sommet;
    x14: Sommet;
    x13: Sommet;
    x12: Sommet;
    x11: Sommet;
    x10: Sommet;
    x9: Sommet;
    x8: Sommet;
    x7: Sommet;
    x6: Sommet;
    x5: Sommet;
    x4: Sommet;
    x3: Sommet;
    x2: Sommet;
    x1: Sommet;
  */


  constructor() {/*
    this.x16 = new Sommet(0, 15);
    this.x16.addIndex_succ(0); this.x16.addArc(0);

    this.x14 = new Sommet(0, 13);
    this.x14.addIndex_succ(15); this.x14.addArc(3);

    this.x15 = new Sommet(0, 14);
    this.x15.addIndex_succ(13); this.x15.addArc(5);
    this.x15.addIndex_succ(15); this.x15.addArc(6);

    this.x13 = new Sommet(0, 12);
    this.x13.addIndex_succ(13); this.x13.addArc(3);

    this.x12 = new Sommet(0, 11);
    this.x12.addIndex_succ(14); this.x12.addArc(9);

    this.x11 = new Sommet(0, 10);
    this.x11.addIndex_succ(11); this.x11.addArc(6);
    this.x11.addIndex_succ(12); this.x11.addArc(12);

    this.x10 = new Sommet(0, 9);
    this.x10.addIndex_succ(11); this.x10.addArc(7);

    this.x9 = new Sommet(0, 8);
    this.x9.addIndex_succ(7); this.x9.addArc(3);
    this.x9.addIndex_succ(9); this.x9.addArc(4);

    this.x8 = new Sommet(0, 7);
    this.x8.addIndex_succ(9); this.x8.addArc(2);

    this.x7 = new Sommet(0, 6);
    this.x7.addIndex_succ(7); this.x7.addArc(1);
    this.x7.addIndex_succ(10); this.x7.addArc(8);

    this.x6 = new Sommet(0, 5);
    this.x6.addIndex_succ(4); this.x6.addArc(5);
    this.x6.addIndex_succ(6); this.x6.addArc(4);

    this.x5 = new Sommet(0, 4);
    this.x5.addIndex_succ(8); this.x5.addArc(1);

    this.x4 = new Sommet(0, 3);
    this.x4.addIndex_succ(2); this.x4.addArc(8);
    this.x4.addIndex_succ(4); this.x4.addArc(6);

    this.x3 = new Sommet(0, 2);
    this.x3.addIndex_succ(5); this.x3.addArc(1);
    this.x3.addIndex_succ(10); this.x3.addArc(16);

    this.x2 = new Sommet(0, 1);
    this.x2.addIndex_succ(2); this.x2.addArc(15);
    this.x2.addIndex_succ(3); this.x2.addArc(8);

    this.x1 = new Sommet(0, 0);
    this.x1.addIndex_succ(1); this.x1.addArc(10);


    this.tab.push(this.x1);
    this.tab.push(this.x2);
    this.tab.push(this.x3);
    this.tab.push(this.x4);
    this.tab.push(this.x5);
    this.tab.push(this.x6);
    this.tab.push(this.x7);
    this.tab.push(this.x8);
    this.tab.push(this.x9);
    this.tab.push(this.x10);
    this.tab.push(this.x11);
    this.tab.push(this.x12);
    this.tab.push(this.x13);
    this.tab.push(this.x14);
    this.tab.push(this.x15);
    this.tab.push(this.x16);*/
  }

  ngOnInit(): void {
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
        $(go.Shape, "Circle",
          new go.Binding("fill", "color"),
          roundedRectangleParams,
          new go.Binding("fill", "color").ofModel(),  // meaning a property of Model.modelData
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


    // start all nodes yellow
    this.diagram.model.modelData.color = "yellow";


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
        $(go.Shape,
          new go.Binding("stroke", "color"),  // shape.stroke = data.color // the link shape
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

  maxFord(tab) {
    let current: number = 0;
    let compte: number = 0;
    let next: number;
    let sub: number;
    let pos_i: number;
    let pos_j: number;
    let demitour: boolean = false;
    while (compte < tab.length - 1) {
      if (demitour) {
        current = pos_i;
      } else {
        pos_i = tab[current].getPosi();
      }
      for (let sous_cp = 0; sous_cp < tab[current].getIndex_succ().length; sous_cp++) {
        let res: number;
        //next = Integer.parseInt(tab.get(current).getIndex_succ().get(sous_cp).toString());
        pos_j = parseInt(tab[current].getIndex_succ()[sous_cp]);
        sub = tab[pos_j].getLambda() - tab[current].getLambda();
        if (pos_i < pos_j) {
          if (sub < parseInt(tab[current].getArc()[sous_cp])) {
            res = tab[current].getLambda() + parseInt(tab[current].getArc()[sous_cp]);
            tab[pos_j].setLambda(res);
            console.log("*******************IF****************");
            console.log("I : " + pos_i);
            console.log("J  : " + pos_j);
            console.log(tab[current].getLambda() + " + " + tab[current].getArc()[sous_cp] + " = " + res);
            demitour = false;
          }
        }
        else {
          if (sub > parseInt(tab[current].getArc()[sous_cp]) || sub == parseInt(tab[current].getArc()[sous_cp])) {
            console.log("****************NOTHING*******************");
            demitour = false;
          } else {
            res = tab[current].getLambda() + parseInt(tab[current].getArc()[sous_cp]);
            tab[pos_j].setLambda(res);
            pos_i = pos_j;
            demitour = true;

            console.log("*************ELSE**********************");
            console.log("I : " + pos_i);
            console.log("J  : " + pos_j);
            console.log(tab[current].getLambda() + " + " + tab[current].getArc()[sous_cp] + " = " + res);
            compte = pos_i - 1;
            break;
          }
        }
      }
      compte++;
      current++;
    }
    console.log("lambda farany ", tab);

  }

  algoFusion() {
    let tab = new Array();
    let taillelink: number = this.data_in_diagrame.linkDataArray.length;
    let tailleNode: number = this.data_in_diagrame.nodeDataArray.length;
    let sommet: Sommet;
    let trouve: boolean = false;
    for (let i = 0; i < tailleNode; i++) {
      trouve = false;
      //sommet = new Sommet(Infinity, (this.data_in_diagrame.linkDataArray[i].from * (-1)) - 2);4
      if (i == 0) {
        sommet = new Sommet(0, 0);
      } else {
        sommet = new Sommet(0, i);
      }
      console.log(sommet);
      for (let j = 0; j < taillelink; j++) {
        if ((this.data_in_diagrame.nodeDataArray[i].id * (-1)) == (this.data_in_diagrame.linkDataArray[j].from * (-1))) {
          // console.log("To= ", (this.data_in_diagrame.linkDataArray[j].to * (-1)) - 2);     
          sommet.addIndex_succ((this.data_in_diagrame.linkDataArray[j].to * (-1)) - 1);
          sommet.addArc(parseInt(this.data_in_diagrame.linkDataArray[j].text));
          trouve = true;
        }
        //console.log(this.data_in_diagrame.linkDataArray[j].from * (-1));
      }
      tab.push(sommet);
    }
    console.log(tab);
    this.maxFord(tab);
    this.findPath(tab);
  }

  findPath(tab) {
    let taille: number = tab.length - 1;
    let lambda_current: number;
    let lambda_last: number;
    let res_: number;
    let i: number = taille;
    let lalana_miverina = new Array();
    //lambda_last = tab[i].getLambda();

    for (i; i >= 0; i--) {
      lambda_current = tab[i].getLambda();
      for (let j = 0; j < this.data_in_diagrame.linkDataArray.length; j++) {
        //lambda_current = lambda_last;
        if ((i + 1) == ((this.data_in_diagrame.linkDataArray[j].to * (-1)))) {
          console.log("%c ity : " + this.data_in_diagrame.linkDataArray[j].from * (-1) + " makaty " + (i + 1), 'background : yellow;');
          res_ = lambda_current - parseInt(this.data_in_diagrame.linkDataArray[j].text);
          if (res_ == tab[((this.data_in_diagrame.linkDataArray[j].from * (-1)) - 1)].getLambda()) {
            lalana_miverina.push({ to: this.data_in_diagrame.linkDataArray[j].from * (-1), from: (i + 1) });
            console.log(" %c asina couleur ny arc " + this.data_in_diagrame.linkDataArray[j].from * (-1) + " to " + (i + 1), 'background: green; color: #bada55');
            // lambda_last = tab[((this.data_in_diagrame.linkDataArray[j].from * (-1)) - 1)].getLambda();
          } else {
            console.log("%c tsy lalana", 'background: red;');
            //lambda_last = lambda_current;
          }
        }

      }
    }
    //this.coloriage(lalana_miverina);
    this.treatNoEnd(lalana_miverina);
  }

  treatNoEnd(lalana_miverina) {
    console.log(lalana_miverina);
    console.log("triage");
    let lalana_ = new Array();
    let from: number;
    let to: number;
    to = lalana_miverina[0].from; //16
    from = lalana_miverina[0].to; //14
    for (let i = 0; i < lalana_miverina.length; i++) {
      //console.log(to);          
      for (let j = 0; j < lalana_miverina.length; j++) {
        if (from == lalana_miverina[j].from) {
          //console.log("%c nampiditra ity : " + from + "  makary : " + to, 'background: green;');
          lalana_.push({ to: from, from: to });
          //console.log("%c " + from, 'background: red;');
          from = lalana_miverina[j].to;
          to = lalana_miverina[j].from;
          if (from == 1) {
            lalana_.push({ to: from, from: to });
          }
        }
      }
    }
    this.coloriage(lalana_);
  }

  /*findPath(tab) {
    let taille: number = tab.length;
    let lambda: number;
    let lambda_first: number;
    let res_: number;
    let i: number = taille - 1;
    let k: number;
    let demitour: boolean = false;
    let last_sommet_visited: Sommet;
    let last_sommet: Sommet;
    let lalana_miverina = new Array();
    console.log(" ");
    console.log(" %c+++++ calcule recule commance +++++", 'background: #222; color: #bada55');
    lambda_first = tab[i].getLambda();
    last_sommet = tab[i];
    for (i; i >= 0; i--) {
      //console.log("lambda de " + i + " = " + tab[i].getLambda());             
      lambda = lambda_first;
      last_sommet_visited = last_sommet;
      for (let j = 0; j < this.data_in_diagrame.linkDataArray.length; j++) {
       // console.log("%c indice tab " + i, 'background: pink; color: white');
        if ((i + 1) == this.data_in_diagrame.linkDataArray[j].to * (-1)) {
          console.log("%c  from : " + (this.data_in_diagrame.linkDataArray[j].from * (-1) - 1) + " to : " + (i + 1), 'background: blue; color: #bada55');
          res_ = lambda - parseInt(this.data_in_diagrame.linkDataArray[j].text);
          //console.log("resultat : " + res_ + " == " + tab[this.data_in_diagrame.linkDataArray[j].from * (-1) - 1].getLambda());
          console.log("%c  from : " + (this.data_in_diagrame.linkDataArray[j].from * (-1) - 1) + " to : " + (i + 1), 'background: blue; color: #bada55');
            if (res_ == tab[this.data_in_diagrame.linkDataArray[j].from * (-1) - 1].getLambda()) {
              lambda_first = tab[this.data_in_diagrame.linkDataArray[j].from * (-1) - 1].getLambda();
              lalana_miverina.push({ to: this.data_in_diagrame.linkDataArray[j].from * (-1), from: (i + 1) });
              console.log(" %c asina couleur ny arc " + this.data_in_diagrame.linkDataArray[j].from * (-1) + " to " + (i + 1), 'background: green; color: #bada55');
              //console.log("lambda de " + i + " = " + tab[i].getLambda());
              console.log("************************");
            } else {
              console.log("tsy lalana");
            }
        }
      }
      //console.log("+++++++++ tour =  " + i + " +++++");
      console.log(" ");
      //console.log("tour : " + i);
      last_sommet = tab[i];
    }
    console.log(lalana_miverina);
    // this.delNoTo(lalana_miverina);
    this.coloriage(lalana_miverina);
  }*/

  delNoTo(lalana_miverina) {
    let tabFiltre = new Array();
    let trouve: boolean = false;
    let fin: number = lalana_miverina[0].from;
    lalana_miverina.push({ to: fin, from: 0 });
    for (let i = 0; i < lalana_miverina.length; i++) {
      trouve = false;
      for (let j = 0; j < lalana_miverina.length; j++) {
        if (lalana_miverina[i].from == lalana_miverina[j].to) {
          trouve = true;
        }
        if (trouve) {
          tabFiltre.push(lalana_miverina[i]);
          break;
        }
      }
    }
    console.log(tabFiltre);
    // this.coloriage(tabFiltre);
  }

  coloriage(lalana_miverina) {
    console.log(lalana_miverina);

    for (let i = 0; i < lalana_miverina.length; i++) {

      var data = this.diagram.model.findNodeDataForKey("" + lalana_miverina[i].to * (-1));
      // This will NOT change the color of the "Delta" Node
      console.log("data", data);
      if (data !== null) this.diagram.model.setDataProperty(data, "color", "green");

      var data = this.diagram.model.findNodeDataForKey("" + lalana_miverina[i].from * (-1));
      // This will NOT change the color of the "Delta" Node
      console.log("data", data);
      if (data !== null) this.diagram.model.setDataProperty(data, "color", "green");

      //change color arc
      for (let j = 0; j < this.data.linkDataArray.length; j++) {
        console.log(lalana_miverina[i].from + " " + this.data.linkDataArray[j].from);
        if (lalana_miverina[i].to == (this.data.linkDataArray[j].from * (-1)) && lalana_miverina[i].from == (this.data.linkDataArray[j].to * (-1))) {
          this.diagram.model.setDataProperty(this.data.linkDataArray[j], "progress", "true");
          /* this.diagram.model.commit(function (m) {
            m.set(m.linkDataArray[j], "color", "green");
          });*/

          // console.log("lalan");
        } else {
          // console.log("tsy lalan");

        }

      }
    }
    console.log("lalana miverina" + lalana_miverina);
  }




}
