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
  // tab = new Array();
  tabFus = new Array();
  nRightClicks = 0;

  data: any = {
    "class": "go.GraphLinksModel",
    "nodeKeyProperty": "id",
    "nodeDataArray": [
  { text: "x1", id: -1, loc: "-446 -46" },
​​
 { text: "x2", id: -2, loc: "-314 -101" },
​​
 { text: "x3", id: -3, loc: "-217 87" },
​​
 { text: "x4", id: -4, loc: "-210 -178" },
​​
 { text: "x5", id: -5, loc: "-25 -204" },
​​
 { text: "x6", id: -6, loc: "-71 70" },
​​
 { text: "x7", id: -7, loc: "20 -75" },
​​
 { text: "x8", id: -8, loc: "176 -69" },
​​
 { text: "x9", id: -9, loc: "110 -169" },
​​
 { text: "x10", id: -10, loc: "275 -170" },
​​
 { text: "x11", id: -11, loc: "79 74" },
​​
 { text: "x12", id: -12, loc: "392 -150" },
​​
 { text: "x13", id: -13, loc: "279 115" },
​​
 { text: "x14", id: -14, loc: "551 55" },
​​
 { text: "x15", id: -15, loc: "534 -112" },
​​
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

 { from: -1, to: -2, text: "10"},
​​ { from: -2, to: -3, text: "15"},
​​ { from: -2, to: -4, text: "8"},
​​ { from: -4, to: -3, text: "8"},
​​ { from: -3, to: -6, text: "1"},
​​ { from: -4, to: -5, text: "6"},
​​ { from: -6, to: -5, text: "5"},
​​ { from: -6, to: -7, text: "4"},
​​ { from: -5, to: -9, text: "1"},
​​ { from: -7, to: -8, text: "1"},
​​
 { from: -8, to: -7, text: "1"},
​​
 { from: -9, to: -8, text: "3"},
​​
 { from: -8, to: -10, text: "2"},
​​
 { from: -9, to: -10, text: "4"},
​​
 { from: -6, to: -11, text: "16"},
​​
 { from: -7, to: -11, text: "8"},
​​
 { from: -10, to: -12, text: "7"},
​​
 { from: -11, to: -12, text: "6"},
​​
 { from: -11, to: -13, text: "12"},
​​
 { from: -13, to: -14, text: "3"},
​​
 { from: -12, to: -15, text: "9"},
​​
 { from: -15, to: -16, text: "6"},
​​
 { from: -14, to: -16, text: "3"},
​​
 { from: -15, to: -14, text: "5"}
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
        $(go.Shape, "Circle",
          new go.Binding("fill", "color"),
          roundedRectangleParams,
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
        {
          click: function (e, obj) { console.log("Clicked on " + obj.part.data.id); },
          selectionChanged: function (part) {
            var shape = part.elt(0);
            shape.fill = part.isSelected ? "#aa44bb" : "white";
          }
        },
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
      $(go.Node, "Spot", { desiredSize: new go.Size(100, 100) },
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
          new go.Binding("stroke", "color"),
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

    //ALL listener 

    this.diagram.addDiagramListener("ObjectSingleClicked",
      function (e) {
        var part = e.subject.part;
        if (!(part instanceof go.Link)) console.log("Clicked on :", part.data);
        console.log(e);
        // test(e.diagram, part.data);
      }
    );

    this.diagram.addModelChangedListener(function (evt) {
      // ignore unimportant Transaction events

      if (!evt.isTransactionFinished) return;
      var txn = evt.object;  // a Transaction
      if (txn === null) return;
      // iterate over all of the actual ChangedEvents of the Transaction
      txn.changes.each(function (e) {
        // record node insertions and removals
        if (e.change === go.ChangedEvent.Property) {
          if (e.modelChange === "linkFromKey") {
            console.log(evt.propertyName + " changed From key of link: " +
              e.object + " from: " + e.oldValue + " to: " + e.newValue);
          } else if (e.modelChange === "linkToKey") {
            console.log(evt.propertyName + " changed To key of link: " +
              e.object + " from: " + e.oldValue + " to: " + e.newValue);
          }
        } else if (e.change === go.ChangedEvent.Insert) {
             if(e.modelChange === "linkDataArray"){
                  console.log(evt.propertyName + " added link: ", e.newValue);
             }else{
                  console.log("ok");
             }
        } else if (e.change === go.ChangedEvent.Remove ) {
          if(e.modelChange === "linkDataArray"){
                 console.log(evt.propertyName + " removed link: ", e.oldValue);
              }else if(e.modelChange === "nodeDataArray"){
                  console.log("Node removed");
                  
         test(e, e.oldValue);
              }
          else{
            console.log("okok");
          }          //console.log(evt.propertyName + " removed link: ", e.oldValue);
         // console.log("okeoke");
         
        }
      }); 
    });
 


    // read in the JSON data from the "mySavedModel" element
    this.load();

    function test( evt, data){
      let nodeDataArray = JSON.parse(evt.model.toJson()).nodeDataArray;
      console.log("node Array: ", nodeDataArray);
      for(let i=0 ; i< nodeDataArray.length; i++){
        if((nodeDataArray[i].id*(-1)) > (data.id*(-1))){
          var data = evt.model.findNodeDataForKey(nodeDataArray[i].id);
          // This will NOT change the color of the "Delta" Node
          console.log("data", data);
          if (data !== null) evt.model.setDataProperty(data, "id",(nodeDataArray[i].id + 1));
        }else{
          console.log("Tsy ovaina");
        }
        
      }
    
    }
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




  createTab() {/*
    let from: number = 1;
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
    console.log(this.tab);
    /*
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
        console.log(this.tab);
    */
    //this.fusionner();
    //this.minFord();
  }

  minFord(tab) {
    let current: number = 0;
    let compte: number = 0;
    let next: number;
    let sub: number;
    let pos_i: number;
    let pos_j: number;
    let demitour: boolean = false;
    console.log("lengy = ", tab.length);

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
        console.log("Sub_before = ", tab[pos_j].getLambda());
        if (pos_i < pos_j) {
          if (sub > parseInt(tab[current].getArc()[sous_cp])) {
            res = tab[current].getLambda() + parseInt(tab[current].getArc()[sous_cp]);
            tab[pos_j].setLambda(res);
            console.log("Sub_after = ", tab[pos_i].getLambda());
            console.log("*******************IF****************");
            console.log("I : " + pos_i);
            console.log("J  : " + pos_j);
            console.log("Lamda " + pos_j + " = " + tab[current].getLambda() + " + " + tab[current].getArc()[sous_cp] + " = " + res);
            demitour = false;
          }
        }
        else {
          if (sub <= parseInt(tab[current].getArc()[sous_cp])) {
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
  }

  fusionner() {/*
    let from_current: number = null;
    let from_latest: number = null;
    let j: number = 0;
    for (let i = 0; i < this.tab.length; i++) {
      from_current = this.tab[i].posi_tache;
      console.log("from current " + from_current + "  from latest " + from_latest);
      if (from_current == from_latest) {
        if (this.tabFus[j] == null) {
          this.tabFus[j] = this.tab[i];
        } else {
          this.tabFus[j].addIndex_succ(this.tab[i].index_succ); this.tabFus[j].addArc(parseInt(this.tab[i].arc));
        }
      } else {
        this.tabFus[j] = this.tab[i];
        j++;
      }
      from_latest = from_current;
    }
    console.log(this.tabFus);*/

  }

  creating() {/*
    let taille: number = this.data_in_diagrame.linkDataArray.length;
    let from_current: number = null;
    let from_latest: number = null;
    let sommet: Sommet;
    let current_index: number = 0;
    for (let i = 0; i < taille; i++) {
      this.tab.push(sommet);
    }
    for (let i = 0; i < taille; i++) {
      from_current = this.data_in_diagrame.linkDataArray[i].from * (-1);
      if (from_current == from_latest) {
        console.log("to fusion");
        sommet = new Sommet(Infinity, this.data_in_diagrame.linkDataArray[i].from * (-1));
        this.tab.push(sommet);
        //this.tab[current_index].addIndex_succ(this.data_in_diagrame.linkDataArray[i].to * (-1));
        //this.tab[current_index].addArc(parseInt(this.data_in_diagrame.linkDataArray[i].text));
      } else {
        console.log("single");
        current_index++;
      }
      from_latest = from_current;
      console.log(this.tab);

      //console.log(this.data_in_diagrame.linkDataArray[i].from);
    }*/

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
        sommet = new Sommet(Infinity, i);
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
    this.minFord(tab);
    this.findPath(tab);
  }
  /*
    findPath(tab) {
  
      var data = this.diagram.model.findNodeDataForKey("-4");
      // This will NOT change the color of the "Delta" Node
      console.log("data", data);
       if (data !== null) this.diagram.model.setDataProperty(data, "color", "green");
  
      let taille: number = tab.length;
      let lambda: number;
      let lambda_j: number;
      let res_: number;
      let stop: boolean = false;
      let i: number = taille - 1;
      let lalana_miverina = new Array();
      console.log(" ");
      console.log(" %c+++++ calcule recule commance +++++", 'background: #222; color: #bada55');
      for (i; i >= 0; i--) {
        //console.log("lambda de " + i + " = " + tab[i].getLambda());
        for (let j = 0; j < this.data_in_diagrame.linkDataArray.length; j++) {
          if ((i + 1) == this.data_in_diagrame.linkDataArray[j].to * (-1)) {
            console.log("from : " + this.data_in_diagrame.linkDataArray[j].from * (-1) + " to " + (i + 1));
            lambda = tab[i].getLambda();
            res_ = lambda - parseInt(this.data_in_diagrame.linkDataArray[j].text);
            console.log("resultat : " + res_ + " == " + tab[this.data_in_diagrame.linkDataArray[j].from * (-1) - 1].getLambda());
            if (res_ == tab[this.data_in_diagrame.linkDataArray[j].from * (-1) - 1].getLambda() && j != 0) {
              lalana_miverina.push({ to: this.data_in_diagrame.linkDataArray[j].from * (-1), from: (i + 1) });
              console.log(" %casina couleur ny arc " + this.data_in_diagrame.linkDataArray[j].from * (-1) + " to " + (i + 1), 'background: green; color: #bada55');
              //console.log("lambda de " + i + " = " + tab[i].getLambda());
              console.log("************************");
  
            } else {
              console.log("tsy lalana");
            }
          }
        }
        console.log("+++++++++ tour =  " + i + " +++++");
        console.log(" ");
        //console.log("tour : " + i);
      }
      console.log(lalana_miverina);
      this.delNoTo(lalana_miverina);
    }*/

  findPath(tab) {


    let taille: number = tab.length;
    let lambda: number;
    let lambda_first: number;
    let res_: number;
    let stop: boolean = false;
    let i: number = taille - 1;
    let lalana_miverina = new Array();
    console.log(" ");
    console.log(" %c+++++ calcule recule commance +++++", 'background: #222; color: #bada55');
    lambda_first = tab[i].getLambda();
    for (i; i >= 0; i--) { 
      lambda = lambda_first;
      //console.log("lambda de " + i + " = " + tab[i].getLambda());     
      for (let j = 0; j < this.data_in_diagrame.linkDataArray.length; j++) {
        if ((i + 1) == this.data_in_diagrame.linkDataArray[j].to * (-1)) {
          console.log("from : " + this.data_in_diagrame.linkDataArray[j].from * (-1) + " to " + (i + 1));
          //lambda = tab[i].getLambda();
          res_ = lambda - parseInt(this.data_in_diagrame.linkDataArray[j].text);
          console.log("resultat : " + res_ + " == " + tab[this.data_in_diagrame.linkDataArray[j].from * (-1) - 1].getLambda());
          if (res_ == tab[this.data_in_diagrame.linkDataArray[j].from * (-1) - 1].getLambda()) {
            lambda_first = tab[this.data_in_diagrame.linkDataArray[j].from * (-1) - 1].getLambda();
            console.log("lambda first " + lambda_first);
            lalana_miverina.push({ to: this.data_in_diagrame.linkDataArray[j].from * (-1), from: (i + 1) });
            console.log(" %casina couleur ny arc " + this.data_in_diagrame.linkDataArray[j].from * (-1) + " to " + (i + 1), 'background: green; color: #bada55');
            //console.log("lambda de " + i + " = " + tab[i].getLambda());
            console.log("************************");
          } else {
            console.log("tsy lalana");
          }
        }
      }
      console.log("+++++++++ tour =  " + i + " +++++");
      console.log(" ");
      //console.log("tour : " + i);
    }
    // console.log("lalana miverina" + lalana_miverina);
    // this.delNoTo(lalana_miverina);
    this.coloriage(lalana_miverina);
  }


  realPath(lalana_miverina) {
    let farany_0: number = lalana_miverina[0].from;
    let alohany_0: number = lalana_miverina[0].to;
    let farany: number;
    let alohany: number;
    console.log(" %c  asina couleur ny arc " + alohany_0 + " to " + farany_0, 'background: green; color: #bada55');
    for (let i = 1; i < lalana_miverina.length; i++) {
      farany = lalana_miverina[i].from;
      alohany = lalana_miverina[i].to;
      console.log("farany : " + farany + "  alohany : " + alohany);
      for (let j = i; j < lalana_miverina.length; j++) {
        if (alohany_0 == lalana_miverina[j].from) {
          console.log(" %c  asina couleur ny arc " + alohany + " to " + farany, 'background: green; color: #bada55');
        } else {
          console.log("aaa");
        }
      }
      alohany_0 = alohany;
      farany_0 = farany;
    }
  }

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
    //this.coloriage(tabFiltre);
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
