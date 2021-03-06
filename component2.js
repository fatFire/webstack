import { friends } from "./data.js"

class Page {
  constructor(props) {
    this.props = props || {}
    this.state = null
    this.dom = this.stringToDom(this.render())
    this.compile()
    this.componentDidMount()
  }

  componentDidMount() {}

  render() {}

  compile() {}

  setState(state) {
    this.state = state
  }

  componentUnmount() {
    const wrap = document.querySelector("#wrap")
    wrap.removeChild(this.dom)
  }

  stringToDom(domString) {
    const domParser = new DOMParser()
    return domParser.parseFromString(domString, "text/html").body
      .firstElementChild
  }
}

class Title extends Page {
  constructor(props) {
    super(props)
  }

  compile() {
    if (this.props.node) {
      this.props.node.innerHTML(this.props.selector, this.dom, this.props.pos)
    } else {
      const wrap = document.querySelector("#wrap")
      wrap.appendChild(this.dom)
    }
  }

  render() {
    const title = this.props.title ? this.props.title : ""
    const back = this.props.back
      ? `<div class="${this.props.id}pageback iconfont icon-fanhui"></div>`
      : ""
    const slot = this.props.icon
      ? `<div class="iconfont ${this.props.icon}"></div>`
      : ""

    return `
        <div class="${this.props.id}-head">
          ${back}
          ${title}
          ${slot}
        </div>
    `
  }
}

class HomePage extends Page {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    this.go()
    // this.tabChange()
  }
  compile() {
    if (this.props.node) {
      this.props.node.innerHTML(this.props.selector, this.dom)
    } else {
      new Title({
        title: this.props.title,
        id: "home",
        icon: "icon-add",
        back: false,
        node: this,
        selector: ".home",
      })
      const wrap = document.querySelector("#wrap")
      wrap.appendChild(this.dom)
    }
  }
  innerHTML(selector, dom, pos = "afterbegin") {
    const wrap = this.dom.querySelector(selector) || this.dom
    wrap.insertAdjacentElement(pos, dom)
  }

  go() {
    const go = document.querySelector(".homepagego")
    go.addEventListener("click", () => {
      router.go("/chat", { title: "?????????", message: ["hello world"] })
    })
  }

  render() {
    return `
      <div class="home">
        <div class="content">
          <div class="home-search">
            <input type="text" />
            <span class="iconfont icon-sousuo">??????</span>
          </div>
          <div class="pcwechat">
            <span class="iconfont icon-diannao"></span>
            <span>Windows ???????????????</span>
          </div>
          <div class="list-item homepagego">
            <img src="./assets/avatar.jpg" alt="">
            <div class="list-item-content">
              <span style="font-size: 14px;">?????????</span>
              <span style="font-size: 12px; color: rgb(177, 177, 177)">hello world</span>
            </div>
          </div>
        </div>
      </div>
      `
  }
}

class ChatPage extends Page {
  constructor(props) {
    super(props)
    this.state = { message: this.props.message }
  }

  componentDidMount() {
    this.go()
    this.back()
    this.input()
  }

  go() {
    const go = document.querySelector(".chatpagego")
    go.addEventListener("click", () => {
      router.go("/detail")
    })
  }
  back() {
    const back = document.querySelector(".chatpageback")
    back.addEventListener("click", () => {
      router.back(this.props.preURL)
    })
  }

  input() {
    const input = document.querySelector(".cheat-input")
    input.addEventListener("keydown", (e) => {
      if (e.code === "Enter") {
        this.setState({
          message: [...this.state.message, input.value],
        })
        input.value = ""
      }
    })
  }

  setState(state) {
    this.state = state
    this.recompile()
  }

  recompile() {
    const item = this.state?.message[this.state?.message.length - 1]
    new Message({
      message: item,
      node: this,
      selector: ".group-content",
      pos: "beforeend",
    })
    const wrap = document.querySelector("#wrap")
    wrap.replaceChild(this.dom, document.querySelector(".group"))
  }

  compile() {
    if (this.props.node) {
      this.props.node.innerHTML(this.props.selector, this.dom)
    } else {
      new Title({
        title: this.props.title,
        back: true,
        id: "chat",
        icon: "icon-gengduo",
        node: this,
        selector: ".group",
      })
      new Message({
        message: this.props.message,
        node: this,
        selector: ".group-content",
        pos: "beforeend",
      })

      const wrap = document.querySelector("#wrap")
      wrap.appendChild(this.dom)
    }
  }
  innerHTML(selector, dom, pos = "afterbegin") {
    const wrap = this.dom.querySelector(selector) || this.dom
    wrap.insertAdjacentElement(pos, dom)
  }

