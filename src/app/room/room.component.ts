import { AfterContentInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from '../user.service';
import { WebsocketService } from '../websocket.service';
import { Room } from './room.model';
import { Game, GameRenderer } from './game/game';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit, OnDestroy, AfterContentInit {
  room: Room = { name: '', capacity: 0, occupants: [] };
  subs: Subscription[] = [];
  leavingRoom = false;

  @ViewChild('gameCanvas', { static: true })
  gameCanvasRef!: ElementRef<HTMLCanvasElement>;
  gameRenderer!: GameRenderer;

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
  
  ngAfterContentInit(): void {
    const canvasHeight = 800;
    const canvasWidth = 1200;

    const canvas = this.gameCanvasRef.nativeElement;
    const ctx = canvas.getContext('2d')!;

    const game: Game = {
      state: 'waiting',
      players: [],
      requiredPlayers: 2,
    };

    this.gameRenderer = new GameRenderer(game, ctx, canvasWidth, canvasHeight);
    this.gameRenderer.render();

    this.requestGameInfo();
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

    if (message.type === 'game_info') {
      const nextGame: Game = message.game;
      this.gameRenderer.game = nextGame;
      this.gameRenderer.render();
    }

    if (message.type === 'authenticated') {
      this.requestGameInfo();
    }
  }

  leaveRoom() {
    this.websocketService.sendMessage({
      type: 'leave_room',
    });
    this.leavingRoom = true;
  }

  requestGameInfo() {
    this.websocketService.sendMessage({
      type: 'game_info',
      room_name: this.room.name,
    });
  }

  get roomIsFull(): boolean {
    return this.room.occupants.length >= this.room.capacity;
  }

}
