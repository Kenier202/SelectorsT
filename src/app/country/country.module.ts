import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectorPageComponent } from './pages/selector-page/selector-page.component';
import { CountryRoutingModule } from './country-routing.module';
import { AppRoutingModule } from '../app-routing.module';



@NgModule({
  declarations: [
    SelectorPageComponent,
  ],
  imports: [
    CommonModule,
    CountryRoutingModule,
  ]
})
export class CountryModule { }
