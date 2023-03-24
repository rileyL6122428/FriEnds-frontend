import { AfterContentInit, Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from '../user.service';
import { WebsocketService } from '../websocket.service';
import { Room } from './room.model';
import { Game, Player } from './game/game';
import { GameRenderer } from './game-rendering/renderer-game';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit, OnDestroy, AfterContentInit {
  room: Room = { name: '', capacity: 0, occupants: [] };
  subs: Subscription[] = [];
  leavingRoom = false;

  mainPlayerMapSprites!: HTMLImageElement;
  enemyMapSprites!: HTMLImageElement;
  allyMapSprites!: HTMLImageElement;

  @ViewChild('gameCanvas', { static: true })
  gameCanvasRef!: ElementRef<HTMLCanvasElement>;
  gameRenderer!: GameRenderer;
  game!: Game;

  constructor(
    private activatedRoute: ActivatedRoute,
    private websocketService: WebsocketService,
    private router: Router,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.mainPlayerMapSprites = new Image();
    this.mainPlayerMapSprites.src = 'assets/GBA - FE 7 - Map Sprites.png';

    this.enemyMapSprites = new Image();
    this.enemyMapSprites.src = 'assets/GBA - FE 7 - Map Sprites - Red Tint.png';

    this.allyMapSprites = new Image();
    this.allyMapSprites.src = 'assets/GBA - FE 7 - Map Sprites - Green Tint.png';

    this.room.name = this.activatedRoute.snapshot.params['roomName'];

    this.websocketService.connect();
    this.subs[0] = this.websocketService.messages$
      .subscribe((message) => this.handleMessage(message));

    this.websocketService.sendMessage({
      type: 'room_info',
    });

  }
  
  ngAfterContentInit(): void {
    // const spriteImage = this.spriteImageRef.nativeElement;

    const canvasHeight = 800;
    const canvasWidth = 800;

    const canvas = this.gameCanvasRef.nativeElement;
    const ctx = canvas.getContext('2d')!;

    const mainPlayer: Player = { name: this.userService.userName }
    this.game = new Game(mainPlayer);
    this.gameRenderer = new GameRenderer(
      this.game,
      ctx,
      canvasWidth,
      canvasHeight,
      this.mainPlayerMapSprites,
      this.enemyMapSprites,
      this.allyMapSprites
    );
    this.gameRenderer.render();
    setInterval(() => {
      this.gameRenderer.render();
    }, 1000 / 30);
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
      this.game.patch(message.game);
      this.gameRenderer.onGameOverwritten();
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

  handleClick(event: any) {
    const xCoord = event.offsetX;
    const yCoord = event.offsetY;
    this.gameRenderer.handleClick(xCoord, yCoord);
    this.gameRenderer.render();
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'ArrowUp') {
      this.game.moveCursorUp();
    } else if (event.key === 'ArrowDown') {
      this.game.moveCursorDown();
    } else if (event.key === 'ArrowLeft') {
      this.game.moveCursorLeft();
    } else if (event.key === 'ArrowRight') {
      this.game.moveCursorRight();
    }
    this.gameRenderer.render();
  }

}
