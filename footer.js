export class Footer {
  constructor() {
    this.footerName = document.getElementById("footerName");
    this.changeNicknameBtn = document.getElementById("changeNicknameBtn");
    this.portfolioLink = document.getElementById("portfolioLink");

    this.changeNicknameBtn.onclick = () => {
      this.onClickChangeNickname(this.uid);
    };
    this.portfolioLink.onclick = () => {
      window.open("https://taeho-choi.github.io/taeho-choi-portfolio", "_self");
    };

    this.changeNicknameModal;
    this.nicknameInput;
    this.submitModalBtn;
    this.cancelModalBtn;
    this.uid;
  }

  changeNickname(id, newNickname) {
    firebase
      .database()
      .ref(`players/${id}`)
      .update({
        ["name"]: newNickname,
      });

    this.footerName.innerText = `닉네임 : ${newNickname}`;
    this.uid = id;
  }

  onClickChangeNickname(id) {
    if (this.changeNicknameModal) {
      this.changeNicknameModal.remove();
      this.changeNicknameModal = undefined;
    } else {
      this.changeNicknameModal = document.createElement("div");
      this.changeNicknameModal.classList.add("changeNickameModal");
      this.changeNicknameModal.innerText = "변경할 닉네임을 입력하세요.";
      document.body.appendChild(this.changeNicknameModal);

      this.nicknameInput = document.createElement("input");
      this.changeNicknameModal.appendChild(this.nicknameInput);

      this.submitModalBtn = document.createElement("button");
      this.submitModalBtn.innerText = "변경하기";
      this.changeNicknameModal.appendChild(this.submitModalBtn);
      this.submitModalBtn.onclick = () => {
        this.changeNickname(id, this.nicknameInput.value);
        if (this.changeNicknameModal) {
          this.changeNicknameModal.remove();
          this.changeNicknameModal = undefined;
        }
      };

      this.cancelModalBtn = document.createElement("button");
      this.cancelModalBtn.innerText = "취소하기";
      this.changeNicknameModal.appendChild(this.cancelModalBtn);
      this.cancelModalBtn.onclick = () => {
        if (this.changeNicknameModal) {
          this.changeNicknameModal.remove();
          this.changeNicknameModal = undefined;
        }
      };
    }
  }
}
