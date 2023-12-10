import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CrawlComponent } from './crawl.component';

const routes: Routes = [
  {
    path: '',
    component: CrawlComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrawlRoutingModule {}
