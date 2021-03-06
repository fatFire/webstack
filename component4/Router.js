class Router {
  constructor({ routes, wrap }) {
    this.count = 0
    this.stack = []
    this.wrap = wrap
    this.routes = routes
    this.nowURL = new URL(this.routes.baseURL).pathname
    this.eventEmitter = new EventEmitter()
    this.eventEmitter.on("go", this.handleGoEvent.bind(this))
    this.eventEmitter.on("back", this.handleBackEvent.bind(this))
    window.history.pushState = this._listenHistory(
      "pushState",
      this.eventEmitter
    )
    window.history.replaceState = this._listenHistory(
      "replaceState",
      this.eventEmitter
    )
    this._listenPopState()
  }

  _listenHistory(type, eventEmitter) {
    const origin = history[type]
    return function (state, title, url) {
      const returnValue = origin.apply(this, [state, title, url])
      eventEmitter.emit("go", state.url, state.props)
      return returnValue
    }
  }

  _listenPopState() {
    window.addEventListener("popstate", (e) => {
      if (e.state.count < this.count) {
        this.count = e.state.count
        this.eventEmitter.emit("back")
      } else {
        this.count = e.state.count
        this.eventEmitter.emit("go", e.state.url, e.state.props)
      }
    })
  }

  go(url, props) {
    this.count++
    if (this.nowURL.endsWith("/")) {
      this.nowURL = `${this.nowURL}${url}`
    } else {
      this.nowURL = `${this.nowURL}/${url}`
    }
    window.history.pushState(
      {
        count: this.count,
        props,
        url,
      },
      null,
      this.nowURL
    )
  }

  handleGoEvent(url, props) {
    const curPageDom =
      this.stack.length > 0 ? this.stack[this.stack.length - 1].dom : undefined
    const Page = this.routes[url].component
    const pageInstance = new Page({
      ...this.routes[url].props,
      ...props,
      router: this,
      parentSelector: this.wrap,
    })
    this.stack.push(pageInstance)
    const nextPageDom = pageInstance.dom
    this.addAnimation(curPageDom, nextPageDom)
  }

  back() {
    window.history.back()
  }
  handleBackEvent() {
    const currentPage = this.stack.pop()
    const curPageDom = currentPage.dom
    const nextPageDom =
      this.stack.length > 0 ? this.stack[this.stack.length - 1].dom : undefined
    const animation = this.addAnimation(curPageDom, nextPageDom, false)
    animation.onfinish = () => {
      currentPage.destoryPage()
    }
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

export { Router, EventEmitter }

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
