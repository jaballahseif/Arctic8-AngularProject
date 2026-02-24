import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SuggestionService } from '../../../service/suggestion.service';
@Component({
  selector: 'app-form-suggestion',
  templateUrl: './form-suggestion.component.html',
  styleUrl: './form-suggestion.component.css'
})
export class FormSuggestionComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private suggestionService: SuggestionService
  ) {}
  
  myform!: FormGroup;
  categories: string[] = [
    'Infrastructure et bâtiments',
    'Technologie et services numériques',
    'Restauration et cafétéria',
    'Hygiène et environnement',
    'Transport et mobilité',
    'Activités et événements',
    'Sécurité',
    'Communication interne',
    'Accessibilité',
    'Autre'
  ];
  id: string | null = null; 

  ngOnInit(): void {
    const today = new Date().toISOString().split('T')[0];

    this.myform = new FormGroup({
      title: new FormControl('', [
        Validators.required, 
        Validators.minLength(5), 
        Validators.pattern(/^[A-Z][a-zA-Z]*$/)
      ]),
      description: new FormControl('', [
        Validators.required, 
        Validators.minLength(30)
      ]),
      category: new FormControl('', [Validators.required]),
      date: new FormControl({value: today, disabled: true}, [Validators.required]),
      status: new FormControl({value: 'en attente', disabled: true}, [Validators.required]),
      nbLikes: new FormControl(0)
    });

    // Check if we are in Update mode
    this.route.params.subscribe(params => {
      this.id = params['id'];
      if(this.id) {
        this.suggestionService.getSuggestionById(this.id).subscribe({
          next: (suggestion) => {
            this.myform.patchValue(suggestion);
          },
          error: (err) => {
            console.error('Error fetching suggestion for edit', err);
          }
        });
      }
    });
  }

  onSubmit(): void {
    if (this.myform.valid) {
      const formValue = this.myform.getRawValue();

      if (this.id) {
        // Update mode
        this.suggestionService.updateSuggestion(this.id, formValue).subscribe({
          next: () => {
            console.log('Suggestion updated successfully');
            this.router.navigate(['/suggestions']);
          },
          error: (err) => console.error('Error updating suggestion', err)
        });
      } else {
        // Create mode
        this.suggestionService.addSuggestion(formValue).subscribe({
          next: () => {
            console.log('Suggestion created successfully');
            this.router.navigate(['/suggestions']);
          },
          error: (err) => console.error('Error creating suggestion', err)
        });
      }
    } else {
      console.log("Form is invalid");
      this.myform.markAllAsTouched();
    }
  }


  get title(){
    return this.myform.get('title');
  }

}

