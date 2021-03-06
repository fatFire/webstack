import Page from './Page.js'
import { friends } from '../data.js'

class ContactPage extends Page {
  constructor(props) {
    super(props)
    this.className = 'contact'
  }

  componentDidMount() {
    this.childEventstoParent(this.onScroll.bind(this))
  }

  onScroll() {
    const headBorder = document.querySelector(".contact-head-border")
    const content = document.querySelector(".contact-content")
    content.addEventListener("scroll", (e) => {
      headBorder.style.opacity = 1
      if (e.target.scrollTop == 0) {
        headBorder.style.opacity = 0
      }
    })
  }

  getList(title, items) {
    let s = ""
    items.forEach((item) => {
      s += `<div class="contact-list-item">
      <img src="${item.avatar}" class="avatar" />
      <div class="contact-list-item-content">${item.nickname}</div>
    </div>`
    })

    return `
      <div class="${title}-group">
        <div class="group-title">${title}</div>
        ${s}
      </div>
      `
  }

  render() {
    const groups = {}
    friends.sort((a, b) => (a.nickname < b.nickname ? -1 : a > b ? 1 : 0))
    friends.forEach((item) => {
      const firstChar = item.nickname.charAt(0).toUpperCase()
      if (!groups[firstChar]) {
        groups[firstChar] = []
      }
      groups[firstChar].push(item)
    })

    let lists = ""

    Object.keys(groups).forEach((key) => {
      lists += this.getList(key, groups[key])
    })

    lists += `<div class="contact-all-items">${friends.length}个朋友及联系人</div>`

    return `
    <div class="contact hide">
      <div class="contact-head ">
        ${this.props.title}
        <span class="iconfont icon-user-plus"></span>
        <div class="contact-head-border"></div>
      </div>
      <div class="contact-content">
        <div class="contact-search">
          <input type="text" />
          <span class="iconfont icon-sousuo">搜索</span>
        </div>
        <div class="category-group">
          <div class="contact-list-item">
            <img src="./assets/img/新的朋友.png" class="avatar" />
            <div class="contact-list-item-content">新的朋友</div>
          </div>
          <div class="contact-list-item">
            <img src="./assets/img/仅聊天的朋友.png" class="avatar" />
            <div class="contact-list-item-content">仅聊天的朋友</div>
          </div>
          <div class="contact-list-item">
            <img src="./assets/img/群聊.png" class="avatar" />
            <div class="contact-list-item-content">群聊</div>
          </div>
          <div class="contact-list-item">
            <img src="./assets/img/标签.png" class="avatar" />
            <div class="contact-list-item-content">标签</div>
          </div>
          <div class="contact-list-item">
            <img src="./assets/img/公众号.png" class="avatar" />
            <div class="contact-list-item-content">公众号</div>
          </div>
          <div class="contact-list-item">
            <img src="./assets/img/企业微信联系人.png" class="avatar" />
            <div class="contact-list-item-content">企业微信联系人</div>
          </div>
        </div>
        ${lists}
        <div class="nav">
          <div class="iconfont">&#xe677;</div>
          <div>A</div>
          <div>B</div>
          <div>C</div>
          <div>D</div>
        </div>
      </div>
    </div>
    `
  }
}

export default ContactPage