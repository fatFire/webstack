import { Page } from './Page.js'

class MyPage extends Page {
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
    <div class="myprofile">
      <div class="myprofile-head">
        <img src="./assets/avatar.jpg" />
        <div class="myprofile-information">
          <span class="wechat-name">胖火花</span>
          <span class="wechat-id"
            ><span class="wechat-id-first">微信号：Phuohua</span>
            <span class="wechat-id-midl iconfont icon-ico"></span
            ><span class="wechat-id-last iconfont icon-arrowr"></span
          ></span>
          <div class="state">
            <span class="iconfont icon-plus">状态</span>
            <span> <img src="./assets/img/states.png" />等9个朋友 </span>
          </div>
        </div>
      </div>
      <div class="myprofile-content">
        <div class="my-function1">
          <div class="my-list-item">
            <img class="my-icon" src="./assets/img/支付.png" alt="" />
            <div class="my-list-item-right">
              <span class="my-list-item-name">支付</span>
              <i class="iconfont icon-jinru"> </i>
            </div>
          </div>
        </div>
        <div class="my-function2">
          <div class="my-list-item">
            <img class="my-icon" src="./assets/img/收藏.png" alt="" />
            <div class="my-list-item-right">
              <span class="my-list-item-name">收藏</span>
              <i class="iconfont icon-jinru"> </i>
            </div>
          </div>
          <div class="my-list-item">
            <img class="my-icon" src="./assets/img/朋友圈1.png" alt="" />
            <div class="my-list-item-right">
              <span class="my-list-item-name">朋友圈</span>
              <i class="iconfont icon-jinru"> </i>
            </div>
          </div>
          <div class="my-list-item">
            <img class="my-icon" src="./assets/img/卡包.png" alt="" />
            <div class="my-list-item-right">
              <span class="my-list-item-name">卡包</span>
              <i class="iconfont icon-jinru"> </i>
            </div>
          </div>
          <div class="my-list-item">
            <img class="my-icon" src="./assets/img/表情.png" alt="" />
            <div class="my-list-item-right">
              <span class="my-list-item-name">表情</span>
              <i class="iconfont icon-jinru"> </i>
            </div>
          </div>
        </div>
        <div class="my-function3">
          <div class="my-list-item">
            <img class="my-icon" src="./assets/img/设置.png" alt="" />
            <div class="my-list-item-right">
              <span class="my-list-item-name">设置</span>
              <i class="iconfont icon-jinru"> </i>
            </div>
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

export { MyPage }
