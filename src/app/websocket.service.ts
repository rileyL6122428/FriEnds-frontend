import { Injectable } from '@angular/core';
import { catchError, EMPTY, Subject, tap } from 'rxjs';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

const WS_ENDPOINT = 'ws://127.0.0.1:8000/ws/friends/';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  private socket$: WebSocketSubject<any> | null = null;
  public messages$ = new Subject<any>();

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
