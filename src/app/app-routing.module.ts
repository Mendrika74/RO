import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MaximaleComponent } from './component/maximale/maximale.component';
import { AppComponent } from './app.component';


const routes: Routes = [
	{ path: '', redirectTo: '/maximale', pathMatch: 'full' 	},
	{ path: "maximale/test", component: MaximaleComponent  },
	{ path: '**', component: MaximaleComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
