import { Component, OnInit } from '@angular/core';
import * as go from 'gojs';

const $ = go.GraphObject.make;  // for conciseness in defining templates


@Component({
  selector: 'app-minimale',
  templateUrl: './minimale.component.html',
  styleUrls: ['./minimale.component.scss']
})
export class MinimaleComponent implements OnInit {

  myDiagram =
    $(go.Diagram, "myDiagramDiv",
      {
        // have mouse wheel events zoom in and out instead of scroll up and down
        "toolManager.mouseWheelBehavior": go.ToolManager.WheelZoom,
        initialAutoScale: go.Diagram.Uniform,
        "linkingTool.direction": go.LinkingTool.ForwardsOnly,
        layout: $(go.LayeredDigraphLayout, { isInitial: false, isOngoing: false, layerSpacing: 50 }),
        "undoManager.isEnabled": true
      });


  constructor() { }

  ngOnInit(): void {
  }


  init() {
    //if (window.goSamples) goSamples();  // init for these samples -- you don't need to call this     
    var yellowgrad = $(go.Brush, "Linear", { 0: "rgb(254, 201, 0)", 1: "rgb(254, 162, 0)" });
    var greengrad = $(go.Brush, "Linear", { 0: "#98FB98", 1: "#9ACD32" });
    var bluegrad = $(go.Brush, "Linear", { 0: "#B0E0E6", 1: "#87CEEB" });
    var redgrad = $(go.Brush, "Linear", { 0: "#C45245", 1: "#871E1B" });
    var whitegrad = $(go.Brush, "Linear", { 0: "#F0F8FF", 1: "#E6E6FA" });

    var bigfont = "bold 13pt Helvetica, Arial, sans-serif";
    var smallfont = "bold 11pt Helvetica, Arial, sans-serif";

    // Common text styling
    function textStyle() {
      return {
        margin: 6,
        wrap: go.TextBlock.WrapFit,
        textAlign: "center",
        editable: true,
        font: bigfont
      }
    }
  }



}
