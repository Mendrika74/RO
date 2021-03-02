import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MaximaleComponent } from './component/maximale/maximale.component';
import { MinimaleComponent } from './component/minimale/minimale.component';
import { AppComponent } from './app.component';


const routes: Routes = [
	{ path: '', redirectTo: '/maximale', pathMatch: 'full' },
	{ path: "minimale", component: MinimaleComponent },
	{ path: "maximale", component: MaximaleComponent },


	{ path: '**', component: MaximaleComponent }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
