import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrawlComponent } from './crawl.component';
import { CrawlRoutingModule } from './crawl.routing';
import { SharedNgZorroAntdModule } from '../../shared/ng-zorro.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    CrawlRoutingModule,
    SharedNgZorroAntdModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [CrawlComponent],
})
export class CrawlModule {}
