var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from 'lit';
import { customElement, query } from 'lit/decorators.js';
let Login = class Login extends LitElement {
    constructor() {
        super(...arguments);
        this.inputForm = {};
    }
    createRenderRoot() {
        return this;
    }
    connectedCallback() {
        const token = localStorage.getItem('token');
        if (token != null) {
            const requestOptions = {
                method: 'GET',
                redirect: 'follow',
            };
            fetch(`http://localhost:8081/verifyToken?token=${token}`, requestOptions)
                .then((response) => response.json())
                .then((result) => {
                localStorage.setItem('token', result.token);
                localStorage.setItem('user', JSON.stringify(result.user));
                window.location.href = '/rtcapp/home.html';
            })
                .catch((error) => console.log('error', error));
        }
        super.connectedCallback();
    }
    login() {
        var _a, _b;
        this.inputForm.username = (_a = this._username) === null || _a === void 0 ? void 0 : _a.value;
        this.inputForm.password = (_b = this._password) === null || _b === void 0 ? void 0 : _b.value;
        const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        const raw = JSON.stringify({
            username: `${this.inputForm.username}`,
            password: `${this.inputForm.password}`,
        });
        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow',
        };
        console.log(JSON.stringify(raw));
        fetch('http://localhost:8081/login', requestOptions)
            .then((response) => response.json())
            .then((result) => {
            localStorage.setItem('token', result.token);
            localStorage.setItem('user', JSON.stringify(result.user));
            window.location.href = '/rtcapp/home.html';
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
      <p class="text-center h3 fw-bold mb-5 mx-1 mx-md-4 mt-4">Login</p>

      <form class="mx-1 mx-md-4">
        <div class="d-flex flex-row align-items-center mb-4">
          <i class="fas fa-user fa-lg me-3 fa-fw"></i>
          <div class="form-outline flex-fill mb-0">
            <input required type="text" id="username" class="form-control" />
            <label class="form-label" for="username">User Name</label>
          </div>
        </div>

        <div class="d-flex flex-row align-items-center mb-4">
          <i class="fas fa-lock fa-lg me-3 fa-fw"></i>
          <div class="form-outline flex-fill mb-0">
            <input required type="password" id="pass" class="form-control" />
            <label class="form-label" for="pass">Password</label>
          </div>
        </div>

        <div class="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
          <button
            type="button"
            class="btn btn-primary btn-lg me-4"
            @click="${this.login}"
          >
            <i class="fas fa-sign-in-alt fa-lg me-3 fa-fw"></i>
            Login
          </button>
          <button
            type="button"
            class="btn btn-secondary btn-lg"
            @click="${this.toggleForm}"
          >
            <i class="fas fa-user-plus fa-lg me-3 fa-fw"></i>
            Register
          </button>
        </div>
      </form>
    `;
    }
};
__decorate([
    query('#username')
], Login.prototype, "_username", void 0);
__decorate([
    query('#pass')
], Login.prototype, "_password", void 0);
Login = __decorate([
    customElement('app-login')
], Login);
export { Login };
//# sourceMappingURL=login.js.map