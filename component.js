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
        .home {
          position: absolute;
          background-color: rgb(234, 234, 234);
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
        }
        .content {
          flex: 1;
        }
        .tab {
          height: 80px;
          display: flex;
          justify-content: space-around;
          align-items: center;
        }
        .list-item {
          height: 50px;
          line-height: 50px;
          padding: 0 30px;
          border-top: 1px solid #ccc;
          border-bottom: 1px solid #ccc;
        }
      </style>
      <div class="home">
        <div class="content">
          <h3 style="text-align: center;">微信</h3>
          <div class="list">
            <div class="list-item ${this.type}click">前端学习</div>
          </div>
        </div>
        <div class="tab">
            <div>微信</div>
            <div>通讯录</div>
            <div>发现</div>
            <div>我</div>
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
        .group {
          position: absolute;
          background-color: rgb(234, 234, 234);
          width: 100%;
          height: 100%;
        }
        
        .group-head {
          display: flex;
          height: 50px;
          padding: 0 10px;
          font-weight: bold;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid #ccc;
        }
        .message {
          padding: 10px;
          display: flex;
          align-items: center;
        }
        .message-avatar {
          display: inline-block;
          width: 50px;
          height: 50px;
          background: no-repeat url(./avatar.jpg);
          background-size: contain;
          border-radius: 5px;
        }
        .message-words {
          display: inline-block;
          height: 50px;
          padding: 0 10px;
          background-color: white;
          line-height: 50px;
          border-radius: 5px;
          margin-left: 15px;
        }
        .message-words::before {
          display: block;
          position: absolute;
          margin-left: -20px;
          margin-top: 20px;
          content: '';
          border-top: 5px solid transparent;
          border-bottom: 5px solid transparent;
          border-right: 10px solid white;
        }
      </style>
      <div class="group">
        <div class="group-head">
          <div class="${this.type}back"><</div>
          <div>前端学习</div>
          <div>...</div>
        </div>
        <div class="group-content">
          <div class="message">
            <span class="message-avatar ${this.type}click"></span>
            <div class="message-words">hello world</div>
          </div>
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
          background-color: rgb(234, 234, 234);
          
        }
        .information-head {
          display: flex;
          height: 50px;
          padding: 0 10px;
          font-weight: bold;
          justify-content: space-between;
          align-items: center;
        }
        .introduction {
          padding: 10px 0;
          display: flex;
          
        }
        .introduction-avatar {
          display: inline-block;
          width: 60px;
          height: 60px;
          background: no-repeat url(./avatar.jpg);
          background-size: contain;
          border-radius: 5px;
          margin: 0 20px;
        }
        .introduction-self {
          display: inline-flex;
          flex-direction: column;
          font-size: 14px;
        }
      </style>
      <div class="information">
        <div class="information-head">
          <div class="${this.type}back"><</div>
          <div>...</div>
        </div>
        <div class="introduction">
          <div class="introduction-avatar"></div>
          <div class="introduction-self">
            <span style="font-size: 18px; font-weight: bold;">胖火花</span>
            <span>微信号：wechat</span>
            <span>地区：中国</span>
          </div>
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



