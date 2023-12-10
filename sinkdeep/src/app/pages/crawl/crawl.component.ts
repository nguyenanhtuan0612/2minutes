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

  listCategory = [
    {
      active: true,
      name: 'First category',
      disabled: false,
    },
    {
      active: false,
      disabled: false,
      name: 'This is panel header 2',
    },
  ];

  submitForm(): void {
    console.log('submit', this.validateForm.value);
  }

  constructor(private fb: FormBuilder) {}
  ngOnInit(): void {}

  addKeyWord(): void {
    console.log('addKeyword');
  }
}
