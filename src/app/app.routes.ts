import { Routes } from '@angular/router';
import { Landing } from './features/landing/landing';
import { Shell } from './features/shell/shell';
import { Dashboard } from './features/dashboard/dashboard';
import { ResumeSummary } from './features/resume-summary/resume-summary';
import { Education } from './features/education/education';
import { Intereses } from './features/intereses/intereses';
import { Freelancer } from './features/freelancer/freelancer';

export const routes: Routes = [
    { path: '', component: Landing },
    {
        path: 'app',
        component: Shell,
        children: [
            { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
            { path: 'dashboard', component: Dashboard },
            { path: 'resume-summary', component: ResumeSummary },
            { path: 'intereses', component: Intereses },
            { path: 'freelancer', component: Freelancer },
        ]
    },
    { path: '**', redirectTo: '' }
];
