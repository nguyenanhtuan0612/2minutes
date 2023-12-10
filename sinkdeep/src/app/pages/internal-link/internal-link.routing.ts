import { Routes, RouterModule } from '@angular/router';
import { InternalLinkComponent } from './internal-link.component';

const routes: Routes = [{ path: '', component: InternalLinkComponent }];

export const InternalLinkRoutes = RouterModule.forChild(routes);
