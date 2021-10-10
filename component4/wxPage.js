import Page from "./Page.js"
import Title from "./Title.js"

class WXPage extends Page {

  constructor(props) {
    super(props)
    this.className = 'home'
  }

  componentDidMount() {
    this.childEventstoParent(this.go.bind(this))
  }

  go() {
    const go = document.querySelector(".homepagego")
    go.addEventListener("click", () => {
      this.props.router.go("chat", {
        title: "胖火花",
        message: ["hello world"],
      })
    })
  }

  render() {
    return `
      <div class="home display">
        ${new Title({
          title: this.props.title,
          id: "home",
          icon: "icon-add",
          back: false,
          node: this,
        }).render()}
        <div class="content">
          <div class="home-search">
            <input type="text" />
            <span class="iconfont icon-sousuo">搜索</span>
          </div>
          <div class="pcwechat">
            <span class="iconfont icon-diannao"></span>
            <span>Windows 微信已登录</span>
          </div>
          <div class="list-item homepagego">
            <img src="./assets/avatar.jpg" alt="">
            <div class="list-item-content">
              <span style="font-size: 14px;">胖火花</span>
              <span style="font-size: 12px; color: rgb(177, 177, 177)">hello world</span>
            </div>
          </div>
        </div>
      </div>
      `
  }
}

export default WXPage
