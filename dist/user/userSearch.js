var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
let UserSearch = class UserSearch extends LitElement {
    createRenderRoot() {
        return this;
    }
    render() {
        return html `
      <div class="container">
        <div class="row d-flex justify-content-center">
          <div class="col-8 my-3">
          <div class="input-group rounded mb-3">
          <input
            type="search"
            class="form-control rounded"
            placeholder="Search"
            aria-label="Search"
            aria-describedby="search-addon"
          />
          <span
            class="input-group-text border-0"
            id="search-addon"
          >
            <i class="fas fa-search"></i>
          </span>
        </div>
          </div>
          <div class="col-8 my-2">
              <user-card></user-card>
          </div>
          <div class="col-8 my-2">
              <user-card></user-card>
          </div>
        </div>
      </div>
    `;
    }
};
UserSearch = __decorate([
    customElement('user-search')
], UserSearch);
export { UserSearch };
//# sourceMappingURL=userSearch.js.map