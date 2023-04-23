export default class UserInfo {
  constructor({nameSelector, jobSelector, avatarSelector}) {
    this._name = document.querySelector(nameSelector);
    this._job = document.querySelector(jobSelector);
    this._avatar = document.querySelector(avatarSelector);
  }
  getUserInfo() {
    return {
      name: this._name.textContent,
      job: this._job.textContent,
      avatar: this._avatar.src
    };
  }
  setUserInfo(newName, newJob, newAvatar) {
    this._name.textContent = newName;
    this._job.textContent = newJob;
    this._avatar.src = newAvatar;
  }
}
