import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreatePlayerComponent } from './player/create/create.component';
import { WelcomeComponent } from './welcome/welcome.component';


const routes: Routes = [
    { path: '', component: WelcomeComponent },
    { path: 'account/create-character', component: CreatePlayerComponent }
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
