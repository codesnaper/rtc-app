var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from 'lit';
import { customElement, query } from 'lit/decorators.js';
let Register = class Register extends LitElement {
    createRenderRoot() {
        return this;
    }
    register() {
        const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        const raw = JSON.stringify({
            firstname: this._firstname,
            lastname: this._lastname,
            email: this._email,
            username: this._username,
            password: this._password,
        });
        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow',
        };
        fetch('http://localhost:8081/addUser', requestOptions)
            .then((response) => response.json())
            .then(() => {
            location.href = '/rtcapp';
        })
            .catch((error) => console.log('error', error));
    }
    toggleForm() {
        const registerForm = new CustomEvent('toggleForm', {
            detail: { message: '' },
            bubbles: true,
            composed: true,
        });
        this.dispatchEvent(registerForm);
    }
    render() {
        return html `
      <p class="text-center h3 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

      <form class="mx-1 mx-md-4" id="registerform">
        <div class="d-flex flex-row align-items-center mb-4">
          <i class="fas fa-user fa-lg me-3 fa-fw"></i>
          <div class="form-outline flex-fill mb-0">
            <input
              type="text"
              name="firstname"
              id="firstname"
              class="form-control"
            />
            <label class="form-label" for="firstname">First Name</label>
          </div>
          <div class="form-outline flex-fill mb-0">
            <input
              type="text"
              name="lastname"
              id="lastname"
              class="form-control"
            />
            <label class="form-label" for="lastname">Last Name</label>
          </div>
        </div>

        <div class="d-flex flex-row align-items-center mb-4">
          <i class="fas fa-envelope fa-lg me-3 fa-fw"></i>
          <div class="form-outline flex-fill mb-0">
            <input type="email" name="email" id="email" class="form-control" />
            <label class="form-label" for="email">Email</label>
          </div>
        </div>

        <div class="d-flex flex-row align-items-center mb-4">
          <i class="fas fa-user fa-lg me-3 fa-fw"></i>
          <div class="form-outline flex-fill mb-0">
            <input
              type="text"
              name="username"
              id="username"
              class="form-control"
            />
            <label class="form-label" for="username">UserName</label>
          </div>
        </div>

        <div class="d-flex flex-row align-items-center mb-4">
          <i class="fas fa-lock fa-lg me-3 fa-fw"></i>
          <div class="form-outline flex-fill mb-0">
            <input
              type="password"
              name="password"
              id="password"
              class="form-control"
            />
            <label class="form-label" for="password">Password</label>
          </div>
        </div>

        <div class="form-check d-flex justify-content-center mb-5">
          <input
            class="form-check-input me-2"
            type="checkbox"
            checked
            disabled
            id="form2Example3c"
          />
          <label class="form-check-label" for="form2Example3">
            By register agree all statements <a href="#!">Terms of service</a>
          </label>
        </div>

        <div class="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
          <button
            type="button"
            class="btn btn-primary btn-lg me-4"
            @click="${this.register}"
          >
            <i class="fas fa-user-plus fa-lg me-3 fa-fw"></i>
            Register
          </button>
          <button
            type="button"
            class="btn btn-secondary btn-lg"
            @click="${this.toggleForm}"
          >
            <i class="fas fa-sign-in-alt fa-lg me-3 fa-fw"></i>
            Login
          </button>
        </div>
      </form>
    `;
    }
};
__decorate([
    query('#firstname')
], Register.prototype, "_firstname", void 0);
__decorate([
    query('#lastname')
], Register.prototype, "_lastname", void 0);
__decorate([
    query('#email')
], Register.prototype, "_email", void 0);
__decorate([
    query('#username')
], Register.prototype, "_username", void 0);
__decorate([
    query('#password')
], Register.prototype, "_password", void 0);
Register = __decorate([
    customElement('app-register')
], Register);
export { Register };
//# sourceMappingURL=register.js.map