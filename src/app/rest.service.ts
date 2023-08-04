import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RestService {
  constructor(private httpClient: HttpClient) {}

  public handleGetEndpoint(url: string) {
    return this.httpClient.get(url);
  }

  public handlePostRequest(url: string, body: any) {
    return this.httpClient.post(url, body);
  }
  public handlePutRequest(url: string, body: any) {
    return this.httpClient.put(url, body);
  }
  public handleDeleteRequest(url: string, body: any) {
    return this.httpClient.delete(url);
  }
}
