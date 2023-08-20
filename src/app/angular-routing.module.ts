import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AboutComponent } from './about/about.component';
import { TrainComponent } from './train/train.component';
import { LearnComponent } from './learn/learn.component';
import { ScoreComponent } from './score/score.component';

const routes: Routes = [
    {path: '', redirectTo: 'train', pathMatch: 'full'},
    {path: 'train', component: TrainComponent},
    {path: 'train/score', component: ScoreComponent},
    {path: 'learn', component: LearnComponent},
    {path: 'about', component: AboutComponent},
]

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AngularRoutingModule {}