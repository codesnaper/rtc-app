var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css } from 'lit';
import { customElement, query, property } from 'lit/decorators.js';
let AppVideoCall = class AppVideoCall extends LitElement {
    constructor() {
        super();
        this.online = false;
        this.configuration = {
            iceServers: [
                {
                    urls: 'stun:172.16.0.2:3478',
                },
                {
                    urls: 'turn:172.16.0.2:3478',
                    username: '1856502e07bd3501714bc836',
                    credential: 'AzvsD7QvPrXjf1+y',
                },
            ],
        };
        localStorage.setItem('user', JSON.stringify({
            username: 'shubham',
            password: 'password',
        }));
        navigator.mediaDevices
            .getUserMedia({
            audio: false,
            video: true,
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
        this.wssConnection = new WebSocket('ws://localhost:9090');
        if (localStorage.getItem('user') != null) {
            const localuser = {
                username: 'shubham',
                password: 'password',
            };
            this.wssConnection.onopen = () => {
                this.online = true;
                this.wssConnection.send(JSON.stringify({
                    type: 'status',
                    username: localuser === null || localuser === void 0 ? void 0 : localuser.username,
                    password: localuser === null || localuser === void 0 ? void 0 : localuser.password
                }));
                console.log('Online');
            };
        }
        else {
            this.wssConnection.close();
        }
        this.wssConnection.onclose = () => {
            this.online = false;
            console.log('Offline');
        };
    }
    async makeCall() {
        const peerConnection = new RTCPeerConnection(this.configuration);
        const offer = await peerConnection.createOffer({
            offerToReceiveAudio: true,
            offerToReceiveVideo: true,
        });
        await peerConnection.setLocalDescription(offer);
    }
    render() {
        return html `
      <div class="container">
      <div class="top-icons">
          <img src="https://i.postimg.cc/cCpcXrSV/search.png">
          <img src="https://i.postimg.cc/Pqy2TXWw/menu.png">
      </div>
      <div class="row">
          <div class="col-1">
              <img src="https://i.postimg.cc/521rVkhD/image.png" class="host-img">
              <div class="contarols">
                  <img src="https://i.postimg.cc/3NVtVtgf/chat.png">
                  <img src="https://i.postimg.cc/BQPYHG0r/disconnect.png">
                  <img src="https://i.postimg.cc/fyJH8G00/call.png" class="call-icon">
                  <img src="https://i.postimg.cc/bJFgSmFY/mic.png">
                  <img src="https://i.postimg.cc/Y2sDvCJN/cast.png">
              </div>
          </div>
          <div class="col-2">
              <div class="joined">
                  <p>People Joined</p>
                  <div>
                    <video class="d-none" id="local-video" autoplay=""></video>
                  </div>
              </div>
              <div class="invite">
                  <p>Invite More People</p>
                  <div>
                      <img src="https://i.postimg.cc/7LHjgQXS/user-1.png">
                  </div>
              </div>
          </div>
      </div>
  </div>
</div>
    `;
    }
};
AppVideoCall.styles = css `
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      font-family: 'poppins', sans-serif;
    }
    .header {
      width: 100%;
      height: 100vh;
      background: #00122e;
      position: relative;
    }
    nav {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      background: #182842;
      width: 120px;
      padding: 10px 0;
    }
    nav .logo {
      width: 56px;
      display: block;
      margin: auto;
      cursor: pointer;
    }
    nav ul {
      margin-top: 160px;
    }
    nav ul li {
      list-style: none;
    }
    nav ul li img {
      width: 50px;
      display: block;
      margin: 10px auto;
      padding: 10px;
      cursor: pointer;
      opacity: 0.5;
      border-radius: 10px;
      transition: opacity 0.5s, background 0.5s;
    }
    nav ul li img:hover {
      opacity: 1;
      background: #4d6181;
    }
    .active {
      opacity: 1;
      background: #4d6181;
    }
    .container {
      margin-left: 120px;
      padding: 0 2.5%;
    }
    .top-icons {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      padding: 25px 0;
    }
    .top-icons img {
      width: 25px;
      margin-left: 40px;
      cursor: pointer;
    }
    .row {
      margin-top: 15px;
      display: flex;
      justify-content: space-between;
    }
    .col-1 {
      flex-basis: 65%;
    }
    .col-2 {
      flex-basis: 33%;
    }
    .host-img {
      width: 100%;
      border-radius: 15px;
    }
    .contarols {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .contarols img {
      width: 40px;
      margin: 20px 10px;
      cursor: pointer;
      transition: transform 0.5s;
    }
    .contarols .call-icon {
      width: 70px;
    }
    .contarols img:hover {
      transform: translateY(-10px);
    }
    .joined {
      background: #182842;
      border-radius: 15px;
      padding: 30px 40px 50px;
      color: #fff;
    }
    .joined div {
      margin-top: 20px;
      display: grid;
      grid-template-columns: auto auto auto;
      grid-gap: 20px;
    }
    .joined img {
      width: 100%;
      border-radius: 10px;
      cursor: pointer;
    }
    .invite {
      background: #182842;
      border-radius: 15px;
      padding: 30px 40px 50px;
      color: #fff;
      margin-top: 20px;
    }
    .invite img {
      margin-top: 20px;
      width: 50px;
      margin-left: 5px;
      border-radius: 50%;
      cursor: pointer;
    }
    #local-video {
      height: 107px;
    }
  `;
__decorate([
    query('#local-video')
], AppVideoCall.prototype, "_localVideo", void 0);
__decorate([
    property()
], AppVideoCall.prototype, "online", void 0);
AppVideoCall = __decorate([
    customElement('app-video')
], AppVideoCall);
export { AppVideoCall };
//# sourceMappingURL=app-video.js.map