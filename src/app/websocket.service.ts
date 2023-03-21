import { Injectable } from '@angular/core';
import { catchError, delay, EMPTY, retry, Subject, tap } from 'rxjs';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

const WS_ENDPOINT = 'ws://127.0.0.1:8000/ws/friends/';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  private socket$: WebSocketSubject<any> | null = null;
  public messages$ = new Subject<any>();
  public connectionErrors$ = new Subject<any>();
  public connectionSuccess$ = new Subject<any>();

  public connect(): void {
    if (!this.socket$ || this.socket$.closed) {
      this.socket$ = this.getNewWebSocket();
      this.socket$.pipe(
        tap({ error: error => {
          console.log(error);
          this.connectionErrors$.next({ 'error': 'connection failure' });
        }}),
        retry({
          count: 6,
          resetOnSuccess: true,
          delay: 5000
        }),
        tap({
          error: error => {
            console.log(error);
            this.connectionErrors$.next({ 'error': 'connection aborted' });
          }
        }),
        catchError(_ => EMPTY)
      )
        .subscribe((messages) => {
          this.connectionSuccess$.next({ 'success': 'connection success' });
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
