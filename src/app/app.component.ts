import { Component, OnInit } from '@angular/core';
import { catchError, EMPTY, Subject, switchAll, tap } from 'rxjs';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

const WS_ENDPOINT = 'ws://127.0.0.1:8000/ws/chat/lobby/';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  private socket$: WebSocketSubject<any> | null = null;
  public messages$ = new Subject<any>();

  public ngOnInit(): void {
    this.connect();
    this.messages$.subscribe(
      (message) => {
        console.log('Message received: ', message);
      }
    );
  }

  public connect(): void {
    if (!this.socket$ || this.socket$.closed) {
      this.socket$ = this.getNewWebSocket();
      this.socket$.pipe(
        tap({ error: error => console.log(error) }),
        catchError(_ => EMPTY)
      )
        .subscribe((messages) => {
          this.messages$.next(messages);
        });
    }
  }

  private getNewWebSocket() {
    return webSocket(WS_ENDPOINT);
  }
  sendMessage(message: any) {
    this.socket$!.next({ message });
  }
  close() {
    this.socket$!.complete();
  }
}
