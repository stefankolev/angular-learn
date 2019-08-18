import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Post } from './post.model';
import { PostsService } from './posts.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy{

  loadedPosts: Post[] = [];
  isFetching = false;
  error = null;
  errorSub: Subscription;

  constructor(private http: HttpClient,
    private postService: PostsService) { }

  ngOnInit() {

    this.errorSub = this.postService.error.subscribe(message => {
      this.error = message;
    });
    this.isFetching = true;
    this.postService.fetchPosts().subscribe(posts => {
      this.isFetching = false;
      this.loadedPosts = posts
    }, error => {
      this.isFetching = false;
      this.error = error.message;
      console.log(error);

    });
  }

  ngOnDestroy(): void {
    this.errorSub.unsubscribe();
  }

  onCreatePost(postData: Post) {
    // Send Http request
    this.postService.createAndStorePost(postData.title, postData.content);
    console.log(postData);

  }

  onHandleError() { 
    this.error = null;
  }

  onFetchPosts() {
    this.isFetching = true;
    this.postService.fetchPosts().subscribe(posts => {
      this.isFetching = false;
      this.loadedPosts = posts
    }, error => {
      this.error = error.message;
      this.isFetching = false;
      console.log(error);

    });
    // Send Http request
  }

  onClearPosts() {
    this.postService.deletePosts()
      .subscribe(() => {
        this.loadedPosts = [];
      });
  }
}
