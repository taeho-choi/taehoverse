// window.addEventListener("keydown", function (e) {
//   if (e.key == "Enter") {
//     setChatInputToggle();
//   }
// });

export class Chat {
  constructor() {
    this.chatInput = document.createElement("input");
    document.body.appendChild(this.chatInput);
    this.chatInput.classList.add("chatInput");

    this.chatInputToggle = false;
    this.chatPlayerId;

    this.currentChat;

    this.chatLogWrap = document.getElementsByClassName("chatLog")[0];
    this.chatLog = document.getElementsByClassName("chatLogText")[0];
    this.chatData = [];
    this.chatLog.scrollTo(0, 99999);
  }

  setPlayerId(playerId) {
    this.chatPlayerId = playerId;
  }

  setChatInputToggle() {
    if (!this.chatInputToggle) {
      this.chatInputToggle = true;
      this.chatInput.style.display = "block";
      this.chatInput.focus();
    } else {
      // 채팅 메세지 저장
      if (this.chatInput.value !== "") {
        firebase
          .database()
          .ref(`players/${this.chatPlayerId}`)
          .update({
            ["chat"]: this.chatInput.value,
          });

        this.currentChat = this.chatInput.value;
      }

      if (this.chatInput.value == "") {
        this.chatInputToggle = false;
        this.chatInput.style.display = "none";
      }

      this.chatInput.value = "";
    }
  }

  clearChatBox() {
    firebase
      .database()
      .ref(`players/${this.chatPlayerId}`)
      .update({
        ["chat"]: "",
      });
  }
}
