import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { FoldersState, IFolder } from 'src/app/store/folders.state';

@Component({
  selector: 'app-folders-list',
  templateUrl: './folders-list.component.html',
  styleUrls: ['./folders-list.component.sass']
})
export class FoldersListComponent implements OnInit, OnDestroy {
  private foldersStateSubscription = new Subscription();
  public folders: IFolder[] = [];

  constructor() { }

  ngOnInit(): void {
    this.foldersStateSubscription = FoldersState.getState().subscribe(
      data => {
        console.log('folders list', data);
        this.folders = data.folders;
      },
      error => {
        console.error('folders list', error);
      },
    );
  }

  ngOnDestroy(): void {
    this.foldersStateSubscription.unsubscribe();
  }

  public handleRemoveFolder(folderId: string): void {
    FoldersState.removeFolder(folderId);
  }
}
