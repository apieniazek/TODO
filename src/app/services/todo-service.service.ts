import { Injectable } from '@angular/core';
import { Activity } from 'src/app/interfaces/activity';


@Injectable({
  providedIn: 'root'
})
export class TodoServiceService {

  todoList: Activity[];
  doneList: Activity[];
  todoStorageName: string = 'TODOStorage';
  todoDoneStorageName: string = 'DoneStorage';

  constructor() {
     // inicjalizacja list przechowujących informacje w local storage
    this.todoList = JSON.parse(localStorage.getItem(this.todoStorageName)) || [];
    this.doneList = JSON.parse(localStorage.getItem(this.todoDoneStorageName)) || [];
   }

   // aktualizacja list w local storage
   updateStorage(storageName: string, list: Activity[]) {
      localStorage.setItem(storageName, JSON.stringify(list));
   }

   // dodanie informacji do local storage
   addData(data: Activity, list: Activity[], storageName: string) {
      this.todoList.push(data);
      this.updateStorage(storageName, list);
   }

   // edycja danych w local storage
   editData(list: Activity[], updatedData: Activity, index: number, storageName: string) {
     Object.assign(list[index], updatedData);
     this.updateStorage(storageName, list);
   }

   // usunięcie danych z local storage
   deleteData(list: Activity[], index: number, storageName: string) {
    list.splice(index, 1);
    this.updateStorage(storageName, list);
   }

   // przesunięcie z TODO do DONE oraz usunięcie z TODO
   finishActivity(index: number, list: Activity[], doneList: Activity[], storageName: string, doneStorageName: string) {
      doneList.push(list[index]);
      this.deleteData(list, index, storageName);
      this.updateStorage(doneStorageName, doneList);
   }
}
