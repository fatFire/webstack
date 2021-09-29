import Page from "./Page.js"

class Message extends Page {
  constructor(props) {
    super(props)
  }

  compile() {
    if (this.props.node) {
      this.props.node.innerHTML(this.props.selector, this.dom, this.props.pos)
    } else {
      const wrap = document.querySelector("#wrap")
      wrap.appendChild(this.dom)
    }
  }

  render() {
    return `
    <div class="message">
      <img src="./assets/avatar.jpg" class="message-avatar chatpagego">
      <div class="message-words iconfont icon-zuosanjiao1">${this.props.message}</div>
    </div>
    `
  }
}

export default Message
