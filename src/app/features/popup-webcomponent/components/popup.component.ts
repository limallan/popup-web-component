import { animate, state, style, transition, trigger } from "@angular/animations";
import { Component, EventEmitter, HostBinding, Input, Output } from "@angular/core";

type stateTypes = 'opened' | 'closed';

@Component({
  selector: 'custom-popup',
  templateUrl: './popup.component.html',
  animations: [
    trigger('state', [
      state('opened', style({tranform: 'translateY(0%)'})),
      state('void, closed', style({tranform: 'translateY(100%)', opacity: 0})),
      transition('* => *', animate('100ms ease-in')),
    ])
  ],
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent {
  @HostBinding('@state');
  state: stateTypes = 'closed'


  @Input()
  public get message(): string {
    return this._message;
  }
  set message(message: string) {
    this._message = message;
    this.state = 'opened'
  }

  private _message = '';

  @Output()
  closed = new EventEmitter<void>();
}
