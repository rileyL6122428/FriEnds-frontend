import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from '../user.service';
import { WebsocketService } from '../websocket.service';
import { Room } from '../room/room.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  rooms: Room[] = [];
  subs: Subscription[] = [];

  constructor(
    private websocketService: WebsocketService,
    private userService: UserService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.websocketService.connect();
    this.subs[0] = this.websocketService.messages$
      .subscribe((message) => this.handleMessage(message));
  }

  ngOnDestroy(): void {
    this.subs.forEach((sub) => sub.unsubscribe());
  }

  handleMessage(message: any) {
    console.log(this, 'Message received: ', message);
    if (message.type === 'room_info') {
      this.rooms = message.rooms;
    }

    if (message.type === 'room_joined') {
      this.userService.room = message.room_name;
      this.router.navigate([`/room/${message.room_name}`]);
    }

    if (message.type === 'room_full') {
      console.log(`Room ${message.room_name} is full!`);
    }
  }


  joinRoom(roomName: string) {
    this.websocketService.sendMessage({
      type: 'join_room',
      room_name: roomName,
    });
  }

  get username(): string {
    return this.userService.name;
  }
}
