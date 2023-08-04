import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiResp, BlogPost, DataTableResp, comment } from '../model';
import { NavController, ToastController } from '@ionic/angular';
import { BlogService } from '../blog.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthGuard } from '../auth-guard.guard';
import { AuthService } from '../login/auth.service';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.page.html',
  styleUrls: ['./blog-detail.page.scss'],
})
export class BlogDetailPage implements OnInit {
  blogData?: BlogPost;
  comments: comment[] = [];
  commentForm: FormGroup = new FormGroup({});

  pageIndex = 0;
  size = 10;

  like = false;
  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private blogService: BlogService,
    private authService: AuthService,
    private toastController: ToastController
  ) {}
  ngOnInit() {
    this.initFormGroup();

    this.route.paramMap.subscribe((paramMap) => {
      console.log(paramMap);
      if (!paramMap.has('id')) {
        this.navCtrl.navigateBack('/home');
        return;
      }
      const blogId = paramMap.get('id') as string;

      //TODO complete this path
      this.retrieveBlogDetails(blogId);
      this.retrieveComments(blogId);
    });
  }
  initFormGroup() {
    this.commentForm = new FormGroup({
      content: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required],
      }),
    });
  }
  retrieveComments(blogId: string) {
    this.blogService.getComments(blogId, this.pageIndex, this.size).subscribe(
      (resp) => {
        console.log(resp);
        const response = resp as ApiResp<DataTableResp<comment>>;
        this.comments.push(...response.data.data);
      },
      (error) => {
        console.log(error);
        //TODO notify the user
      }
    );
  }

  onSubmit() {
    if (!this.authService.isAuthenticated()) {
      this.presentToast('You need to sign in to comment');
      setTimeout(() => {
        this.navCtrl.navigateBack('/auth');
      }, 1000);
      return;
    }

    if (this.commentForm?.valid) {
      this.isLoading = true;
      this.blogService
        .postComments(
          this.blogData?.id as number,
          this.commentForm.getRawValue()
        )
        .subscribe(
          (resp) => {
            this.isLoading = false;
            // toast that comment sent

            this.retrieveComments(this.blogData?.id as unknown as string);
          },
          (error) => {
            this.isLoading = false;
            //toast error to user
          }
        );
    } else {
      // Form is invalid, display error messages or handle validation logic
    }
  }

  retrieveBlogDetails(blogId: string) {
    this.isLoading = true;
    this.blogService.getBlogPostById(blogId).subscribe(
      (resp) => {
        console.log(resp);
        this.isLoading = false;
        const response = resp as ApiResp<BlogPost>;
        this.blogData = response.data;
      },
      (error) => {
        this.isLoading = false;
        console.log(error);
        //TODO notify the user
        this.navCtrl.back();
      }
    );
  }
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

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 1500,
      position: 'bottom',
    });

    await toast.present();
  }
}
