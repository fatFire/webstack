import Page from './Page.js'

class FindPage extends Page {
  constructor(props) {
    super(props)
    this.className = 'find'
  }

  render() {
    return `
    <div class="find hide">
      <div class="find-head">${this.props.title}</div>
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
    </div>
    `
  }
}

export default FindPage