import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SuggestionsComponent } from './suggestions.component';
import { SuggestionListComponent } from './suggestion-list/suggestion-list.component';
import { SuggestionDetailsComponent } from './suggestion-details/suggestion-details.component';
import { FormSuggestionComponent } from './form-suggestion/form-suggestion.component';

const routes: Routes = [
  {
    path: '',
    component: SuggestionsComponent,
    children: [
      { path: 'add', component: FormSuggestionComponent },
      {
        path: '',
        component: SuggestionListComponent,
        children: [
          { path: ':id', component: SuggestionDetailsComponent }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuggestionsRoutingModule { }

