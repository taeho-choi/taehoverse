export class InfoModal {
  constructor() {
    this.infoModal = document.createElement("div");
    this.infoModal.classList.add("infoModal");
    document.body.appendChild(this.infoModal);

    this.infoCancelBtn = document.createElement("button");
    this.infoCancelBtn.classList.add("infoCancelBtn");
    this.infoCancelBtn.innerText = "알겠어요!";
    this.infoModal.appendChild(this.infoCancelBtn);
    this.infoCancelBtn.onclick = () => {
      this.onClickCancelInfoModal(this.infoModal);
    };
  }

  onClickCancelInfoModal(infoModal) {
    infoModal.style.display = "none";
  }
}
