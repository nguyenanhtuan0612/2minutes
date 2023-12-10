import { Routes, RouterModule } from '@angular/router';
import { AltImageComponent } from './alt-image.component';

const routes: Routes = [{ path: '', component: AltImageComponent }];

export const AltImageRoutes = RouterModule.forChild(routes);
