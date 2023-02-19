import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  created: boolean = false;
  name: string = '';
  room: string = '';

}
