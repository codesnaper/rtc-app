var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
let AppCard = class AppCard extends LitElement {
    constructor() {
        super();
        this.cardtitle = 'Card Title';
        this.cardintro = 'Card Into';
        this.cardctatext = 'Card Text';
        this.cardcta = '/';
    }
    createRenderRoot() {
        return this;
    }
    render() {
        return html `
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
};
__decorate([
    property()
], AppCard.prototype, "cardtitle", void 0);
__decorate([
    property()
], AppCard.prototype, "cardintro", void 0);
__decorate([
    property()
], AppCard.prototype, "cardctatext", void 0);
__decorate([
    property()
], AppCard.prototype, "cardcta", void 0);
AppCard = __decorate([
    customElement('app-card')
], AppCard);
export { AppCard };
//# sourceMappingURL=app-card.js.map