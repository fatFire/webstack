class HomePage extends Page {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    this.go()
    // this.tabChange()
  }
  compile() {
    if (this.props.node) {
      this.props.node.innerHTML(this.props.selector, this.dom)
    } else {
      new Title({
        title: this.props.title,
        id: "home",
        icon: "icon-add",
        back: false,
        node: this,
        selector: ".home",
      })
      const wrap = document.querySelector("#wrap")
      wrap.appendChild(this.dom)
    }
  }
  innerHTML(selector, dom, pos = "afterbegin") {
    const wrap = this.dom.querySelector(selector) || this.dom
    wrap.insertAdjacentElement(pos, dom)
  }

  go() {
    const go = document.querySelector(".homepagego")
    go.addEventListener("click", () => {
      router.go("/chat", { title: "胖火花", message: ["hello world"] })
    })
  }

  render() {
    return `
      <div class="home">
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