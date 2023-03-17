import {LitElement, html} from 'lit';
import {customElement} from 'lit/decorators.js';

@customElement('user-search')
export class UserSearch extends LitElement {
  override createRenderRoot() {
    return this;
  }

  override render() {
    return html`
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
              <span class="input-group-text border-0" id="search-addon">
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
}
