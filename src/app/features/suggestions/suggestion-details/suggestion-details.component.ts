import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Suggestion } from '../../../models/suggestion';
import { SuggestionService } from '../../../service/suggestion.service';

@Component({
  selector: 'app-suggestion-details',
  templateUrl: './suggestion-details.component.html',
  styleUrl: './suggestion-details.component.css'
})
export class SuggestionDetailsComponent implements OnInit {
  suggestionId: any;
  suggestion: Suggestion | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private suggestionService: SuggestionService
  ) { }

  ngOnInit(): void {
    // Retrieve the id parameter from the route
    this.route.params.subscribe(params => {
      this.suggestionId = params['id'];
      
      this.suggestionService.getSuggestionById(this.suggestionId).subscribe({
         next: (data) => {
            // Check if the data is valid and not an empty object {}
            if (data && Object.keys(data).length > 0 && typeof data.id !== 'undefined') {
              this.suggestion = data;
            } else {
              this.suggestion = undefined;
            }
         },
         error: (err) => {
            console.error('Error loading suggestion details', err);
            this.suggestion = undefined;
         }
      })
    });
  }

  getClassCss(status: string): string {
    if (status == 'acceptee') {
      return "status-accepted"
    } else if (status == 'refusee') {
      return "status-refused"
    } else {
      return "status-pending"
    }
  }

  backToList(): void {
    this.router.navigate(['/suggestions']);
  }
}
