import {LitElement, html} from 'lit';
import {customElement} from 'lit/decorators.js';
import {User} from '../model';

@customElement('user-profile')
export class UserProfile extends LitElement {
  user: User | undefined;

  edit = false;

  editToggle() {
    this.edit = !this.edit;
    this.requestUpdate();
  }

  override createRenderRoot() {
    return this;
  }

  override connectedCallback(): void {
    const userString = localStorage.getItem('user');
    if (userString) {
      this.user = JSON.parse(userString);
    } else {
      localStorage.clear();
      location.href = '/rtcapp';
    }
    super.connectedCallback();
  }

  override render() {
    return html`
      <div class="container py-5">
        <div class="row">
          <div class="col-lg-4">
            <div class="card mb-4">
              <div class="card-body text-center">
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                  alt="avatar"
                  class="rounded-circle img-fluid"
                  style="width: 150px;"
                />
                <h5 class="my-3">${this.user?.username}</h5>
                <p class="text-muted mb-1">
                  ${this.user?.firstname} ${this.user?.lastname}
                </p>
              </div>
            </div>
          </div>
          <div class="col-lg-8">
            <div class="card mb-4">
              <div class="card-body">
                <div class="row">
                  ${this.edit
                    ? html`
                        <div class="d-flex flex-row align-items-center">
                          <div class="form-outline flex-fill mb-0">
                            <input
                              required
                              type="text"
                              id="username"
                              class="form-control"
                            />
                            <label class="form-label" for="username"
                              >Username</label
                            >
                          </div>
                        </div>
                      `
                    : html` <div class="col-sm-3">
                          <p class="mb-0">Username</p>
                        </div>
                        <div class="col-sm-9">
                          <p class="text-muted mb-0">${this.user?.username}</p>
                        </div>`}
                </div>
                <hr />
                <div class="row">
                  ${this.edit
                    ? html`
                        <div class="d-flex flex-row align-items-center">
                          <div class="form-outline flex-fill mb-0">
                            <input
                              required
                              type="text"
                              id="firstname"
                              class="form-control"
                            />
                            <label class="form-label" for="firstname"
                              >FirstName</label
                            >
                          </div>
                          <hr />
                        </div>
                        <div class="d-flex flex-row align-items-center">
                          <div class="form-outline flex-fill mb-0">
                            <input
                              required
                              type="text"
                              id="lastname"
                              class="form-control"
                            />
                            <label class="form-label" for="lastname"
                              >Lastname</label
                            >
                          </div>
                        </div>
                      `
                    : html` <div class="col-sm-3">
                          <p class="mb-0">First Name</p>
                        </div>
                        <div class="col-sm-3">
                          <p class="text-muted mb-0">${this.user?.firstname}</p>
                        </div>
                        <div class="col-sm-3">
                          <p class="mb-0">Last Name</p>
                        </div>
                        <div class="col-sm-3">
                          <p class="text-muted mb-0">${this.user?.lastname}</p>
                        </div>`}
                </div>
                <hr />
                <div class="row">
                  ${this.edit
                    ? html`
                        <div class="d-flex flex-row align-items-center">
                          <div class="form-outline flex-fill mb-0">
                            <input
                              required
                              type="email"
                              id="email"
                              class="form-control"
                            />
                            <label class="form-label" for="pass">Email</label>
                          </div>
                        </div>
                      `
                    : html` <div class="col-sm-3">
                          <p class="mb-0">Email</p>
                        </div>
                        <div class="col-sm-9">
                          <p class="text-muted mb-0">${this.user?.email}</p>
                        </div>`}
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-4"></div>
          <div class="col-lg-8 ">
            <div class="card mb-4">
              <div class="card-body">
                <div class="d-flex justify-content-center mb-2 ">
                  <button
                    type="button"
                    @click="${this.editToggle}"
                    class="btn btn-primary"
                  >
                    <i
                      class="fas ${!this.edit
                        ? 'fa-pen'
                        : 'fa-save'} fa-lg me-3 fa-fw"
                    ></i>
                    ${!this.edit ? 'Edit' : 'Save'} Account
                  </button>
                  <button type="button" class="btn btn-outline-primary ms-1">
                    <i class="fas fa-key fa-lg me-3 fa-fw"></i>
                    Change Password
                  </button>
                  <button type="button" class="btn btn-outline-danger ms-1">
                    <i class="fas fa-trash fa-lg me-3 fa-fw"></i>
                    Delete account
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}
