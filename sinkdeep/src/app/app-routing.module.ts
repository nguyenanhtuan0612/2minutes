import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/crawl' },
  {
    path: 'crawl',
    loadChildren: () =>
      import('./pages/crawl/crawl.module').then((m) => m.CrawlModule),
  },
  {
    path: 'internal-link',
    loadChildren: () =>
      import('./pages/internal-link/internal-link.module').then(
        (m) => m.InternalLinkModule
      ),
  },
  {
    path: 'alt-image',
    loadChildren: () =>
      import('./pages/alt-image/alt-image.module').then(
        (m) => m.AltImageModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
