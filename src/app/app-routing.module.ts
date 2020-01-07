import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreatePlayerComponent } from './player/create/create.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { ManageCharactersComponent } from './player/manage/manage.component';


const routes: Routes = [
    { path: '', component: WelcomeComponent },
    { path: 'account/create-character', component: CreatePlayerComponent },
    { path: 'account/manage-characters', component: ManageCharactersComponent }
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
