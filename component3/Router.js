import routes from "./Routes.js"

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
    const pageInstance = new Page({ ...routes[url].props, ...props, preURL, router: this })
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

export default Router