import Page from "./Page.js"
import Title from "./Title.js"
import Message from "./Message.js"

class ChatPage extends Page {
  constructor(props) {
    super(props)
    this.state = { message: this.props.message }
  }

  componentDidMount() {
    this.go()
    this.back()
    this.input()
  }

  go() {
    const go = document.querySelector(".chatpagego")
    go.addEventListener("click", () => {
      this.props.router.go("detail")
    })
  }
  back() {
    const back = document.querySelector(".chatpageback")
    back.addEventListener("click", () => {
      this.props.router.back(this.props.preURL)
    })
  }

  input() {
    const input = document.querySelector(".cheat-input")
    input.addEventListener("keydown", (e) => {
      if (e.code === "Enter") {
        
        this.setState({
          message: [...this.state.message, input.value],
        })
        input.value = ""
      }
    })
  }

  recompile() {
    this.dom = this.stringToDom(this.render())
    const wrap = document.querySelector("#wrap")
    wrap.replaceChild(this.dom, document.querySelector(".group"))
    this.componentDidMount()
  }

  render() {
    const messages = this.state?.message || this.props.message
    const messageStrings = messages?.map((item) => {
      return new Message({
        message: item,
        node: this
      }).render()
    })
    let allMessage = ''
    messageStrings.forEach((item) => {
      allMessage += item
    })
    return `
      <div class="group">
      ${new Title({
        title: this.props.title,
        back: true,
        id: "chat",
        icon: "icon-gengduo",
        node: this,
      }).render()}
        <div class="group-content">
        ${allMessage}
        </div>
        <div class="input">
          <div class="iconfont icon-yuyin"></div>
          <input type="text" class="cheat-input" autofocus="autofocus">
          <div class="iconfont icon-xiaolian"></div>
          <div class="iconfont icon-jiahao"></div>
        </div>
      </div>
    `
  }
}

export default ChatPage
