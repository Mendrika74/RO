import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MaximaleComponent } from './component/maximale/maximale.component';
import { AppComponent } from './app.component';


const routes: Routes = [
	{
		path: 'maximale', component: MaximaleComponent
	},
	{
		path: '', component: AppComponent
	}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
