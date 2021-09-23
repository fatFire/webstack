import { Page } from './Page.js'

class FindPage extends Page {
  componentDidMount() {
    this.tabChange()
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
    <div class="find">
      <div class="find-head">发现</div>
      <div class="find-content">
        <div class="find-list-item">
          <img class="friends-icon" src="./assets/img/朋友圈.png" alt="">
          <span class="find-list-item-name">朋友圈</span>
          <span class="friends-avatar"><i class="iconfont icon-yuandian"></i></span>
          <i class="iconfont icon-jinru">
          </i>
        </div>
        <div class="find-list-item">
          <img class="friends-icon" src="./assets/img/扫一扫.png" alt="">
          <span class="find-list-item-name">扫一扫</span>
          <i class="iconfont icon-jinru">
          </i>
        </div>
        <div class="find-list-item">
          <img class="friends-icon" src="./assets/img/搜一搜.png" alt="">
          <span class="find-list-item-name">搜一搜</span>
          <i class="iconfont icon-jinru">
          </i>
        </div>
        <div class="find-list-item">
          <img class="friends-icon" src="./assets/img/购物.png" alt="">
          <span class="find-list-item-name">购物</span>
          <i class="iconfont icon-jinru">
          </i>
        </div>
        <div class="find-list-item">
          <img class="friends-icon" src="./assets/img/小程序.png" alt="">
          <span class="find-list-item-name">小程序</span>
          <i class="iconfont icon-jinru">
          </i>
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

export { FindPage }
