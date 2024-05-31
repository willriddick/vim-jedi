import { Routes } from '@angular/router';
import { QuizComponent } from './components/quiz/quiz.component';
import { LearnComponent } from './components/learn/learn.component';

export const routes: Routes = [
    { path: '',   redirectTo: 'quiz', pathMatch: 'full' }, 
    { path: 'quiz', component: QuizComponent },
    { path: 'learn', component: LearnComponent },
    { path: '**', component: QuizComponent }
];
