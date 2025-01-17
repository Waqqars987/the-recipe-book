import { AuthService } from './../auth/auth.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipes.model';
import { map, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
	constructor (private http: HttpClient, private recipeService: RecipeService, private authService: AuthService) {}

	storeRecipes () {
		const recipes = this.recipeService.getRecipes();
		this.http
			.put('https://ng-course-recipe-book-8a2ce.firebaseio.com/recipes.json', recipes)
			.subscribe(response => {
				//console.log(response);
				alert('Recipes Saved!');
			});
	}

	fetchRecipes () {
		return this.http.get<Recipe[]>('https://ng-course-recipe-book-8a2ce.firebaseio.com/recipes.json').pipe(
			map(recipes => {
				if (!recipes) {
					return [];
				}
				return recipes.map(recipe => {
					return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] };
				});
			}),
			tap(recipes => {
				this.recipeService.setRecipes(recipes);
			})
		);
	}
}
