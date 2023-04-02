export default class UserInfo {
  constructor({nameSelector, jobSelector}) {
    this._name = document.querySelector(nameSelector);
    this._job = document.querySelector(jobSelector);
  }
  getUserInfo() {
    return {
      name: this._name.textContent,
      job: this._job.textContent
    };
  }
  setUserInfo(newName, newJob) {
    this._name.textContent = newName;
    this._job.textContent = newJob;
  }
}
