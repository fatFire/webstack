import Page from "./Page.js"
import Title from "./Title.js"

class DetailPage extends Page {
  componentDidMount() {
    this.back()
  }

  back() {
    const back = document.querySelector(".informationpageback")
    back.addEventListener("click", () => {
      this.props.router.back()
    })
  }

  render() {
    return `
      <div class="information">
        ${new Title({
          title: this.props.title,
          back: true,
          id: "information",
          node: this
        }).render()}
        <div class="introduction">
          <img src="./assets/avatar.jpg">
          <div class="introduction-self">
            <span style="font-size: 18px; color: black" class="iconfont icon-touxiang-nan">胖火花</span>
            <span>微信号：wechat</span>
            <span>地区：中国</span>
          </div>
        </div>
        <div class="friends">
          <span >朋友圈</span>
          <span class="iconfont icon-jinru"></span>
        </div>
        <div class="detail-contact">
          <span class="iconfont icon-comment"></span>
          <span>发消息</span>
        </div>
      </div>
    `
  }
}

export default DetailPage
