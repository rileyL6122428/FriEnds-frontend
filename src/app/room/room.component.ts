import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from '../user.service';
import { WebsocketService } from '../websocket.service';
import { Room } from './room.model';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit, OnDestroy {
  room: Room = { name: '', capacity: 0, occupants: [] };
  subs: Subscription[] = [];
  leavingRoom = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private websocketService: WebsocketService,
    private router: Router,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.room.name = this.activatedRoute.snapshot.params['roomName'];

    this.websocketService.connect();
    this.subs[0] = this.websocketService.messages$
      .subscribe((message) => this.handleMessage(message));

    this.websocketService.sendMessage({
      type: 'room_info',
    });
  }

  ngOnDestroy(): void {
    this.subs.forEach((sub) => sub.unsubscribe());
  }

  private handleMessage(message: any) {
    console.log(this, 'Message received: ', message);

    if (message.type === 'room_info') {
      this.room = (
        message.rooms.find((room: Room) => room.name === this.room.name) ||
        this.room
      );
    }

    if (message.type === 'left_room') {
      this.router.navigate([`/`]);
      this.userService.assignRoomName('');
    }
  }

  leaveRoom() {
    this.websocketService.sendMessage({
      type: 'leave_room',
    });
    this.leavingRoom = true;
  }

  get roomIsFull(): boolean {
    return this.room.occupants.length >= this.room.capacity;
  }

}
