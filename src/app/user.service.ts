import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  registerAuth({ clientName, userName }: { clientName: string, userName: string }) {
    sessionStorage.setItem('clientName', clientName);
    sessionStorage.setItem('userName', userName);
  }

  assignRoomName(roomName: string) {
    sessionStorage.setItem('roomName', roomName);
  }

  deleteUser() {
    sessionStorage.removeItem('clientName');
    sessionStorage.removeItem('userName');
    sessionStorage.removeItem('roomName');
  }

  get created(): boolean {
    return !!(
      sessionStorage.getItem('clientName') &&
      sessionStorage.getItem('userName')
    );
  }

  get userName(): string {
    return sessionStorage.getItem('userName') || '';
  }

  get clientName(): string {
    return sessionStorage.getItem('clientName') || '';
  }

}
