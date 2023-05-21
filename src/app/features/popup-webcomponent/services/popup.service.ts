import { ApplicationRef, EnvironmentInjector, Injectable, createComponent } from "@angular/core";
import { PopupComponent } from "../components/popup.component";
import { NgElement, WithProperties } from "@angular/elements";

@Injectable()
export class PopupService {
  constructor(
    private injector: EnvironmentInjector,
    private applicationRef: ApplicationRef
  ) {}

  public showAsComponent = (message: string) => {
    const popup = document
      .createElement('popup-component');

    const popupComponentReference = createComponent(PopupComponent, {
      environmentInjector: this.injector, hostElement: popup
    });

    this.applicationRef
      .attachView(popupComponentReference.hostView);

    popupComponentReference
      .instance
      .closed
      .subscribe(() => {
        document
          .body
          .removeChild(popup);

        this.applicationRef
          .detachView(popupComponentReference.hostView)
      })

    popupComponentReference
      .instance
      .message = message;

    document
      .body
      .appendChild(popup);
  }

  public showAsElement = (message: string) => {
    const popupElement: NgElement & WithProperties<PopupComponent> = document
        .createElement('popup-element') as any;

    popupElement
        .addEventListener('closed', () => {
            document
                .body
                .removeChild(popupElement);
        })

    popupElement.message = message;

    document
        .body
        .appendChild(popupElement);
  }

}
