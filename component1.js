import { friends } from "./data.js"
class Page {
  componentDidMount() {}

  render() {}
}

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

class ChatPage extends Page {
  componentDidMount() {
    this.go()
    this.back()
  }

  go() {
    const go = document.querySelector(".chatpagego")
    go.addEventListener("click", () => {
      webstack.go(new DetailPage())
    })
  }

  back() {
    const back = document.querySelector(".chatpageback")
    back.addEventListener("click", () => {
      webstack.back()
    })
  }

  render() {
    return `
      <div class="group">
        <div class="group-head">
          <div class="chatpageback iconfont icon-fanhui"></div>
          <div>胖火花</div>
          <div class="iconfont icon-gengduo"></div>
        </div>
        <div class="group-content">
          <div class="message">
            <img src="./assets/avatar.jpg" class="message-avatar chatpagego">
            <div class="message-words iconfont icon-zuosanjiao1">hello world</div>
          </div>
        </div>
        <div class="input">
          <div class="iconfont icon-yuyin"></div>
          <input>
          <div class="iconfont icon-xiaolian"></div>
          <div class="iconfont icon-jiahao"></div>
        </div>
      </div>
    `
  }
}

class DetailPage extends Page {
  componentDidMount() {
    this.back()
  }

  back() {
    const click = document.querySelector(".detailpageback")
    click.addEventListener("click", () => {
      webstack.back()
    })
  }

  render() {
    return `
      <div class="information">
        <div class="information-head">
          <div class="detailpageback iconfont icon-fanhui"></div>
        </div>
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
        <div class="contact">
          <span class="iconfont icon-comment"></span>
          <span>发消息</span>
        </div>
      </div>
    `
  }
}

class ContactPage extends Page {
  componentDidMount() {
    this.tabChange()
    this.onScroll()
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
    <div class="contact">
      <div class="contact-head ">
        通讯录
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

class WebStack {
  constructor() {
    this.webstack = []
    this.wrap = document.querySelector("#wrap")
  }

  init(page) {
    this.webstack = []
    const initPageDom = stringToDom(page.render())
    this.wrap.replaceChildren(initPageDom)
    page.componentDidMount()
    this.webstack.push(initPageDom)
    const tabItem = initPageDom.querySelectorAll(".tab-item")
    if (page instanceof HomePage) {
      tabItem[0]
        .querySelector(".icon-pinglun")
        .classList.replace("icon-pinglun", "icon-pinglun-fill")
      tabItem[0].classList.add("active")
    } else if (page instanceof ContactPage) {
      tabItem[1]
        .querySelector(".icon-user-group")
        .classList.replace("icon-user-group", "icon-user-group-fill")
      tabItem[1].classList.add("active")
    } else if (page instanceof FindPage) {
      tabItem[2]
        .querySelector(".icon-faxian1")
        .classList.replace("icon-faxian1", "icon-faxian1-fill")
      tabItem[2].classList.add("active")
    } else {
      tabItem[3]
        .querySelector(".icon-user")
        .classList.replace("icon-user", "icon-user-fill")
      tabItem[3].classList.add("active")
    }
  }

  go(nextPage) {
    const nextPageDom = stringToDom(nextPage.render())
    const curPageDom = this.webstack[this.webstack.length - 1]
    this.wrap.appendChild(nextPageDom)
    this.webstack.push(nextPageDom)
    nextPage.componentDidMount()
    this.addAnimation(curPageDom, nextPageDom)
  }

  back() {
    const curPageDom = this.webstack.pop()
    const nextPageDom = this.webstack[this.webstack.length - 1]
    console.log(curPageDom)
    const animation = this.addAnimation(curPageDom, nextPageDom, false)
    // curPageDom.addEventListener('animationend', () => {
    //   this.wrap.removeChild(curPageDom)
    // })
    animation.onfinish = () => {
      this.wrap.removeChild(curPageDom)
    }
  }

  addAnimation(curPageDom, nextPageDom, isGo = true) {
    let curPageAnimation
    if (isGo) {
      nextPageDom.animate(
        [
          {
            left: "100%",
          },
          {
            left: 0,
          },
        ],
        {
          duration: 200,
          fill: "forwards",
        }
      )
      curPageDom.animate(
        [
          {
            left: 0,
          },
          {
            left: "-20%",
          },
        ],
        {
          duration: 200,
          fill: "forwards",
        }
      )
    } else {
      curPageAnimation = curPageDom.animate(
        [
          {
            left: 0,
          },
          {
            left: "100%",
          },
        ],
        {
          duration: 200,
          fill: "forwards",
        }
      )
      nextPageDom.animate(
        [
          {
            left: "-20%",
          },
          {
            left: 0,
          },
        ],
        {
          duration: 200,
          fill: "forwards",
        }
      )
    }
    return curPageAnimation
  }
}

function stringToDom(domString) {
  const domParser = new DOMParser()
  return domParser.parseFromString(domString, "text/html").body
    .firstElementChild
}
class EventEmitter {
  constructor() {
    this.events = {}
  }
  // 实现订阅
  on(type, callBack) {
    if (!this.events[type]) {
      this.events[type] = [callBack]
    } else {
      this.events[type].push(callBack)
    }
  }
  // 删除订阅
  off(type, callBack) {
    if (!this.events[type]) return
    this.events[type] = this.events[type].filter((item) => {
      return item !== callBack
    })
  }
  // 只执行一次订阅事件
  once(type, callBack) {
    function fn() {
      callBack()
      this.off(type, fn)
    }
    this.on(type, fn)
  }
  // 触发事件
  emit(type, ...rest) {
    this.events[type] && this.events[type].forEach((fn) => fn.apply(this, rest))
  }
}

const eventEmitter = new EventEmitter()
// const detailPage = new DetailPage(eventEmitter)
// const groupPage = new GroupPage(eventEmitter, detailPage)
// const homePage = new HomePage(eventEmitter, groupPage)

const webstack = new WebStack()
webstack.init(new HomePage())
