import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { WebsocketService } from './websocket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  rooms: {name: string, capacity: string}[] = [];

  constructor(
    private websocketService: WebsocketService,
    private userService: UserService,
  ) {}

  public ngOnInit(): void {
    this.websocketService.connect();
    this.websocketService.messages$.subscribe((message) => {
      console.log('Message received: ', message);

      if (message.type === 'user_created') {
        this.userService.created = true;
        this.userService.name = message.username;
        this.websocketService.sendMessage({
          type: 'room_info',
        });
      }
      if (message.type === 'room_info') {
        this.rooms = message.rooms;
      }
    });
  }

  get username(): string {
    return this.userService.name;
  }

  joinRoom(roomName: string) {
    // this.websocketService.sendMessage({
    //   type: 'join_room',
    //   room: roomName,
    // });
  }

}