  render() {
    return `
      <div class="group">
        <div class="group-content">
        </div>
        <div class="input">
          <div class="iconfont icon-yuyin"></div>
          <input type="text" class="cheat-input">
          <div class="iconfont icon-xiaolian"></div>
          <div class="iconfont icon-jiahao"></div>
        </div>
      </div>
    `
  }
}

class Message extends Page {
  constructor(props) {
    super(props)
  }

  compile() {
    if (this.props.node) {
      this.props.node.innerHTML(this.props.selector, this.dom, this.props.pos)
    } else {
      const wrap = document.querySelector("#wrap")
      wrap.appendChild(this.dom)
    }
  }
  innerHTML(selector, dom) {
    const wrap = this.dom.querySelector(selector) || this.dom
    wrap.insertAdjacentElement("afterbegin", dom)
  }

  render() {
    return `
    <div class="message">
      <img src="./assets/avatar.jpg" class="message-avatar chatpagego">
      <div class="message-words iconfont icon-zuosanjiao1">${this.props.message}</div>
    </div>
    `
  }
}

class DetailPage extends Page {
  componentDidMount() {
    this.back()
  }

  back() {
    const back = document.querySelector(".informationpageback")
    back.addEventListener("click", () => {
      router.back(this.props.preURL)
    })
  }

  compile() {
    if (this.props.node) {
      this.props.node.innerHTML(this.props.selector, this.dom)
    } else {
      new Title({
        title: this.props.title,
        back: true,
        id: "information",
        node: this,
        selector: ".information",
      })
      const wrap = document.querySelector("#wrap")
      wrap.appendChild(this.dom)
    }
  }
  innerHTML(selector, dom, pos = "afterbegin") {
    const wrap = this.dom.querySelector(selector) || this.dom
    wrap.insertAdjacentElement(pos, dom)
  }

  render() {
    return `
      <div class="information">
        
        <div class="introduction">
          <img src="./assets/avatar.jpg">
          <div class="introduction-self">
            <span style="font-size: 18px; color: black" class="iconfont icon-touxiang-nan">?????????</span>
            <span>????????????wechat</span>
            <span>???????????????</span>
          </div>
        </div>
        <div class="friends">
          <span >?????????</span>
          <span class="iconfont icon-jinru"></span>
        </div>
        <div class="detail-contact">
          <span class="iconfont icon-comment"></span>
          <span>?????????</span>
        </div>
      </div>
    `
  }
}

class ContactPage extends Page {
  componentDidMount() {
    this.onScroll()
  }

  compile() {
    if (this.props.node) {
      this.props.node.innerHTML(this.props.selector, this.dom)
    } else {
      const wrap = document.querySelector("#wrap")
      wrap.appendChild(this.dom)
    }
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

    lists += `<div class="contact-all-items">${friends.length}?????????????????????</div>`

    return `
    <div class="contact">
      <div class="contact-head ">
        ?????????
        <span class="iconfont icon-user-plus"></span>
        <div class="contact-head-border"></div>
      </div>
      <div class="contact-content">
        <div class="contact-search">
          <input type="text" />
          <span class="iconfont icon-sousuo">??????</span>
        </div>
        <div class="category-group">
          <div class="contact-list-item">
            <img src="./assets/img/????????????.png" class="avatar" />
            <div class="contact-list-item-content">????????????</div>
          </div>
          <div class="contact-list-item">
            <img src="./assets/img/??????????????????.png" class="avatar" />
            <div class="contact-list-item-content">??????????????????</div>
          </div>
          <div class="contact-list-item">
            <img src="./assets/img/??????.png" class="avatar" />
            <div class="contact-list-item-content">??????</div>
          </div>
          <div class="contact-list-item">
            <img src="./assets/img/??????.png" class="avatar" />
            <div class="contact-list-item-content">??????</div>
          </div>
          <div class="contact-list-item">
            <img src="./assets/img/?????????.png" class="avatar" />
            <div class="contact-list-item-content">?????????</div>
          </div>
          <div class="contact-list-item">
            <img src="./assets/img/?????????????????????.png" class="avatar" />
            <div class="contact-list-item-content">?????????????????????</div>
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

class FindPage extends Page {
  compile() {
    if (this.props.node) {
      this.props.node.innerHTML(this.props.selector, this.dom)
    } else {
      const wrap = document.querySelector("#wrap")
      wrap.appendChild(this.dom)
    }
  }

  render() {
    return `
    <div class="find">
      <div class="find-head">??????</div>
      <div class="find-content">
        <div class="find-list-item">
          <img class="friends-icon" src="./assets/img/?????????.png" alt="">
          <span class="find-list-item-name">?????????</span>
          <span class="friends-avatar"><i class="iconfont icon-yuandian"></i></span>
          <i class="iconfont icon-jinru">
          </i>
        </div>
        <div class="find-list-item">
          <img class="friends-icon" src="./assets/img/?????????.png" alt="">
          <span class="find-list-item-name">?????????</span>
          <i class="iconfont icon-jinru">
          </i>
        </div>
        <div class="find-list-item">
          <img class="friends-icon" src="./assets/img/?????????.png" alt="">
          <span class="find-list-item-name">?????????</span>
          <i class="iconfont icon-jinru">
          </i>
        </div>
        <div class="find-list-item">
          <img class="friends-icon" src="./assets/img/??????.png" alt="">
          <span class="find-list-item-name">??????</span>
          <i class="iconfont icon-jinru">
          </i>
        </div>
        <div class="find-list-item">
          <img class="friends-icon" src="./assets/img/?????????.png" alt="">
          <span class="find-list-item-name">?????????</span>
          <i class="iconfont icon-jinru">
          </i>
        </div>
      </div>
    </div>
    `
  }
}

class MyPage extends Page {
  compile() {
    if (this.props.node) {
      this.props.node.innerHTML(this.props.selector, this.dom)
    } else {
      const wrap = document.querySelector("#wrap")
      wrap.appendChild(this.dom)
    }
  }

  render() {
    return `
    <div class="myprofile">
      <div class="myprofile-head">
        <img src="./assets/avatar.jpg" />
        <div class="myprofile-information">
          <span class="wechat-name">?????????</span>
          <span class="wechat-id"
            ><span class="wechat-id-first">????????????Phuohua</span>
            <span class="wechat-id-midl iconfont icon-ico"></span
            ><span class="wechat-id-last iconfont icon-arrowr"></span
          ></span>
          <div class="state">
            <span class="iconfont icon-plus">??????</span>
            <span> <img src="./assets/img/states.png" />???9????????? </span>
          </div>
        </div>
      </div>
      <div class="myprofile-content">
        <div class="my-function1">
          <div class="my-list-item">
            <img class="my-icon" src="./assets/img/??????.png" alt="" />
            <div class="my-list-item-right">
              <span class="my-list-item-name">??????</span>
              <i class="iconfont icon-jinru"> </i>
            </div>
          </div>
        </div>
        <div class="my-function2">
          <div class="my-list-item">
            <img class="my-icon" src="./assets/img/??????.png" alt="" />
            <div class="my-list-item-right">
              <span class="my-list-item-name">??????</span>
              <i class="iconfont icon-jinru"> </i>
            </div>
          </div>
          <div class="my-list-item">
            <img class="my-icon" src="./assets/img/?????????1.png" alt="" />
            <div class="my-list-item-right">
              <span class="my-list-item-name">?????????</span>
              <i class="iconfont icon-jinru"> </i>
            </div>
          </div>
          <div class="my-list-item">
            <img class="my-icon" src="./assets/img/??????.png" alt="" />
            <div class="my-list-item-right">
              <span class="my-list-item-name">??????</span>
              <i class="iconfont icon-jinru"> </i>
            </div>
          </div>
          <div class="my-list-item">
            <img class="my-icon" src="./assets/img/??????.png" alt="" />
            <div class="my-list-item-right">
              <span class="my-list-item-name">??????</span>
              <i class="iconfont icon-jinru"> </i>
            </div>
          </div>
        </div>
        <div class="my-function3">
          <div class="my-list-item">
            <img class="my-icon" src="./assets/img/??????.png" alt="" />
            <div class="my-list-item-right">
              <span class="my-list-item-name">??????</span>
              <i class="iconfont icon-jinru"> </i>
            </div>
          </div>
        </div>
      </div>
    </div>
    `
  }
}

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
          router.tabChange("/home")
          const active = document.querySelector(".active")
          active.classList.remove(active.classList[active.classList.length - 1])
          item.classList.add("active")
        } else if (index === 1) {
          router.tabChange("/contact")
          const active = document.querySelector(".active")
          active.classList.remove(active.classList[active.classList.length - 1])
          item.classList.add("active")
        } else if (index === 2) {
          router.tabChange("/find")
          const active = document.querySelector(".active")
          active.classList.remove(active.classList[active.classList.length - 1])
          item.classList.add("active")
        } else {
          router.tabChange("/my")
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
        <div>??????</div>
      </div>
      <div class="tab-item">
        <span class="iconfont icon-user-group"></span>
        <div>?????????</div>
      </div>
      <div class="tab-item">
        <span class="iconfont icon-faxian1">
          <i class="iconfont icon-yuandian"></i>
        </span>
        <div>??????</div>
      </div>
      <div class="tab-item">
        <span class="iconfont icon-user"></span>
        <div>???</div>
      </div>
    </div>
    `
  }
}

