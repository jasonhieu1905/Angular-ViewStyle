import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import {
  Component,
  NgModule,
  Input,
  Output,
  EventEmitter,
  ViewEncapsulation
} from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

class Card {
  public setup: string;
  public punchline: string;

  constructor(setup: string, punchline: string) {
    this.setup = setup;
    this.punchline = punchline;
  }
}

@Component({
  selector: "card-customized",
  templateUrl: "card-component.html",
  styleUrls: ["card-customized-component.css"],
  encapsulation: ViewEncapsulation.Emulated
  // encapsulation: ViewEncapsulation.Native
  // encapsulation: ViewEncapsulation.None
})
class CardCustomizedComponent {
  @Input("card") data: Card;
}

@Component({
  selector: "card",
  templateUrl: 'card-component.html'
})
class CardComponent {
  @Input("card") data: Card;
}

@Component({
  selector: "card-list",
  template: `
<card-customized [card]="customizedCard"></card-customized>
<card *ngFor="let j of cards" [card]="j"></card>
  `
})
class CardListComponent {
  cards: Card[];
  customizedCard = new Card("Customized card title", "Customized content");

  constructor() {
    this.cards = [
      new Card(
        "Card1",
        "Content1"
      ),
      new Card(
        "Card2",
        "Content2"
      ),
      new Card(
        "Card3",
        "Content3"
      )
    ];
  }

}

@Component({
  selector: "app",
  template: `
<card-list></card-list>
  `
})
class AppComponent {}

@NgModule({
  imports: [BrowserModule],
  declarations: [
    AppComponent,
    CardComponent,
    CardListComponent,
    CardCustomizedComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule);