import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import * as uuid from '../providers/uuid.provider';

export interface IFolder {
  id: string;
  name: string;
}

export interface IFoldersState {
  folders: IFolder[];
  foldersQuantity: number;
}

const initialState: IFoldersState = {
  folders: [],
  foldersQuantity: 0,
};

@Injectable({ providedIn: 'root' })
export class FoldersState {
  private static state = new BehaviorSubject<IFoldersState>(initialState);

  private static folders: IFolder[] = initialState.folders;
  private static foldersQuantity: number = initialState.foldersQuantity;

  public static addFolder(folderName: string): void {
    FoldersState.folders.push({
      id: uuid.generateUUID(),
      name: folderName
    });

    FoldersState.foldersQuantity += 1;

    this.setState();
  }

  public static removeFolder(folderId: string): void {
    const filteredFolders = FoldersState.folders.filter(
      filterFolder => filterFolder.id !== folderId,
    );

    FoldersState.folders = filteredFolders;
    FoldersState.foldersQuantity -= 1;

    this.setState();
  }

  public static getState() {
    return FoldersState.state;
  }

  private static setState(): void {
    const { folders, foldersQuantity } = this;
    FoldersState.state.next({ folders, foldersQuantity });
  }
}
