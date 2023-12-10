import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AltImageComponent } from './alt-image.component';
import { AltImageRoutes } from './alt-image.routing';

@NgModule({
  imports: [CommonModule, AltImageRoutes],
  declarations: [AltImageComponent],
})
export class AltImageModule {}
