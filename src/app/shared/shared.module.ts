import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BlogService } from '../blog.service';
import { RestService } from '../rest.service';
import { IonicModule } from '@ionic/angular';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    TranslateModule,
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    TranslateModule,
  ],
  providers: [BlogService, RestService, TranslateService],
})
export class SharedModule {}
