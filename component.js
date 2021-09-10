class Page {
  constructor(eventEmitter, bindPage) {
    this.bindPage = bindPage
    this.eventEmitter = eventEmitter
  }
}

class HomePage extends Page{

  constructor(eventEmitter, bindPage) {
    super(eventEmitter, bindPage)
    this.type = 'homePage'
  }

  init() {
    console.log(this.type + 'init')
    const click = document.querySelector(`.${this.type}click`)
    click && click.addEventListener(`click`, () => {
      console.log(1)
      this.eventEmitter.emit(`${this.type}click`)
    })
    const back = document.querySelector(`.${this.type}back`)
    back && back.addEventListener('click', () => {
      this.eventEmitter.emit(`${this.type}back`)
    })
  }

  render() {
    return ( `
      <style>
        @font-face {
          font-family: 'pingFangSC-Medium';
          src: url('./assets/苹方黑体-准-简.ttf');
          font-weight: normal;
          font-style: normal;
        }
        html,body{
          height: 100%;
          font-family: 'pingFangSC-Medium', sans-serif;
        }
        body {
          margin: 0;
          padding: 0;
        }
        .home {
          position: absolute;
          background-color: rgb(237, 237, 237);
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
        }
        .content {
          flex: 1;
        }
        
        .list-item {
          height: 50px;
          display: flex;
        }
        .list-item img {
          width: 40px;
          margin: 0 10px;
          border-radius: 3px;
          align-self: center;
        }
        .home-head {
          margin: 30px 0 10px;
          text-align: center;
          position: relative;
        }
        .home-head img {
          position: absolute;
          right: 10px;
          top: 50%;
          transform: translateY(-50%);
        }
        .content {
          border-top: 1px solid rgb(213, 213, 213);
        }
        .abstract {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          border-bottom: 1px solid rgb(213, 213, 213);
        }
        .tab {
          height: 60px;
          display: flex;
          justify-content: space-around;
          align-items: center;
          background-color: rgb(244, 244, 244);
          border-top: 1px solid rgb(212, 212, 212);
        }
        .icon-wrap {
          display: flex;
          flex-direction: column;
          align-items: center;
          font-size: 12px;
        }
        .icon-wrap > div {
          transform: scale(0.9);
        }
        .active {
          color: rgb(87, 190, 106);
        }
      </style>
      <div class="home">
        <div class="home-head">
          微信
          <img src="./assets/add.svg">
        </div>
        <div class="content">
          <div class="list-item ${this.type}click">
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

class GroupPage extends Page{

  constructor(eventEmitter, bindPage) {
    super(eventEmitter, bindPage)
    this.type = 'groupPage'
  }

  init() {
    console.log(this.type + 'init')
    const click = document.querySelector(`.${this.type}click`)
    click && click.addEventListener(`click`, () => {
      
      this.eventEmitter.emit(`${this.type}click`)
    })
    const back = document.querySelector(`.${this.type}back`)
    console.dir(back)
    back && back.addEventListener('click', () => {
      console.log('grouppage back click')
      this.eventEmitter.emit(`${this.type}back`)
    })
  }

  render() {
    return `
      <style>
        .group-head {
          margin: 30px 0 10px;
          display: flex;
          justify-content: space-between;
          padding: 0 10px;
        }
        .message {
          margin: 10px 0;
          display: flex;
          align-items: flex-start;
        }
        .message-avatar {
          display: inline-block;
          width: 30px;
          margin: 0 10px;
          border-radius: 3px;
        }
        .message-words {
          padding: 5px 10px;
          background-color: white;
          border-radius: 3px;
          max-width: calc(100vw - 120px);
          position: relative;
        }
        .group-content {
          border-top: 1px solid rgb(213, 213, 213);
        }
        .group {
          position: absolute;
          background-color: rgb(237, 237, 237);
          width: 100%;
          height: 100%;
        }
        input {
          background:none;  
          outline:none;  
          border:none;
          height: 60%;
          background-color: white;
          border-radius: 5px;
          flex: 1;
        }
        .input {
          display: flex;
          align-items: center;
          height: 50px;
          background-color: rgb(246, 246, 246);
          position: absolute;
          bottom: 0;
          width: 100%;
        }
        .input > * {
          margin-right: 10px;
        }
        .input div:first-child {
          margin-left: 10px;
        }
      </style>
      <div class="group">
        <div class="group-head">
          <div class="${this.type}back iconfont icon-fanhui"></div>
          <div>胖火花</div>
          <div class="iconfont icon-gengduo"></div>
        </div>
        <div class="group-content">
          <div class="message">
            <img src="./assets/avatar.jpg" class="message-avatar ${this.type}click">
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

  constructor(eventEmitter, bindPage) {
    super(eventEmitter, bindPage)
    this.type = 'detailPage'
  }

  init() {
    const click = document.querySelector(`.${this.type}click`)
    
    click && click.addEventListener(`click`, () => {
      this.eventEmitter.emit(`${this.type}click`)
    })
    const back = document.querySelector(`.${this.type}back`)
    console.dir(back)
    back && back.addEventListener('click', () => {
      console.log('detailpage back click');
      this.eventEmitter.emit(`${this.type}back`)
    })
  }

  render() {
    return `
      <style>
        .information {
          height: 100%;
          width: 100%;
          position: absolute;
          background-color: rgb(237, 237, 237);
        }
        .information-head {
          display: flex;
          height: 50px;
          padding-left: 10px;
          padding-top: 13px;
          font-weight: bold;
          justify-content: space-between;
          align-items: center;
          background-color: white;
        }
        .introduction {
          padding: 20px 0;
          display: flex;
          background-color: white;
          margin-bottom: 10px;
        }
        .introduction img {
          width: 50px;
          border-radius: 5px;
          margin: 0 20px;
          align-self: center;
        }
        .introduction-self {
          display: inline-flex;
          flex-direction: column;
        } 
        .introduction-self span {
          color: rgb(156, 156, 156);
          font-size: 12px;
        }
        .friends {
          padding: 0 15px;
          display: flex;
          align-items: center;
          height: 60px;
          justify-content: space-between;
          background-color: white;
          margin-bottom: 10px;
        }
        .contact {
          height: 50px;
          background-color: white;
          display: flex;
          justify-content: center;
          align-items: center;
          color: rgb(93, 108, 147);
        }
        .contact span:first-child{
          margin-right: 5px;
        }
      </style>
      <div class="information">
        <div class="information-head">
          <div class="${this.type}back iconfont icon-fanhui"></div>
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
  constructor(pages, eventEmitter) {
    this.eventEmitter = eventEmitter
    this.wrap = document.querySelector('#wrap')
    const homePage = pages[0]
    this.wrap.innerHTML = homePage.render()
    homePage.init()
    this.stack = [homePage]
    this.eventRegist(pages)
    console.log(this.eventEmitter.listener)
  }
  eventRegist(pages) {
    pages.forEach((page) => {
      this.eventEmitter.on(`${page.type}click`, () => {
        const bindPage = page.bindPage
        this.wrap.innerHTML = this.wrap.innerHTML + bindPage.render()
        this.wrap.lastElementChild.animate([
          {
            left: '100%'
          },
          {
            left: 0
          }
        ], {
          duration: 500,
          fill: "forwards"
        })
        bindPage.init()
        this.stack.push(bindPage)
      })
      this.eventEmitter.on(`${page.type}back`, () => {
        this.stack.pop()
        console.log(1)
        this.wrap.lastElementChild.animate([
          {
            left: 0
          },
          {
            left: '100%'
          }
        ], {
          duration: 500,
          fill: "forwards"
        })
        setTimeout(() => {
          console.log(this)
          const backPage = this.stack[this.stack.length - 1]
          this.wrap.removeChild(this.wrap.lastElementChild)
          this.wrap.removeChild(this.wrap.lastElementChild)
          // this.wrap.innerHTML = backPage.render()
          backPage.init()
        }, 500)
      })
    })
  }
}
class EventEmitter {
  constructor() {
    this.listener = []
  }

  on(type, handler) {
    if (!this.listener[type]) {
      this.listener[type] = []
    }
    this.listener[type].push({
      handler,
      isOnce: false
    })
  }

  once(type, handler) {
    if (!this.listener[type]) {
      this.listener[type] = []
    }
    this.listener[type].push({
      handler,
      isOnce: true
    })
  }

  emit(type, ...args) {
    let list = this.listener[type]
    if (list) {
      for(let i = list.length - 1; i>=0; i--) {
        const item = list[i]
        item.handler(...args)
        if (item.isOnce) {
          list.splice(i, 1)
        }
      }
    }
  }

  off(type, handler) {
    let list = this.listener[type]
    if (list) {
      const index = list.findIndex(item => item.handler === handler)
      if (index !== -1) {
        list.splice(index, 1)
      }
      if (list.length === 0) {
        delete this.listener[type]
      }
    }
  }
}

const eventEmitter = new EventEmitter()
const detailPage = new DetailPage(eventEmitter)
const groupPage = new GroupPage(eventEmitter, detailPage)
const homePage = new HomePage(eventEmitter, groupPage)

new WebStack([homePage, groupPage, detailPage], eventEmitter)



