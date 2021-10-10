import Page from "./Page.js"

class TabPage extends Page {
  componentDidMount() {
    this.childEventstoParent(this.tabChange.bind(this))
  }

  tabChange() {
    const tab1Page = document.querySelector(`.${this.props.tab1}`)
    const tab2Page = document.querySelector(`.${this.props.tab2}`)
    const tab3Page = document.querySelector(`.${this.props.tab3}`)
    const tab4Page = document.querySelector(`.${this.props.tab4}`)
    this.tabPageMap = [tab1Page, tab2Page, tab3Page, tab4Page]
    this.tabItems = document.querySelector(".tab").querySelectorAll(".tab-item")
    this.displayPage = this.tabPageMap[0]
    this.activeTab = this.tabItems[0]
    this.tabItems.forEach((item, index) => {
      item.addEventListener("click", () => {
        console.log(this.displayPage.classList)
        console.log(this.activeTab)
        this.displayPage.classList.replace("display", "hide")
        this.activeTab.classList.toggle("active")
        this.tabItems[index].classList.toggle("active")
        this.tabPageMap[index].classList.replace("hide", "display")
        this.displayPage = this.tabPageMap[index]
        this.activeTab = this.tabItems[index]
        console.log(this.displayPage.classList)
        console.log(this.activeTab)
      })
    })
  }

  render() {
    return `
    <div class="tab">
      <div class="tab-item active">
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
