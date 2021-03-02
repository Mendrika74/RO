import { Component, OnInit } from '@angular/core';
import { Sommet } from "../../model/sommet.model";

import * as go from 'gojs';
const $ = go.GraphObject.make;  // for conciseness in defining templates

@Component({
  selector: 'app-minimale', 
  templateUrl: './minimale.component.html',
  styleUrls: ['./minimale.component.scss']
})
export class MinimaleComponent implements OnInit {


  constructor() { }

  ngOnInit(): void {
  }

  createSommets() {

  }

}
