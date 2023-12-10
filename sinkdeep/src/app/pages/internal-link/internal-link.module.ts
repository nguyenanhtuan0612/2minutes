import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedNgZorroAntdModule } from '../../shared/ng-zorro.module';
import { InternalLinkComponent } from './internal-link.component';
import { InternalLinkRoutes } from './internal-link.routing';

@NgModule({
  imports: [
    CommonModule,
    InternalLinkRoutes,
    SharedNgZorroAntdModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [InternalLinkComponent],
})
export class InternalLinkModule {}
