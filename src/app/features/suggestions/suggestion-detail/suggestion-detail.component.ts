import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-suggestion-detail',
  templateUrl: './suggestion-detail.component.html',
  styleUrl: './suggestion-detail.component.css'
})
export class SuggestionDetailComponent implements OnInit {
  id: any;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    //this.id = this.route.snapshot.params['id'];
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
  }

}
