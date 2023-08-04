import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ApiResp, BlogPost, comment } from './model';
import { RestService } from './rest.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  blogPosts: BlogPost[] = [
    {
      id: 1,
      title: 'Blog 1',
      content: 'Summary of blog 1...',
      likes: 100,
      comments: 10,
      imageBase64Url: '',
    },
    {
      id: 2,
      title: 'Blog 2',
      content: 'Summary of blog 2...',
      likes: 100,
      comments: 10,
    },
    // Add more blog objects as needed
  ];
  constructor(private restService: RestService) {}

  getPost(index: number, fetchSize: number) {
    const url =
      environment.baseUrl +
      environment.contextPath +
      `/post?index=${index}&size=${fetchSize}`;

    return this.restService.handleGetEndpoint(url);
  }

  generateItems() {
    const count = this.blogPosts.length + 1;
    for (let i = 0; i < 50; i++) {
      this.blogPosts.push({
        id: count,
        title: 'Blog 2',
        content: 'Summary of blog 2...',
        likes: 100,
        comments: 10,
      });
    }
  }

  getBlogPostById(blogId: string) {
    const url =
      environment.baseUrl + environment.contextPath + `/post/${blogId}`;
    return this.restService.handleGetEndpoint(url);
  }

  postBlog(post: any) {
    const url = environment.baseUrl + environment.contextPath + `/post`;
    return this.restService.handlePostRequest(url, post);
  }

  getComments(blogId: string, index: number, size: number) {
    const url =
      environment.baseUrl +
      environment.contextPath +
      `/${blogId}/comment?index=${index}&size=${size}`;
    return this.restService.handleGetEndpoint(url);
  }
  postComments(id: number, comment: comment) {
    const url =
      environment.baseUrl + environment.contextPath + `/${id}/comment`;
    return this.restService.handlePostRequest(url, comment);
  }
}
