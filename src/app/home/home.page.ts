import { Component, OnInit } from '@angular/core';
import {
  InfiniteScrollCustomEvent,
  NavController,
  ToastController,
} from '@ionic/angular';
import { BlogService } from '../blog.service';
import { ApiResp, BlogPost, DataTableResp } from '../model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../login/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  blogPosts: BlogPost[] = [];

  page = 0;
  fetchSize = 10;

  postFormGroup: FormGroup = new FormGroup({});

  blog = {
    content: '',
    title: '',
    imageFile: '',
  };

  isModalOpen = false;

  constructor(
    private blogService: BlogService,
    private authService: AuthService,
    private toastController: ToastController,
    private navCtrl: NavController
  ) {}

  ngOnInit(): void {
    this.initFormGroup();
    //localStorage.clear(); //todo remove
    this.loadPosts();
  }

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  initFormGroup() {
    this.postFormGroup = new FormGroup({
      content: new FormControl('', {
        updateOn: 'blur',
        validators: [Validators.required],
      }),
      title: new FormControl('', {
        updateOn: 'blur',
        validators: [Validators.required],
      }),
      imageBase64: new FormControl(),
    });
  }
  //TODO fix endpoint to get blog
  onIonInfinite(ev: any) {
    this.page++;
    this.loadPosts();
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }

  private loadPosts() {
    this.blogService.getPost(this.page, this.fetchSize).subscribe((resp) => {
      const response = resp as ApiResp<DataTableResp<BlogPost>>;
      this.blogPosts.push(...response.data.data);
    });
  }

  onFileChange(event: any) {
    // Get the selected file from the event
    const file = event.target.files[0];

    // Read the selected file as a data URL
    const reader = new FileReader();
    reader.onload = (e) => {
      // Callback function to handle the read operation
      const dataURL = reader.result as string;
      this.postFormGroup.get('imageBase64')?.setValue(dataURL.split(',')[1]); // Extract the base64 data part
    };
    reader.readAsDataURL(file);
  }

  submitBlog() {
    if (!this.authService.isAuthenticated()) {
      this.isModalOpen = false;
      this.presentToast('You need to sign in to post');
      setTimeout(() => {
        this.navCtrl.navigateBack('/auth');
      }, 1000);
    }

    this.blogService.postBlog(this.postFormGroup.getRawValue()).subscribe(
      () => {
        this.presentToast('Success');
        this.page = 0;
        this.loadPosts();
        this.isModalOpen = false;
        this.postFormGroup.reset();
      },
      (err) => {
        console.log(err);
      }
    );
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
