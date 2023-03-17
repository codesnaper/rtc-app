import {LitElement, html} from 'lit';
import {customElement} from 'lit/decorators.js';

@customElement('app-footer')
export class Footer extends LitElement {
  override createRenderRoot() {
    return this;
  }

  override render() {
    return html`
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
}
