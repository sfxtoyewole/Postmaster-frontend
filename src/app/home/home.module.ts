import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { BlogComponent } from './components/blog/blog.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [SharedModule, IonicModule, HomePageRoutingModule],
  declarations: [HomePage, BlogComponent],
})
export class HomePageModule {}
