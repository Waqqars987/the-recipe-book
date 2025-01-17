import { Component, OnInit } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {

  isLoading = false;
  
  constructor(private dataStorageService: DataStorageService) { }

  ngOnInit() {

    /* Loading All User's Recipes after Successful Login*/
    this.isLoading = true;
    this.dataStorageService.fetchRecipes().subscribe(
      () => {
        this.isLoading = false;
      }
    );
  }

}
