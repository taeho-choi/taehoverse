export class InfoModal {
  constructor() {
    this.infoModal = document.createElement("div");
    this.infoModal.classList.add("infoModal");
    this.infoModal.innerText =
      "태호버스에 오신 것을 환영합니다.\n\n조작키 안내\n좌,우 방향키 또는 A,D: 캐릭터 이동\nSpaceBer: 캐릭터 점프\nF: 상호작용\nEnter: 채팅 입력/취소\n\n입장 시 임시닉네임으로 자동 설정되므로 화면 하단의 닉네임 변경을 진행해주세요!\n";
    document.body.appendChild(this.infoModal);

    this.infoCancelBtn = document.createElement("button");
    this.infoCancelBtn.classList.add("infoCancelBtn");
    this.infoCancelBtn.innerText = "확인";
    this.infoModal.appendChild(this.infoCancelBtn);
    this.infoCancelBtn.onclick = () => {
      this.onClickCancelInfoModal(this.infoModal);
    };
  }

  onClickCancelInfoModal(infoModal) {
    infoModal.remove();
  }
}
