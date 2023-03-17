import {LitElement, html} from 'lit';
import {customElement} from 'lit/decorators.js';

@customElement('user-card')
export class UserCard extends LitElement {
  override createRenderRoot() {
    return this;
  }

  override render() {
    return html`
      <div class="row justify-content-center align-items-center h-100">
        <div class="col-12 mb-4 mb-lg-0">
          <div class="card mb-3" style="border-radius: .5rem;">
            <div class="row g-0">
              <div
                class="col-md-4 gradient-custom text-center text-white"
                style="border-top-left-radius: .5rem; border-bottom-left-radius: .5rem;"
              >
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                  alt="Avatar"
                  class="img-fluid my-5"
                  style="width: 80px;"
                />
              </div>
              <div class="col-md-8">
                <div class="card-body p-4">
                  <h6>Information</h6>
                  <hr class="mt-0 mb-4" />
                  <div class="row pt-1">
                    <div class="col-6 mb-3">
                      <h6>Email</h6>
                      <p class="text-muted">info@example.com</p>
                    </div>
                    <div class="col-6 mb-3">
                      <h6>Phone</h6>
                      <p class="text-muted">123 456 789</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}
