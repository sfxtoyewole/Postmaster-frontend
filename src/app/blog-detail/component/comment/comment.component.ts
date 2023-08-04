import { Component, Input, OnInit } from '@angular/core';
import { comment } from 'src/app/model';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent implements OnInit {
  @Input()
  comment?: comment;
  constructor() {}

  ngOnInit() {}
}
