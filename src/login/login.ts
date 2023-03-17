import {LitElement, html} from 'lit';
import {customElement, query} from 'lit/decorators.js';
import {User} from '../model';

@customElement('app-login')
export class Login extends LitElement {
  private inputForm: {
    username?: string;
    password?: string;
  } = {};

  @query('#username')
  _username: HTMLInputElement | undefined;

  @query('#pass')
  _password: HTMLInputElement | undefined;

  override createRenderRoot() {
    return this;
  }

  override connectedCallback(): void {
    const token: string | null = localStorage.getItem('token');
    if (token != null) {
      const requestOptions: RequestInit = {
        method: 'GET',
        redirect: 'follow',
      };
      fetch(`http://localhost:8081/verifyToken?token=${token}`, requestOptions)
        .then((response) => response.json())
        .then((result: {token: string; user: User}) => {
          localStorage.setItem('token', result.token);
          localStorage.setItem('user', JSON.stringify(result.user));
          window.location.href = '/rtcapp/home.html';
        })
        .catch((error) => console.log('error', error));
    }
    super.connectedCallback();
  }

  login() {
    this.inputForm.username = this._username?.value;
    this.inputForm.password = this._password?.value;
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    const raw = JSON.stringify({
      username: `${this.inputForm.username}`,
      password: `${this.inputForm.password}`,
    });
    const requestOptions: RequestInit = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };
    console.log(JSON.stringify(raw));
    fetch('http://localhost:8081/login', requestOptions)
      .then((response) => response.json())
      .then((result: {token: string; user: User}) => {
        localStorage.setItem('token', result.token);
        localStorage.setItem('user', JSON.stringify(result.user));
        window.location.href = '/rtcapp/home.html';
      })
      .catch((error) => console.log('error', error));
  }

  toggleForm() {
    const registerForm = new CustomEvent('toggleForm', {
      detail: {message: ''},
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(registerForm);
  }

  override render() {
    return html`
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
}
