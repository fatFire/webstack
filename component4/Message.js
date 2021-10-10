import Page from "./Page.js"

class Message extends Page {

  render() {
    return `
    <div class="message">
      <img src="https://fatfire.github.io/webstack/assets/avatar.jpg" class="message-avatar chatpagego">
      <div class="message-words iconfont icon-zuosanjiao1">${this.props.message}</div>
    </div>
    `
  }
}

export default Message
