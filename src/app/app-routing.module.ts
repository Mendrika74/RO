import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MaximaleComponent } from './component/maximale/maximale.component';
import { MinimaleComponent } from './component/minimale/minimale.component';
import { AppComponent } from './app.component';


const routes: Routes = [
	{ path: '', redirectTo: '/minimale', pathMatch: 'full' },
	{ path: "maximale", component: MinimaleComponent },
	{ path: "minimale", component: MaximaleComponent },


	{ path: '**', component: MaximaleComponent }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
