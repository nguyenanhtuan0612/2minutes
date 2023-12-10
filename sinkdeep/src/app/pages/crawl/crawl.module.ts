import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrawlComponent } from './crawl.component';
import { CrawlRoutingModule } from './crawl.routing';
import { NzTabsModule } from 'ng-zorro-antd/tabs';

@NgModule({
  imports: [CommonModule, CrawlRoutingModule, NzTabsModule],
  declarations: [CrawlComponent],
})
export class CrawlModule {}
