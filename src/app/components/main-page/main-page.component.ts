import { Component, OnInit } from '@angular/core';
import { Activity } from 'src/app/interfaces/activity';
import { TodoServiceService } from 'src/app/services/todo-service.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
  private name: string;
  private newName: string;
  private modelActivity: Activity;

  constructor(private todoService: TodoServiceService,
              private snackBar: MatSnackBar) {
    this.name = '';
    this.newName = '';
    this.modelActivity = {name: '', editable: false};
}

  ngOnInit() {
  }

  // dodanie nowej czynności, nie można dodać pustej
  add() {
    this.modelActivity.name = this.name;
    if(this.modelActivity.name.length > 0) {
      this.todoService.addData(this.modelActivity, this.todoService.todoList, this.todoService.todoStorageName);
    } else {
      this.snackBar.open('Nie można dodać pustego tekstu.', 'OK', {
                  duration: 5000
                });
    }
    
    this.name = '';
    this.modelActivity = {name: '', editable: false};
    console.log(this.name);
  }

  // zmienia tryb na edytowanie
  setEdit(index: number) {
    Object.assign(this.todoService.todoList[index], {editable: true});
  }

  // edytuje obiekt, nie edytujemy na pustą aktywność
  edit(index: number) {
    this.modelActivity.name = this.newName;
    if(this.modelActivity.name.length > 0) {
      this.todoService.editData(this.todoService.todoList, this.modelActivity, index, this.todoService.todoDoneStorageName);
    } else {
      this.snackBar.open('Nie można dodać pustego tekstu.', 'OK', {
        duration: 5000
      });
    }
    this.newName = '';
    this.modelActivity = {name: '', editable: false};
  }

  // cofnięcie edycji
  cancel(index: number) {
    Object.assign(this.todoService.todoList[index], {editable: false});
    this.newName = '';
  }

  // usunięcie danego wiersza
  delete(index: number, list: Activity[], storageName: string) {
    this.todoService.deleteData(list, index, storageName);
  }

  // zmienia status na ukończone
  finish(index: number) {
    this.todoService.finishActivity(index, this.todoService.todoList, this.todoService.doneList,
                                    this.todoService.todoStorageName, this.todoService.todoDoneStorageName);
  }

}