class Router {
  constructor() {
    this.stack = []
    this.urlStack = []
    window.addEventListener('popstate', (e) => {
      // console.log(this.urlStack)
      // console.log(e.state.url)
      console.log(location.pathname)
      if (location.pathname === '/') {
        window.history.pushState(null, '', '/home')
        return
      }
      if (!this.urlStack.find((ele) => ele === e.state?.url)) {
        this.urlgo(e.state?.url, e.state?.props)
      } else {
        this.urlback()
      }
    })
  }

  go(url, props) {
    window.history.pushState({
      url,
      props
    }, "", url) 
    this.urlgo(url, props)
  }

  urlgo(url, props) {
    const preURL = this.urlStack[this.urlStack.length - 1]
    this.urlStack.push(url)
    const curPageDom =
      this.stack.length > 0 ? this.stack[this.stack.length - 1].dom : undefined
    const Page = routes[url].component
    const pageInstance = new Page({ ...routes[url].props, ...props, preURL })
    this.stack.push(pageInstance)
    const nextPageDom = pageInstance.dom
    this.addAnimation(curPageDom, nextPageDom)
  }

  back(preURL) {
    window.history.pushState(null, '', preURL)
    this.urlback()
  }
  urlback() {
    this.urlStack.pop()
    const currentPage = this.stack.pop()

    const curPageDom = currentPage.dom
    const nextPageDom =
      this.stack.length > 0 ? this.stack[this.stack.length - 1].dom : undefined
    const animation = this.addAnimation(curPageDom, nextPageDom, false)
    animation.onfinish = () => {
      currentPage.componentUnmount()
    }
  }

  tabChange(url, props) {
    while (this.stack.length > 0) {
      const page = this.stack.pop()
      page.componentUnmount()
    }
    this.go(url, props)
  }

  addAnimation(curPageDom, nextPageDom, isGo = true) {
    if (this.stack.length == 2 && isGo) {
      const tab = document.querySelector(".tab")
      tab.classList.add("tab-hide")
      tab.animate(
        [
          {
            left: "0",
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
    }
    if (this.stack.length == 1 && !isGo) {
      const tab = document.querySelector(".tab")
      const ani = tab.animate(
        [
          {
            left: "-20%",
          },
          {
            left: "0",
          },
        ],
        {
          duration: 200,
          fill: "forwards",
        }
      )
      ani.onfinish = () => {
        tab.classList.remove("tab-hide")
      }
    }
    if (!curPageDom || !nextPageDom) return
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

class EventEmitter {
  constructor() {
    this.events = {}
  }
  // ????????????
  on(type, callBack) {
    if (!this.events[type]) {
      this.events[type] = [callBack]
    } else {
      this.events[type].push(callBack)
    }
  }
  // ????????????
  off(type, callBack) {
    if (!this.events[type]) return
    this.events[type] = this.events[type].filter((item) => {
      return item !== callBack
    })
  }
  // ???????????????????????????
  once(type, callBack) {
    function fn() {
      callBack()
      this.off(type, fn)
    }
    this.on(type, fn)
  }
  // ????????????
  emit(type, ...rest) {
    this.events[type] && this.events[type].forEach((fn) => fn.apply(this, rest))
  }
}

const eventEmitter = new EventEmitter()
// const detailPage = new DetailPage(eventEmitter)
// const groupPage = new GroupPage(eventEmitter, detailPage)
// const homePage = new HomePage(eventEmitter, groupPage)

const routes = {
  "/home": {
    component: HomePage,
    props: {
      title: "??????",
    },
  },
  "/chat": {
    component: ChatPage,
  },
  "/detail": {
    component: DetailPage,
  },
  "/contact": {
    component: ContactPage,
  },
  "/find": {
    component: FindPage,
  },
  "/my": {
    component: MyPage,
  },
}

const router = new Router()
router.go("/home")
new TabPage()
