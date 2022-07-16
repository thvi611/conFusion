import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { Comment } from '../shared/comment';
import { HttpClient } from '@angular/common/http';
import { baseURL } from '../shared/baseUrl';
import { DISHES } from '../shared/dishes';

@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor(private http: HttpClient) { }

  getDishes(): Observable<Dish[]> {
    return this.http.get<Dish[]>(baseURL + 'dishes');
  }

  getDish(id: number): Observable<Dish> {
    return this.http.get<Dish>(baseURL + 'dishes/' + id);
  }

  getFeaturedDish(): Observable<Dish> {
    return this.http.get<Dish[]>(baseURL + 'dishes?featured=true').pipe(map(dishes => dishes[0]));
  }

  getDishIds(): Observable<number[] | any> {
    return this.getDishes().pipe(map(dishes => dishes.map(dish => dish.id)));
  }

  addComment(comment: Comment, id: string): void{
    DISHES[id].comments.push(comment);
  }
}
