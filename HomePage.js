import { Page } from './Page.js'

class HomePage extends Page {
  componentDidMount() {
    this.go()
    this.tabChange()
  }

  go() {
    const go = document.querySelector(".homepagego")
    go.addEventListener("click", () => {
      webstack.go(new ChatPage())
    })
  }
  tabChange() {
    const tabItems = document.querySelectorAll(".tab-item")
    tabItems.forEach((item, index) => {
      item.addEventListener("click", () => {
        if (index === 0) {
          webstack.init(new HomePage())
        } else if (index === 1) {
          webstack.init(new ContactPage())
        } else if (index === 2) {
          webstack.init(new FindPage())
        } else {
          webstack.init(new MyPage())
        }
      })
    })
  }

  render() {
    return `
      <div class="home">
        <div class="home-head">
          微信
          <img src="./assets/add.svg">
        </div>
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
      </div>
      `
  }
}

export { HomePage }
