import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-crawl',
  templateUrl: './crawl.component.html',
  styleUrls: ['./crawl.component.scss'],
})
export class CrawlComponent implements OnInit {
  validateForm: FormGroup = this.fb.group({
    keyWord: ['', [Validators.required]],
    link: ['', [Validators.required]],
  });

  submitForm(): void {
    console.log('submit', this.validateForm.value);
  }

  constructor(private fb: FormBuilder) {}
  ngOnInit(): void {}
}
