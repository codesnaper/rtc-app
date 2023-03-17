import {LitElement, html} from 'lit';
import {customElement} from 'lit/decorators.js';

@customElement('app-tile')
export class Tile extends LitElement {
  override createRenderRoot() {
    return this;
  }

  override render() {
    return html`
      <div class="container h-100">
        <div class="row d-flex justify-content-center align-items-center h-100">
          <div class="row row-cols-1 row-cols-md-3 g-4">
            <div class="col-4">
              <div class="card bg-success text-white text-center mb-4">
                <div class="card-body">
                  <h5 class="card-title">Video Application</h5>
                  <p>
                    Video application. Make video call with friend, use webrtc
                    to transmit data and no data is save on server
                  </p>
                </div>
                <div class="d-flex flex-row">
                  <a
                    type="button"
                    href="/rtcapp/video.html"
                    class="btn btn-primary flex-fill me-1"
                    data-mdb-ripple-color="dark"
                  >
                    Go To App
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}
