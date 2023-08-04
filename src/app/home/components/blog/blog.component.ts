import { Component, Input, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { BlogService } from 'src/app/blog.service';
import { BlogPost } from 'src/app/model';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
})
export class BlogComponent implements OnInit {
  @Input() blogData?: BlogPost;
  like = false;

  constructor(
    private blogService: BlogService,
    private navCtrl: NavController
  ) {}

  ngOnInit() {}

  likeBlog(event: Event) {
    this.like = !this.like;
    if (this.blogData) {
      this.blogData.likes += this.like ? 1 : -1;
    }
    event.stopPropagation();
  }

  openComments(event: Event) {
    event.stopPropagation();
    this.navCtrl.navigateForward(`blog-detail/${this.blogData?.id}#comments`);
  }

  openBlogDetails() {
    console.log('clicked');
    this.navCtrl.navigateForward(`blog-detail/${this.blogData?.id}`);
  }
}
