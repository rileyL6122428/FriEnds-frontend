import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { WebsocketService } from './websocket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private websocketService: WebsocketService,
    private userService: UserService,
  ) {}

  ngOnInit(): void {
    this.websocketService.connect();
    this.websocketService.messages$.subscribe(
      (message) => this.handleMessage(message)
    );

    if (!this.userService.created) {
      this.createUser();
    } else {
      this.authenticate();
    }
  }

  handleMessage(message: any) {
    console.log(this, 'Message received: ', message);

    if (message.type === 'authenticated') {
      this.userService.registerAuth({
        clientName: message.client_name,
        userName: message.username,
      });

      this.getRoomInfo();
    }

    if (message.type === 'authenticate error' && message.error === 'User not found') {
      this.userService.deleteUser();
      this.createUser();
    }
  }

  createUser() {
    this.websocketService.sendMessage({
      type: 'create_user',
    });
  }

  getRoomInfo() {
    this.websocketService.sendMessage({
      type: 'room_info',
    });
  }

  authenticate() {
    this.websocketService.sendMessage({
      type: 'authenticate',
      client_name: this.userService.clientName,
      username: this.userService.userName,
    });
  }

}
