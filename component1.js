class Page {
  
  componentDidMount() {}
  
}

class HomePage extends Page {
  

  componentDidMount() {
    this.go()
  }

  go() {
    const go = document.querySelector('.homepagego')
    go.addEventListener('click', () => {
      webstack.go(new ChatPage())
    })
  }

  render() {
    return ( `
      <div class="home">
        <div class="home-head">
          微信
          <img src="./assets/add.svg">
        </div>
        <div class="content">
          <div class="list-item homepagego">
            <img src="./assets/avatar.jpg" alt="">
            <div class="abstract">
              <span style="font-size: 14px;">胖火花</span>
              <span style="font-size: 12px; color: rgb(177, 177, 177)">hello world</span>
            </div>
          </div>
        </div>
        <div class="tab">
          <div class="icon-wrap active">
            <span class="iconfont icon-weixin-fill"></span>
            <div>微信</div>
          </div>
          <div class="icon-wrap">
            <span class="iconfont icon-tongxunlu"></span>
            <div>通讯录</div>
          </div>
          <div class="icon-wrap">
            <span class="iconfont icon-faxian"></span>
            <div>发现</div>
          </div>
          <div class="icon-wrap">
            <span class="iconfont icon-wo"></span>
            <div>我</div>
          </div>
        </div>
      </div>
      `
    )
  }
}

class ChatPage extends Page{

  componentDidMount() {
    this.go()
    this.back()
  }

  go() {
    const go = document.querySelector('.chatpagego')
    go.addEventListener('click', () => {
      webstack.go(new DetailPage())
    })
  }

  back() {
    const back = document.querySelector('.chatpageback')
    back.addEventListener('click', () => {
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

class DetailPage extends Page{

  componentDidMount() {
    this.back()
  }
  
  back() {
    const click = document.querySelector('.detailpageback')
    click.addEventListener('click', () => {
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

class WebStack {
  constructor() {
    this.webstack = []
    this.wrap = document.querySelector('#wrap')
  }

  init(page) {
    this.webstack = []
    const initPageDom = this.stringToDom(page.render())
    this.wrap.replaceChildren(initPageDom)
    page.componentDidMount()
    this.webstack.push(initPageDom)
  }

  go(nextPage) {
    const nextPageDom = this.stringToDom(nextPage.render())
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

  stringToDom(domString) {
    const domParser = new DOMParser()
    return domParser.parseFromString(domString, 'text/html').body.firstElementChild
  }

  addAnimation(curPageDom, nextPageDom, isGo = true) {
    let curPageAnimation
    if(isGo) {
      nextPageDom.animate([
        {
          left: '100%'
        },
        {
          left: 0
        }
      ], {
        duration: 200,
        fill: "forwards"
      })
      curPageDom.animate([
        {
          left: 0
        },
        {
          left: '-20%'
        }
      ], {
        duration: 200,
        fill: "forwards"
      })
    } else {
      curPageAnimation = curPageDom.animate([
        {
          left: 0
        },
        {
          left: '100%'
        }
      ], {
        duration: 200,
        fill: "forwards"
      })
      nextPageDom.animate([
        {
          left: '-20%'
        },
        {
          left: 0
        }
      ], {
        duration: 200,
        fill: "forwards"
      })
    }
    return curPageAnimation
  }
  
}
class EventEmitter {
  constructor() {
    this.events = {};
  }
  // 实现订阅
  on(type, callBack) {
    if (!this.events[type]) {
      this.events[type] = [callBack];
    } else {
      this.events[type].push(callBack);
    }
  }
  // 删除订阅
  off(type, callBack) {
    if (!this.events[type]) return;
    this.events[type] = this.events[type].filter((item) => {
      return item !== callBack;
    });
  }
  // 只执行一次订阅事件
  once(type, callBack) {
    function fn() {
      callBack();
      this.off(type, fn);
    }
    this.on(type, fn);
  }
  // 触发事件
  emit(type, ...rest) {
    this.events[type] &&
      this.events[type].forEach((fn) => fn.apply(this, rest));
  }
}

const eventEmitter = new EventEmitter()
// const detailPage = new DetailPage(eventEmitter)
// const groupPage = new GroupPage(eventEmitter, detailPage)
// const homePage = new HomePage(eventEmitter, groupPage)

const webstack = new WebStack()
webstack.init(new HomePage())



