var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from 'lit';
import { customElement, query, property } from 'lit/decorators.js';
import { PayloadType, UserStatus } from '../model';
let Video = class Video extends LitElement {
    constructor() {
        var _a, _b, _c, _d, _e;
        super();
        this.status = UserStatus[UserStatus.offline];
        this.webcam = false;
        this.audio = false;
        //Configuration user name and password need to take from localstorage once websocket connection success.
        this.configuration = {};
        this.incomingCall = false;
        try {
            this.loginUser = JSON.parse(`${localStorage.getItem('user')}`);
        }
        catch (err) {
            console.log('redirect to login');
        }
        this.startMedia();
        this.websocket = new WebSocket(`ws://localhost:9090/server?token=${(_a = this.loginUser) === null || _a === void 0 ? void 0 : _a.username}:${(_b = this.loginUser) === null || _b === void 0 ? void 0 : _b.password}&from=${(_c = this.loginUser) === null || _c === void 0 ? void 0 : _c.username}`);
        this.serverListner();
        this.configuration = {
            iceServers: [
                {
                    urls: 'stun:172.16.0.2:3478',
                },
                {
                    urls: 'turn:172.16.0.2:3478',
                    username: (_d = this.loginUser) === null || _d === void 0 ? void 0 : _d.username,
                    credential: (_e = this.loginUser) === null || _e === void 0 ? void 0 : _e.password,
                },
            ],
        };
        this.peerConnection = new RTCPeerConnection(this.configuration);
    }
    createRenderRoot() {
        return this;
    }
    startMedia() {
        navigator.mediaDevices
            .getUserMedia({
            audio: this.audio,
            video: this.webcam,
        })
            .then((mediaStream) => {
            if (this._localVideo != undefined) {
                this._localVideo.srcObject = mediaStream;
                this._localVideo.classList.remove('d-none');
            }
        })
            .catch((err) => {
            console.error(err);
        });
    }
    sendStatusPayload(status) {
        var _a;
        this.websocket.send(JSON.stringify({
            type: PayloadType[PayloadType.status],
            status: UserStatus[status],
            recieverUserName: 'server',
            sendUser: {
                username: (_a = this.loginUser) === null || _a === void 0 ? void 0 : _a.username,
            },
        }));
    }
    sendOfferPayload(offer, recieverUsername) {
        var _a;
        this.websocket.send(JSON.stringify({
            type: PayloadType[PayloadType.offer],
            recieverUserName: recieverUsername,
            offer: offer,
            sendUser: {
                username: (_a = this.loginUser) === null || _a === void 0 ? void 0 : _a.username,
            },
        }));
    }
    sendAnswerPayload(answer, recieverUserName) {
        var _a;
        this.websocket.send(JSON.stringify({
            type: PayloadType[PayloadType.offer],
            recieverUserName: recieverUserName,
            answer: answer,
            sendUser: {
                username: (_a = this.loginUser) === null || _a === void 0 ? void 0 : _a.username,
            },
        }));
    }
    serverListner() {
        this.websocket.onopen = () => {
            this.sendStatusPayload(UserStatus.online);
        };
        this.websocket.onmessage = (ev) => {
            const payload = JSON.parse(ev.data);
            switch (payload.type.toString()) {
                case PayloadType[PayloadType.status]:
                    this.status = `${payload.status}`;
                    break;
                case PayloadType[PayloadType.ring]:
                    alert(`Incoming call from ${payload.sendUser.username}`);
                    break;
                default:
                    alert(JSON.stringify(payload));
                    break;
            }
        };
        this.websocket.onclose = () => {
            console.log('redirect to login');
        };
        this.websocket.onerror = () => {
            this.websocket.close();
        };
    }
    async createCall(recieverName) {
        const offer = await this.peerConnection.createOffer();
        await this.peerConnection.setLocalDescription(offer);
        this.sendOfferPayload(offer, recieverName);
    }
    async callStarted(answer) {
        const remoteDesc = new RTCSessionDescription(answer);
        await this.peerConnection.setRemoteDescription(remoteDesc);
    }
    async answerCall(recieverName, offer) {
        this.peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
        const answer = await this.peerConnection.createAnswer();
        await this.peerConnection.setLocalDescription(answer);
        this.sendAnswerPayload(answer, recieverName);
    }
    render() {
        return html `
      <div class="container py-5">
        <div class="row">
          <div class="col-md-12">
            <div class="card" id="chat3" style="border-radius: 15px;">
              <div class="card-body">
                <div class="row">
                  <div class="col-md-6 col-lg-5 col-xl-4 mb-4 mb-md-0">
                    <div class="p-3">
                      <div class="input-group rounded mb-3">
                        <input
                          type="search"
                          class="form-control rounded"
                          placeholder="Search"
                          aria-label="Search"
                          aria-describedby="search-addon"
                        />
                        <span
                          class="input-group-text border-0"
                          id="search-addon"
                        >
                          <i class="fas fa-search"></i>
                        </span>
                      </div>

                      <div
                        data-mdb-perfect-scrollbar="true"
                        style="position: relative; height: 400px"
                      >
                        <ul class="list-unstyled mb-0">
                          <li class="p-2 border-bottom">
                            <a href="#!" class="d-flex justify-content-between">
                              <div class="d-flex flex-row">
                                <div>
                                  <img
                                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                                    alt="avatar"
                                    class="d-flex align-self-center me-3"
                                    width="60"
                                  />
                                  <span
                                    class="badge bg-success badge-dot"
                                  ></span>
                                </div>
                                <div class="pt-1">
                                  <p class="fw-bold mb-0">Marie Horwitz</p>
                                  <p class="small text-muted">
                                    Hello, Are you there?
                                  </p>
                                </div>
                              </div>
                              <div class="pt-1">
                                <p class="small text-muted mb-1">Just now</p>
                                <span
                                  class="badge bg-danger rounded-pill float-end"
                                  >3</span
                                >
                              </div>
                            </a>
                          </li>
                          <li class="p-2 border-bottom">
                            <a href="#!" class="d-flex justify-content-between">
                              <div class="d-flex flex-row">
                                <div>
                                  <img
                                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp"
                                    alt="avatar"
                                    class="d-flex align-self-center me-3"
                                    width="60"
                                  />
                                  <span
                                    class="badge bg-warning badge-dot"
                                  ></span>
                                </div>
                                <div class="pt-1">
                                  <p class="fw-bold mb-0">Alexa Chung</p>
                                  <p class="small text-muted">
                                    Lorem ipsum dolor sit.
                                  </p>
                                </div>
                              </div>
                              <div class="pt-1">
                                <p class="small text-muted mb-1">5 mins ago</p>
                                <span
                                  class="badge bg-danger rounded-pill float-end"
                                  >2</span
                                >
                              </div>
                            </a>
                          </li>
                          <li class="p-2 border-bottom">
                            <a href="#!" class="d-flex justify-content-between">
                              <div class="d-flex flex-row">
                                <div>
                                  <img
                                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3-bg.webp"
                                    alt="avatar"
                                    class="d-flex align-self-center me-3"
                                    width="60"
                                  />
                                  <span
                                    class="badge bg-success badge-dot"
                                  ></span>
                                </div>
                                <div class="pt-1">
                                  <p class="fw-bold mb-0">Danny McChain</p>
                                  <p class="small text-muted">
                                    Lorem ipsum dolor sit.
                                  </p>
                                </div>
                              </div>
                              <div class="pt-1">
                                <p class="small text-muted mb-1">Yesterday</p>
                              </div>
                            </a>
                          </li>
                          <li class="p-2 border-bottom">
                            <a href="#!" class="d-flex justify-content-between">
                              <div class="d-flex flex-row">
                                <div>
                                  <img
                                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava4-bg.webp"
                                    alt="avatar"
                                    class="d-flex align-self-center me-3"
                                    width="60"
                                  />
                                  <span
                                    class="badge bg-danger badge-dot"
                                  ></span>
                                </div>
                                <div class="pt-1">
                                  <p class="fw-bold mb-0">Ashley Olsen</p>
                                  <p class="small text-muted">
                                    Lorem ipsum dolor sit.
                                  </p>
                                </div>
                              </div>
                              <div class="pt-1">
                                <p class="small text-muted mb-1">Yesterday</p>
                              </div>
                            </a>
                          </li>
                          <li class="p-2 border-bottom">
                            <a href="#!" class="d-flex justify-content-between">
                              <div class="d-flex flex-row">
                                <div>
                                  <img
                                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava5-bg.webp"
                                    alt="avatar"
                                    class="d-flex align-self-center me-3"
                                    width="60"
                                  />
                                  <span
                                    class="badge bg-warning badge-dot"
                                  ></span>
                                </div>
                                <div class="pt-1">
                                  <p class="fw-bold mb-0">Kate Moss</p>
                                  <p class="small text-muted">
                                    Lorem ipsum dolor sit.
                                  </p>
                                </div>
                              </div>
                              <div class="pt-1">
                                <p class="small text-muted mb-1">Yesterday</p>
                              </div>
                            </a>
                          </li>
                          <li class="p-2">
                            <a href="#!" class="d-flex justify-content-between">
                              <div class="d-flex flex-row">
                                <div>
                                  <img
                                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava6-bg.webp"
                                    alt="avatar"
                                    class="d-flex align-self-center me-3"
                                    width="60"
                                  />
                                  <span
                                    class="badge bg-success badge-dot"
                                  ></span>
                                </div>
                                <div class="pt-1">
                                  <p class="fw-bold mb-0">Ben Smith</p>
                                  <p class="small text-muted">
                                    Lorem ipsum dolor sit.
                                  </p>
                                </div>
                              </div>
                              <div class="pt-1">
                                <p class="small text-muted mb-1">Yesterday</p>
                              </div>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div class="col-md-6 col-lg-7 col-xl-8">
                    <div
                      class="pt-3 pe-3"
                      data-mdb-perfect-scrollbar="true"
                      style="position: relative; height: 400px"
                    >
                      <div class="d-flex flex-row justify-content-start">
                        <img
                          src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava6-bg.webp"
                          alt="avatar 1"
                          style="width: 45px; height: 100%;"
                        />
                        <div>
                          <p
                            class="small p-2 ms-3 mb-1 rounded-3"
                            style="background-color: #f5f6f7;"
                          >
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua.
                          </p>
                          <p
                            class="small ms-3 mb-3 rounded-3 text-muted float-end"
                          >
                            12:00 PM | Aug 13
                          </p>
                        </div>
                      </div>

                      <div class="d-flex flex-row justify-content-end">
                        <div>
                          <p
                            class="small p-2 me-3 mb-1 text-white rounded-3 bg-primary"
                          >
                            Ut enim ad minim veniam, quis nostrud exercitation
                            ullamco laboris nisi ut aliquip ex ea commodo
                            consequat.
                          </p>
                          <p class="small me-3 mb-3 rounded-3 text-muted">
                            12:00 PM | Aug 13
                          </p>
                        </div>
                        <img
                          src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                          alt="avatar 1"
                          style="width: 45px; height: 100%;"
                        />
                      </div>

                      <div class="d-flex flex-row justify-content-start">
                        <img
                          src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava6-bg.webp"
                          alt="avatar 1"
                          style="width: 45px; height: 100%;"
                        />
                        <div>
                          <p
                            class="small p-2 ms-3 mb-1 rounded-3"
                            style="background-color: #f5f6f7;"
                          >
                            Duis aute irure dolor in reprehenderit in voluptate
                            velit esse cillum dolore eu fugiat nulla pariatur.
                          </p>
                          <p
                            class="small ms-3 mb-3 rounded-3 text-muted float-end"
                          >
                            12:00 PM | Aug 13
                          </p>
                        </div>
                      </div>

                      <div class="d-flex flex-row justify-content-end">
                        <div>
                          <p
                            class="small p-2 me-3 mb-1 text-white rounded-3 bg-primary"
                          >
                            Excepteur sint occaecat cupidatat non proident, sunt
                            in culpa qui officia deserunt mollit anim id est
                            laborum.
                          </p>
                          <p class="small me-3 mb-3 rounded-3 text-muted">
                            12:00 PM | Aug 13
                          </p>
                        </div>
                        <img
                          src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                          alt="avatar 1"
                          style="width: 45px; height: 100%;"
                        />
                      </div>

                      <div class="d-flex flex-row justify-content-start">
                        <img
                          src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava6-bg.webp"
                          alt="avatar 1"
                          style="width: 45px; height: 100%;"
                        />
                        <div>
                          <p
                            class="small p-2 ms-3 mb-1 rounded-3"
                            style="background-color: #f5f6f7;"
                          >
                            Sed ut perspiciatis unde omnis iste natus error sit
                            voluptatem accusantium doloremque laudantium, totam
                            rem aperiam, eaque ipsa quae ab illo inventore
                            veritatis et quasi architecto beatae vitae dicta
                            sunt explicabo.
                          </p>
                          <p
                            class="small ms-3 mb-3 rounded-3 text-muted float-end"
                          >
                            12:00 PM | Aug 13
                          </p>
                        </div>
                      </div>

                      <div class="d-flex flex-row justify-content-end">
                        <div>
                          <p
                            class="small p-2 me-3 mb-1 text-white rounded-3 bg-primary"
                          >
                            Nemo enim ipsam voluptatem quia voluptas sit
                            aspernatur aut odit aut fugit, sed quia consequuntur
                            magni dolores eos qui ratione voluptatem sequi
                            nesciunt.
                          </p>
                          <p class="small me-3 mb-3 rounded-3 text-muted">
                            12:00 PM | Aug 13
                          </p>
                        </div>
                        <img
                          src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                          alt="avatar 1"
                          style="width: 45px; height: 100%;"
                        />
                      </div>

                      <div class="d-flex flex-row justify-content-start">
                        <img
                          src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava6-bg.webp"
                          alt="avatar 1"
                          style="width: 45px; height: 100%;"
                        />
                        <div>
                          <p
                            class="small p-2 ms-3 mb-1 rounded-3"
                            style="background-color: #f5f6f7;"
                          >
                            Neque porro quisquam est, qui dolorem ipsum quia
                            dolor sit amet, consectetur, adipisci velit, sed
                            quia non numquam eius modi tempora incidunt ut
                            labore et dolore magnam aliquam quaerat voluptatem.
                          </p>
                          <p
                            class="small ms-3 mb-3 rounded-3 text-muted float-end"
                          >
                            12:00 PM | Aug 13
                          </p>
                        </div>
                      </div>

                      <div class="d-flex flex-row justify-content-end">
                        <div>
                          <p
                            class="small p-2 me-3 mb-1 text-white rounded-3 bg-primary"
                          >
                            Ut enim ad minima veniam, quis nostrum
                            exercitationem ullam corporis suscipit laboriosam,
                            nisi ut aliquid ex ea commodi consequatur?
                          </p>
                          <p class="small me-3 mb-3 rounded-3 text-muted">
                            12:00 PM | Aug 13
                          </p>
                        </div>
                        <img
                          src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                          alt="avatar 1"
                          style="width: 45px; height: 100%;"
                        />
                      </div>
                    </div>

                    <div
                      class="text-muted d-flex justify-content-start align-items-center pe-3 pt-3 mt-2"
                    >
                      <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava6-bg.webp"
                        alt="avatar 3"
                        style="width: 40px; height: 100%;"
                      />
                      <input
                        type="text"
                        class="form-control form-control-lg"
                        id="exampleFormControlInput2"
                        placeholder="Type message"
                      />
                      <a class="ms-1 text-muted" href="#!"
                        ><i class="fas fa-paperclip"></i
                      ></a>
                      <a class="ms-3 text-muted" href="#!"
                        ><i class="fas fa-smile"></i
                      ></a>
                      <a class="ms-3" href="#!"
                        ><i class="fas fa-paper-plane"></i
                      ></a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
    }
};
__decorate([
    query('#local-video')
], Video.prototype, "_localVideo", void 0);
__decorate([
    property()
], Video.prototype, "status", void 0);
__decorate([
    property()
], Video.prototype, "webcam", void 0);
__decorate([
    property()
], Video.prototype, "audio", void 0);
Video = __decorate([
    customElement('app-video')
], Video);
export { Video };
//# sourceMappingURL=video.js.map