var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
let Footer = class Footer extends LitElement {
    createRenderRoot() {
        return this;
    }
    render() {
        return html `
      <!-- Footer -->
      <footer
        class="bg-primary text-center text-white position-absolute top-100 start-0"
      >
        <!-- Grid container -->
        <div class="container p-4 pb-0">
          <!-- Section: Social media -->
          <section class="mb-4">
            <!-- Linkedin -->
            <a
              class="btn btn-outline-light btn-floating m-1"
              href="#!"
              role="button"
              ><i class="fab fa-linkedin-in"></i
            ></a>

            <!-- Github -->
            <a
              class="btn btn-outline-light btn-floating m-1"
              href="#!"
              role="button"
              ><i class="fab fa-github"></i
            ></a>
          </section>
          <!-- Section: Social media -->
        </div>
        <!-- Grid container -->

        <!-- Copyright -->
        <div
          class="text-center p-3"
          style="background-color: rgba(0, 0, 0, 0.2);"
        >
          © 2023 Copyright:
          <a class="text-white" href="https://mdbootstrap.com/">Codesnaper</a>
        </div>
        <!-- Copyright -->
      </footer>
    `;
    }
};
Footer = __decorate([
    customElement('app-footer')
], Footer);
export { Footer };
//# sourceMappingURL=footer.js.map