import {LitElement, html} from 'lit';
import {customElement} from 'lit/decorators.js';

@customElement('app-home')
export class AppHome extends LitElement {
  constructor() {
    super();
  }

  override createRenderRoot() {
    return this;
  }

  override render() {
    return html`
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
}
