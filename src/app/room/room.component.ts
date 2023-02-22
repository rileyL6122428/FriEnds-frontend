import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { WebsocketService } from '../websocket.service';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {

  roomName: string = '';
  subs: Subscription[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private websocketService: WebsocketService,
  ) { }

  ngOnInit(): void {
    this.roomName = this.activatedRoute.snapshot.params['roomName'];
    this.subs[0] = this.websocketService.messages$
      .subscribe((message) => this.handleMessage(message));
  }

  private handleMessage(message: any) {
    console.log(this, 'Message received: ', message);
  }

}
