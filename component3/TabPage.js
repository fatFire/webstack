import Page from './Page.js'

class TabPage extends Page {
  constructor(props) {
    super(props)
  }

  compile() {
    if (this.props.node) {
      this.props.node.innerHTML(this.props.selector, this.dom)
    } else {
      const body = document.querySelector("body")
      const tabItem = this.dom.querySelector(".tab-item")
      tabItem.classList.add("active")
      body.appendChild(this.dom)
    }
  }

  componentDidMount() {
    this.tabChange()
  }

  tabChange() {
    const tabItems = document.querySelectorAll(".tab-item")
    tabItems.forEach((item, index) => {
      item.addEventListener("click", () => {
        if (index === 0) {
          this.props.router.tabChange("/home")
          const active = document.querySelector(".active")
          active.classList.remove(active.classList[active.classList.length - 1])
          item.classList.add("active")
        } else if (index === 1) {
          this.props.router.tabChange("/contact")
          const active = document.querySelector(".active")
          active.classList.remove(active.classList[active.classList.length - 1])
          item.classList.add("active")
        } else if (index === 2) {
          this.props.router.tabChange("/find")
          const active = document.querySelector(".active")
          active.classList.remove(active.classList[active.classList.length - 1])
          item.classList.add("active")
        } else {
          this.props.router.tabChange("/my")
          const active = document.querySelector(".active")
          active.classList.remove(active.classList[active.classList.length - 1])
          item.classList.add("active")
        }
      })
    })
  }

  render() {
    return `
    <div class="tab">
      <div class="tab-item">
        <span class="iconfont icon-pinglun"></span>
        <div>微信</div>
      </div>
      <div class="tab-item">
        <span class="iconfont icon-user-group"></span>
        <div>通讯录</div>
      </div>
      <div class="tab-item">
        <span class="iconfont icon-faxian1">
          <i class="iconfont icon-yuandian"></i>
        </span>
        <div>发现</div>
      </div>
      <div class="tab-item">
        <span class="iconfont icon-user"></span>
        <div>我</div>
      </div>
    </div>
    `
  }
}

export default TabPage