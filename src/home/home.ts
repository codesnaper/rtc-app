import {LitElement, html} from 'lit';
import {customElement} from 'lit/decorators.js';

@customElement('app-home')
export class Home extends LitElement {
  showLoginform = true;

  override createRenderRoot() {
    return this;
  }

  toggleForm() {
    this.showLoginform = !this.showLoginform;
    this.requestUpdate();
  }

  override render() {
    return html`
      <section class="vh-100" style="background-color: #eee;">
        <div class="container h-100">
          <div
            class="row d-flex justify-content-center align-items-center h-100"
          >
            <div class="col-lg-12 col-xl-11">
              <div class="card text-black" style="border-radius: 25px;">
                <div class="card-body p-md-5">
                  <p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                    RTC Application
                  </p>
                  <div class="row justify-content-center">
                    <div class="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                      ${this.showLoginform
                        ? html`<app-login
                            @toggleForm="${this.toggleForm}"
                          ></app-login>`
                        : html`<app-register
                            @toggleForm="${this.toggleForm}"
                          ></app-register>`}
                    </div>
                    <div
                      class="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2"
                    >
                      <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                        class="img-fluid"
                        alt="Sample image"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
  }
}
