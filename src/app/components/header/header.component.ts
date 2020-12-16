import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { FoldersState } from 'src/app/store/folders.state';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit, OnDestroy {
  private foldersStateSubscription: Subscription = new Subscription();

  public foldersQuantity: number = 0;
  public form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
  ) {
    this.form = this.formBuilder.group({
      folder_name: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.foldersStateSubscription = FoldersState.getState().subscribe(
      data => {
        console.log('header', data);
        this.foldersQuantity = data.foldersQuantity;
      },

      error => {
        console.error('header', error);
      }
    );
  }

  ngOnDestroy(): void {
    this.foldersStateSubscription.unsubscribe();
  }

  public handleSubmit(): void {
    if (this.form.invalid) {
      window.alert('Folder name is a required field');
      return;
    }

    const { folder_name } = this.form.value;
    FoldersState.addFolder(folder_name);
    this.form.reset();
  }
}
