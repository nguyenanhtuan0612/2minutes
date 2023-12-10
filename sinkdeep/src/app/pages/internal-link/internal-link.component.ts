import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-internal-link',
  templateUrl: './internal-link.component.html',
  styleUrls: ['./internal-link.component.scss'],
})
export class InternalLinkComponent implements OnInit {
  validateForm: FormGroup<{
    keyWord: FormControl<string>;
    link: FormControl<string>;
  }> = this.fb.group({
    keyWord: ['', [Validators.required]],
    link: ['', [Validators.required]],
  });

  submitForm(): void {
    console.log('submit', this.validateForm.value);
  }

  constructor(private fb: NonNullableFormBuilder) {}

  ngOnInit() {}
}
