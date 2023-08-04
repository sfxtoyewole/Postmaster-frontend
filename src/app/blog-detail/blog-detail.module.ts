import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BlogDetailPageRoutingModule } from './blog-detail-routing.module';

import { BlogDetailPage } from './blog-detail.page';
import { CommentComponent } from './component/comment/comment.component';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [BlogDetailPageRoutingModule, SharedModule],
  declarations: [BlogDetailPage, CommentComponent],
})
export class BlogDetailPageModule {}
