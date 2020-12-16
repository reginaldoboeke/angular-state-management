import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { FeatherModule } from 'angular-feather';
import { AppRoutingModule } from './app-routing.module';
import { allIcons } from 'angular-feather/icons';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { FoldersListComponent } from './components/folders-list/folders-list.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FoldersListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FeatherModule.pick(allIcons),
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [FeatherModule],
})
export class AppModule { }
