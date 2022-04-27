window.addEventListener("keydown", function (e) {
  if (e.key == "Enter") {
    setChatInputToggle();
  }
});

let chatInput;
let chatInputToggle = false;
let chatPlayerId;

export class Chat {
  constructor() {
    console.log("챗 모듈 실행");
    chatInput = document.createElement("input");
    document.body.appendChild(chatInput);
    chatInput.classList.add("chatInput");
  }

  setPlayerId(playerId) {
    chatPlayerId = playerId;
    console.log(chatPlayerId);
  }
}

function setChatInputToggle() {
  if (!chatInputToggle) {
    chatInputToggle = true;
    chatInput.style.display = "block";
    chatInput.focus();
  } else {
    chatInputToggle = false;
    chatInput.style.display = "none";

    // 채팅 메세지 저장
    console.log(chatPlayerId);
    const playerRef = firebase.database().ref(`players/${chatPlayerId}`);
    // playerRef.set({
    //   id: chatPlayerId,
    //   name: "익명",
    //   x: playerRef.x,
    //   y: playerRef.y,
    //   ani: playerRef.ani,
    //   flipY: playerRef.flipY,
    //   chat: chatInput.value,
    // });

    console.log(playerRef.x);
    console.log(chatInput.value);
    chatInput.value = "";
  }
}
