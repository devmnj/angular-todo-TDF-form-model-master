import { Component } from '@angular/core';
import { Todo } from './todo';
import { TodoService } from './todo.service';

@Component({
  selector: 'app-root',
  template: `
    <!--The content below is only a placeholder and can be replaced.-->
    <div style="text-align:center" class="content">
      <h1>
        Welcome to {{title}}!
      </h1>
      <div class="container" > 
      <div class="aletr alert-danger" *ngIf="errorMsg">
      {{errorMsg}}
      </div>
      <form   novalidation (ngSubmit)="OnSubmit()" *ngIf="!submitted">
       <! {{todoForm.value | json}}
        {{todoModel | json}} -->
      <div class="form-group">
      <label>Title</label>
      <input type="text" #item="ngModel" required   [class.is-invalid]="item.invalid && item.touched"  class="form-control" name="title" [(ngModel)]="todoModel.item">
      <small class="alert-danger" [class.d-none]="item.valid">title is required</small>
      </div>
      <div class="form-group ">
      <label>Description</label>
      <textarea class="form-control" minlength="10" #description="ngModel" [class.is-invalid]="description.invalid && description.touched"  name="description" [(ngModel)]="todoModel.description" ></textarea>
      <small class="alert-danger" [class.d-none]="description.valid" >Description should be 10 character</small>
      </div>
      <button  [disabled]="!item.valid || !description.valid" type="submit" class="btn btn-primary">Submit</button>
      </form>
      </div>
    </div>
  `,
  styles: []
})
export class AppComponent {
  title = 'todo-form-master';
  public submitted = false;
  todoModel = new Todo('New todo', 'some text');
  constructor(private _todoService: TodoService) { }
  errorMsg = '';

  OnSubmit(): void {
    this.submitted = true;
    console.log(this.todoModel);
    // tslint:disable-next-line: max-line-length
    this._todoService.todoPost(this.todoModel).subscribe((data: any) => console.log('Success', data), (error: any) => this.errorMsg =  error.statusText);
  }
}
