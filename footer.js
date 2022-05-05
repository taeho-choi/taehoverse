export class Footer {
  constructor() {
    this.footerName = document.getElementById("footerName");
    this.changeNicknameBtn = document.getElementById("changeNicknameBtn");
    this.changeNicknameBtn.onclick = this.changeNicknameModal;
  }

  changeNickname(id, newNickname) {
    firebase
      .database()
      .ref(`players/${id}`)
      .update({
        ["name"]: newNickname,
      });

    this.footerName.innerText = `닉네임 : ${newNickname}`;
  }

  changeNicknameModal() {}
}
