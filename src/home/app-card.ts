import {LitElement, html} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('app-card')
export class AppCard extends LitElement {
  @property()
  cardtitle = 'Card Title';

  @property()
  cardintro = 'Card Into';

  @property()
  cardctatext = 'Card Text';

  @property()
  cardcta = '/';

  constructor() {
    super();
  }

  override createRenderRoot() {
    return this;
  }

  override render() {
    return html`
      <div class="card" style="width: 18rem;">
        <img src="..." class="card-img-top" alt="..." />
        <div class="card-body">
          <h5 class="card-title">${this.cardtitle}</h5>
          <p class="card-text">${this.cardintro}</p>
          <a href="${this.cardcta}" class="btn btn-primary"
            >${this.cardctatext}</a
          >
        </div>
      </div>
    `;
  }
}
