import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-suggestion',
  templateUrl: './form-suggestion.component.html',
  styleUrl: './form-suggestion.component.css'
})
export class FormSuggestionComponent implements OnInit {

  myform!: FormGroup;

  ngOnInit(): void {
    this.myform = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.minLength(3)]),
      description: new FormControl('', [Validators.required]),
      category: new FormControl('', [Validators.required]),
      date: new FormControl('', [Validators.required]),
      status: new FormControl('en_attente', [Validators.required]),
      nbLikes: new FormControl(0)
    });
  }

}
