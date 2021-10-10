import Page from './Page.js'

class MyPage extends Page {
  constructor(props) {
    super(props)
    this.className = 'myprofile'
  }

  render() {
    return `
    <div class="myprofile hide">
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
    </div>
    `
  }
}

export default MyPage