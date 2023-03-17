var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
let UserProfile = class UserProfile extends LitElement {
    constructor() {
        super(...arguments);
        this.edit = false;
    }
    editToggle() {
        this.edit = !this.edit;
        this.requestUpdate();
    }
    createRenderRoot() {
        return this;
    }
    connectedCallback() {
        const userString = localStorage.getItem('user');
        if (userString) {
            this.user = JSON.parse(userString);
        }
        else {
            localStorage.clear();
            location.href = '/rtcapp';
        }
        super.connectedCallback();
    }
    render() {
        var _a, _b, _c, _d, _e, _f, _g;
        return html `
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
                <h5 class="my-3">${(_a = this.user) === null || _a === void 0 ? void 0 : _a.username}</h5>
                <p class="text-muted mb-1">
                  ${(_b = this.user) === null || _b === void 0 ? void 0 : _b.firstname} ${(_c = this.user) === null || _c === void 0 ? void 0 : _c.lastname}
                </p>
              </div>
            </div>
          </div>
          <div class="col-lg-8">
            <div class="card mb-4">
              <div class="card-body">
                <div class="row">
                  ${this.edit
            ? html `
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
            : html ` <div class="col-sm-3">
                          <p class="mb-0">Username</p>
                        </div>
                        <div class="col-sm-9">
                          <p class="text-muted mb-0">${(_d = this.user) === null || _d === void 0 ? void 0 : _d.username}</p>
                        </div>`}
                </div>
                <hr />
                <div class="row">
                  ${this.edit
            ? html `
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
            : html ` <div class="col-sm-3">
                          <p class="mb-0">First Name</p>
                        </div>
                        <div class="col-sm-3">
                          <p class="text-muted mb-0">${(_e = this.user) === null || _e === void 0 ? void 0 : _e.firstname}</p>
                        </div>
                        <div class="col-sm-3">
                          <p class="mb-0">Last Name</p>
                        </div>
                        <div class="col-sm-3">
                          <p class="text-muted mb-0">${(_f = this.user) === null || _f === void 0 ? void 0 : _f.lastname}</p>
                        </div>`}
                </div>
                <hr />
                <div class="row">
                  ${this.edit
            ? html `
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
            : html ` <div class="col-sm-3">
                          <p class="mb-0">Email</p>
                        </div>
                        <div class="col-sm-9">
                          <p class="text-muted mb-0">${(_g = this.user) === null || _g === void 0 ? void 0 : _g.email}</p>
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
};
UserProfile = __decorate([
    customElement('user-profile')
], UserProfile);
export { UserProfile };
//# sourceMappingURL=userProfile.js.map