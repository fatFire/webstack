import Page from './Page.js'
import Title from './Title.js'
import Message from './Message.js'

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
      this.props.router.go("/detail")
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
    const item = this.state?.message[this.state?.message.length - 1]
    new Message({
      message: item,
      node: this,
      selector: ".group-content",
      pos: "beforeend",
    })
    const wrap = document.querySelector("#wrap")
    wrap.replaceChild(this.dom, document.querySelector(".group"))
  }

  compile() {
    if (this.props.node) {
      this.props.node.innerHTML(this.props.selector, this.dom)
    } else {
      new Title({
        title: this.props.title,
        back: true,
        id: "chat",
        icon: "icon-gengduo",
        node: this,
        selector: ".group",
      })
      new Message({
        message: this.props.message,
        node: this,
        selector: ".group-content",
        pos: "beforeend",
      })
      const wrap = document.querySelector("#wrap")
      wrap.appendChild(this.dom)
    }
  }
  

  render() {
    return `
      <div class="group">
        <div class="group-content">
        </div>
        <div class="input">
          <div class="iconfont icon-yuyin"></div>
          <input type="text" class="cheat-input">
          <div class="iconfont icon-xiaolian"></div>
          <div class="iconfont icon-jiahao"></div>
        </div>
      </div>
    `
  }
}

export default ChatPage