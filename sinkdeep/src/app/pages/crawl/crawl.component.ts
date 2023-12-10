import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { KeywordsService } from '../../services/keywords.service';

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

  listKeyWord: any[] = [];
  listDone: any[] = [];
  listUnDone: any[] = [];
  listError: any[] = [];

  constructor(
    private fb: FormBuilder,
    private keyWordServices: KeywordsService
  ) {}
  ngOnInit(): void {
    this.getListKeyWords();
  }

  addKeyWord(event: any): void {
    console.log(event?.target?.value);
    const keyword = [];
    keyword.push(event?.target?.value);
    const siteId = 1;
    const body = {
      siteId: siteId,
      keywords: [...keyword],
    };
    console.log(body);
    if (event?.target?.value) {
      event.target.value = '';
    }
    // this.keyWordServices.addKeyword(body).subscribe(
    //   (res) => {
    //     console.log(res);
    //   },
    //   (err) => console.log(err)
    // );
  }

  f(event: any) {
    console.log(event);
  }

  getListKeyWords() {
    this.keyWordServices.listKeywords('1').subscribe((res) => {
      for (const iterator of res.undone) {
        this.listUnDone.push(iterator.keyword);
      }
      for (const iterator of res.done) {
        this.listDone = iterator.keyword;
      }
      for (const iterator of res.error) {
        this.listError = iterator.keyword;
      }
    });
  }
}
