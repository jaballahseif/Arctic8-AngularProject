import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Suggestion } from '../../../models/suggestion';
import { SuggestionService } from '../../../service/suggestion.service';

@Component({
  selector: 'app-suggestion-list',
  templateUrl: './suggestion-list.component.html',
  styleUrl: './suggestion-list.component.css'
})
export class SuggestionListComponent implements OnInit {
  search_term: string = "";
  titre: string = "Liste des suggestions";
  textPlaceholder: string = "Rechercher une suggestion"
  suggestions: Suggestion[] = [];

  constructor(
    private suggestionService: SuggestionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadSuggestions();
  }

  loadSuggestions(): void {
    this.suggestionService.getSuggestionsList().subscribe({
      next: (data) => {
        this.suggestions = data;
      },
      error: (err) => {
        console.error('Error fetching suggestions', err);
      }
    });
  }

  like(sug: Suggestion) {
    sug.nbLikes++;
    this.suggestionService.updateSuggestion(sug.id, sug).subscribe({
      next: () => console.log('Suggestion liked!'),
      error: (err) => {
        // Revert UI if it fails
        sug.nbLikes--; 
        console.error('Error updating suggestion like', err);
      }
    });
  }

  delete(sug: Suggestion) {
    if(confirm(`Voulez-vous vraiment supprimer la suggestion: ${sug.title} ?`)) {
      this.suggestionService.deleteSuggestion(sug.id).subscribe({
        next: () => {
          this.loadSuggestions();
          // Check if the deleted suggestion is currently being viewed
          if (this.router.url === `/suggestions/${sug.id}`) {
             this.router.navigate(['/suggestions']);
          }
        },
        error: (err) => {
          console.error('Error deleting suggestion', err);
        }
      });
    }
  }

  getClassCss(status: string) {
    if (status == 'acceptee') {
      return "status-accepted"
    } else {
      if (status == 'refusee') {
        return "status-refused"
      }
      else {
        return "status-pending"
      }
    }
  }

  addToFavoris() {
    console.log('Ajouté aux favoris');
  }
}

