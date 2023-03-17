import {LitElement, html, css} from 'lit';
import {customElement, query, property} from 'lit/decorators.js';
import {LoginUser, Payload, PayloadType, UserStatus} from '../model';
@customElement('app-video')
export class AppVideoCall extends LitElement {
  static override styles = css`
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

  @query('#local-video')
  _localVideo: HTMLVideoElement | undefined;

  @property()
  status = UserStatus[UserStatus.offline];

  @property()
  webcam = false;

  @property()
  audio = false;

  recieverName: string | undefined;

  incomingCall: boolean;

  loginUser: LoginUser | undefined;

  websocket: WebSocket;

  peerConnection: RTCPeerConnection;

  //Configuration user name and password need to take from localstorage once websocket connection success.
  configuration = {};

  startMedia() {
    navigator.mediaDevices
      .getUserMedia({
        audio: this.audio,
        video: this.webcam,
      })
      .then((mediaStream: MediaStream) => {
        if (this._localVideo != undefined) {
          this._localVideo.srcObject = mediaStream;
          this._localVideo.classList.remove('d-none');
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }

  sendStatusPayload(status: UserStatus) {
    this.websocket.send(
      JSON.stringify({
        type: PayloadType[PayloadType.status],
        status: UserStatus[status],
        recieverUserName: 'server',
        sendUser: {
          username: this.loginUser?.username,
        },
      })
    );
  }

  sendOfferPayload(offer: object, recieverUsername: string) {
    this.websocket.send(
      JSON.stringify({
        type: PayloadType[PayloadType.offer],
        recieverUserName: recieverUsername,
        offer: offer,
        sendUser: {
          username: this.loginUser?.username,
        },
      })
    );
  }

  sendAnswerPayload(answer: object, recieverUserName: string) {
    this.websocket.send(
      JSON.stringify({
        type: PayloadType[PayloadType.offer],
        recieverUserName: recieverUserName,
        answer: answer,
        sendUser: {
          username: this.loginUser?.username,
        },
      })
    );
  }

  serverListner() {
    this.websocket.onopen = () => {
      this.sendStatusPayload(UserStatus.online);
    };
    this.websocket.onmessage = (ev: MessageEvent) => {
      const payload: Payload = JSON.parse(ev.data) as Payload;
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

  async createCall(recieverName: string) {
    const offer = await this.peerConnection.createOffer();
    await this.peerConnection.setLocalDescription(offer);
    this.sendOfferPayload(offer, recieverName);
  }

  async callStarted(answer: RTCSessionDescriptionInit) {
    const remoteDesc = new RTCSessionDescription(answer);
    await this.peerConnection.setRemoteDescription(remoteDesc);
  }

  async answerCall(recieverName: string, offer: RTCSessionDescriptionInit) {
    this.peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
    const answer = await this.peerConnection.createAnswer();
    await this.peerConnection.setLocalDescription(answer);
    this.sendAnswerPayload(answer, recieverName);
  }

  constructor() {
    super();
    this.incomingCall = false;
    try {
      this.loginUser = JSON.parse(
        `${localStorage.getItem('user')}`
      ) as LoginUser;
    } catch (err) {
      console.log('redirect to login');
    }
    this.startMedia();
    this.websocket = new WebSocket(
      `ws://localhost:9090/server?token=${this.loginUser?.username}:${this.loginUser?.password}&from=${this.loginUser?.username}`
    );
    this.serverListner();
    this.configuration = {
      iceServers: [
        {
          urls: 'stun:172.16.0.2:3478',
        },
        {
          urls: 'turn:172.16.0.2:3478',
          username: this.loginUser?.username,
          credential: this.loginUser?.password,
        },
      ],
    };
    this.peerConnection = new RTCPeerConnection(this.configuration);
  }

  override render() {
    return html`
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
}
