import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { WebsocketService } from './websocket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  connected = false;
  heartbeatInterval: any;

  constructor(
    private websocketService: WebsocketService,
    private userService: UserService,
  ) {}

  ngOnInit(): void {
    this.websocketService.messages$.subscribe(
      (message) => this.handleMessage(message)
    );
    this.websocketService.connectionErrors$.subscribe(
      (error) => {
        console.log(this, 'Connection error: ', error);
        this.connected = false;
      }
    );
    this.websocketService.connect();
  }

  handleMessage(message: any) {
    this.connected = true;
    console.log(this, 'Message received: ', message);

    if (message.type === 'client_created') {
      if (!this.userService.created) {
        this.createUser();
      } else {
        this.authenticate();
      }
    }

    if (message.type === 'authenticated') {
      this.userService.registerAuth({
        clientName: message.client_name,
        userName: message.username,
      });

      this.getRoomInfo();

      this.scheduleHeartbeat();
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

  scheduleHeartbeat() {
    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval);
    }
    this.heartbeatInterval = setInterval(() => {
      this.websocketService.sendMessage({
        type: 'heartbeat'
      });
    }, 2000);
  }

}
