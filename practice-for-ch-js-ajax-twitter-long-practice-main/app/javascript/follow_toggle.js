import { API, broadcast } from "./util";

export default class FollowToggle {
  constructor(toggleButton) {
    // Your code here
    this.toggleButton = toggleButton;
    toggleButton.addEventListener("click", (e)=> this.handleClick(e));
  }

  async handleClick(event) {
    // Your code here
    event.preventDefault();
    // console.log(this.followState)
    this.followState === "followed" ? this.unfollow() : this.follow();
  }

  async follow() {
    // Your code here
    this.followState = "following";
    const res = await API.followUser(this.toggleButton.dataset.userId);
    this.followState = "followed";
  }

  async unfollow() {
    // Your code here
    this.followState = "unfollowing";
    const res = await API.unfollowUser(this.toggleButton.dataset.userId);
    this.followState = "unfollowed";
  }

  render() {
    // console.log(this.followState)
    switch (this.followState) {
      // Your code here
      case "followed":
        this.toggleButton.disabled = false;
        this.toggleButton.innerText = "Unfollow!";
        break;
      case "unfollowed":
        this.toggleButton.disabled = false;
        this.toggleButton.innerText = "Follow!";
        break;
      case "following":
        this.toggleButton.disabled = true;
        this.toggleButton.innerText = "Following...";
        break;
      case "unfollowing":
        this.toggleButton.disabled = true;
        this.toggleButton.innerText = "Unfollowing...";
        break;
    }
  }

  get followState() {
    return this.toggleButton.dataset.followState;
  }

  set followState(newState) {
    this.toggleButton.dataset.followState = newState;
    this.render();
  }
}