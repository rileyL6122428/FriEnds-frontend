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
  }

  handleMessage(message: any) {
    console.log(this, 'Message received: ', message);

    if (message.type === 'user_created') {
      this.userService.created = true;
      this.userService.name = message.username;
      this.websocketService.sendMessage({
        type: 'room_info',
      });
    }
  }

}
