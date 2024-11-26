import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CountriesService } from '../../services/countries.service';
import { Region, SmallCountry } from '../../interface/country.interface';
import { filter, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-selector-page',
  templateUrl: './selector-page.component.html',
})
export class SelectorPageComponent implements OnInit{

  public countriesByRegion: SmallCountry[] = [];
  public borders: string[] = [];

  public myForm : FormGroup = this.fb.group({
    region: ['', Validators.required],
    country: ['', Validators.required],
    border: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private countriesService: CountriesService
  ) {}

  ngOnInit(): void {
    this.onRegionChange();
    this.onCountryChange();
  }

  get regions(): Region[] {
    return this.countriesService.regions;
  }

  onRegionChange():void{
    this.myForm.get('region')!.valueChanges
    .pipe(
      tap( () => this.myForm.get('country')!.setValue(''),),
      tap( () => this.borders = [],),

      switchMap(
      region => this.countriesService.getCountriesByRegion(region)
    )).subscribe(
      region => {
        this.countriesByRegion = region,
        console.log(region)
      }
    );
  }

  onCountryChange():void{
    this.myForm.get('country')!.valueChanges
    .pipe(
      tap( () => this.myForm.get('border')!.setValue('')),
      filter((country: string) => country.length > 0),
      switchMap(
      (alphacode) => this.countriesService.getCountryByAlphaCodie(alphacode)),
  ).subscribe(
      country => {
        this.borders = country.borders;
        console.log(country.borders)
      }
    );
  }
}
