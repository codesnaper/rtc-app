var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
let Tile = class Tile extends LitElement {
    createRenderRoot() {
        return this;
    }
    render() {
        return html `
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
};
Tile = __decorate([
    customElement('app-tile')
], Tile);
export { Tile };
//# sourceMappingURL=tile.js.map