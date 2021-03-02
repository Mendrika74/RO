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

  tab = new Array();

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



  constructor() {
    this.x16 = new Sommet(240, 15);
    this.x16.addIndex_succ(0); this.x16.addArc(0);

    this.x14 = new Sommet(240, 13);
    this.x14.addIndex_succ(15); this.x14.addArc(3);

    this.x15 = new Sommet(240, 14);
    this.x15.addIndex_succ(13); this.x15.addArc(5);
    this.x15.addIndex_succ(15); this.x15.addArc(6);

    this.x13 = new Sommet(240, 12);
    this.x13.addIndex_succ(13); this.x13.addArc(3);

    this.x12 = new Sommet(240, 11);
    this.x12.addIndex_succ(14); this.x12.addArc(9);

    this.x11 = new Sommet(240, 10);
    this.x11.addIndex_succ(11); this.x11.addArc(6);
    this.x11.addIndex_succ(12); this.x11.addArc(12);

    this.x10 = new Sommet(240, 9);
    this.x10.addIndex_succ(11); this.x10.addArc(7);

    this.x9 = new Sommet(240, 8);
    this.x9.addIndex_succ(7); this.x9.addArc(3);
    this.x9.addIndex_succ(9); this.x9.addArc(4);

    this.x8 = new Sommet(240, 7);
    this.x8.addIndex_succ(9); this.x8.addArc(2);

    this.x7 = new Sommet(240, 6);
    this.x7.addIndex_succ(7); this.x7.addArc(1);
    this.x7.addIndex_succ(10); this.x7.addArc(8);

    this.x6 = new Sommet(240, 5);
    this.x6.addIndex_succ(4); this.x6.addArc(5);
    this.x6.addIndex_succ(6); this.x6.addArc(4);

    this.x5 = new Sommet(240, 4);
    this.x5.addIndex_succ(8); this.x5.addArc(1);

    this.x4 = new Sommet(240, 3);
    this.x4.addIndex_succ(2); this.x4.addArc(8);
    this.x4.addIndex_succ(4); this.x4.addArc(6);

    this.x3 = new Sommet(240, 2);
    this.x3.addIndex_succ(5); this.x3.addArc(1);
    this.x3.addIndex_succ(10); this.x3.addArc(16);

    this.x2 = new Sommet(240, 1);
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
    this.tab.push(this.x16);
  }

  ngOnInit(): void {
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
      pos_i = this.tab[current].getPosi();
      if (demitour) {
        current = pos_i;
      }
      for (let sous_cp = 0; sous_cp < this.tab[current].getIndex_succ().length; sous_cp++) {
        let res: number;
        //next = Integer.parseInt(tab.get(current).getIndex_succ().get(sous_cp).toString());
        pos_j = parseInt(this.tab[current].getIndex_succ()[sous_cp]);
        sub = this.tab[pos_j].getLambda() - this.tab[current].getLambda();
        if (pos_i < pos_j) {
          if (sub > parseInt(this.tab[current].getArc()[sous_cp])) {
            res = this.tab[current].getLambda() + parseInt(this.tab[current].getArc()[sous_cp]);
            this.tab[pos_j].setLambda(res);
            console.log("*******************IF****************");
            console.log("I : " + pos_i);
            console.log("J  : " + pos_j);
            console.log(this.tab[current].getLambda() + " + " + this.tab[current].getArc()[sous_cp] + " = " + res);
            demitour = false;
          }
        }
        else {
          if (sub < parseInt(this.tab[current].getArc()[sous_cp]) || sub == parseInt(this.tab[current].getArc()[sous_cp])) {
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
          }
        }
      }
      compte++;
      current++;
    }
  }
}
