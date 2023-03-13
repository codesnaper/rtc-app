var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
let AppHome = class AppHome extends LitElement {
    constructor() {
        super();
    }
    createRenderRoot() {
        return this;
    }
    render() {
        return html `
      <div class="container py-3">
        <app-header></app-header>
        <div class="row">
          <div class="col">
            <app-card
              cardtitle="File Sharing"
              cardintro="Application to share file between your friend. Your system
              will act as server and upload file and your friend will
              download file"
              cardctatext="File Shard"
              cardcta="/share.html"
            ></app-card>
          </div>
        </div>
      </div>
    `;
    }
};
AppHome = __decorate([
    customElement('app-home')
], AppHome);
export { AppHome };
//# sourceMappingURL=app-home.js.map