import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaximaleComponent } from './component/maximale/maximale.component';
import { MinimaleComponent } from './component/minimale/minimale.component';

@NgModule({
  declarations: [
    AppComponent,
    MaximaleComponent,
    MinimaleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
