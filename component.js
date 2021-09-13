// class Page {
//   constructor(eventEmitter, bindPage) {
//     this.bindPage = bindPage
//     this.eventEmitter = eventEmitter
//   }
// }

// class HomePage extends Page{

//   constructor(eventEmitter, bindPage) {
//     super(eventEmitter, bindPage)
//     this.type = 'homePage'
//   }

//   init() {
//     const click = document.querySelector(`.${this.type}click`)
//     click && click.addEventListener(`click`, () => {
//       this.eventEmitter.emit(`${this.type}click`)
//     })
//     const back = document.querySelector(`.${this.type}back`)
//     back && back.addEventListener('click', () => {
//       this.eventEmitter.emit(`${this.type}back`)
//     })
//   }

//   render() {
//     return ( `
//       <div class="home">
//         <div class="home-head">
//           微信
//           <img src="./assets/add.svg">
//         </div>
//         <div class="content">
//           <div class="list-item ${this.type}click">
//             <img src="./assets/avatar.jpg" alt="">
//             <div class="abstract">
//               <span style="font-size: 14px;">胖火花</span>
//               <span style="font-size: 12px; color: rgb(177, 177, 177)">hello world</span>
//             </div>
//           </div>
//         </div>
//         <div class="tab">
//           <div class="icon-wrap active">
//             <span class="iconfont icon-weixin-fill"></span>
//             <div>微信</div>
//           </div>
//           <div class="icon-wrap">
//             <span class="iconfont icon-tongxunlu"></span>
//             <div>通讯录</div>
//           </div>
//           <div class="icon-wrap">
//             <span class="iconfont icon-faxian"></span>
//             <div>发现</div>
//           </div>
//           <div class="icon-wrap">
//             <span class="iconfont icon-wo"></span>
//             <div>我</div>
//           </div>
//         </div>
//       </div>
//       `
//     )
//   }
// }

// class GroupPage extends Page{

//   constructor(eventEmitter, bindPage) {
//     super(eventEmitter, bindPage)
//     this.type = 'groupPage'
//   }

//   init() {
//     const click = document.querySelector(`.${this.type}click`)
//     click && click.addEventListener(`click`, () => {
      
//       this.eventEmitter.emit(`${this.type}click`)
//     })
//     const back = document.querySelector(`.${this.type}back`)
//     back && back.addEventListener('click', () => {
//       this.eventEmitter.emit(`${this.type}back`)
//     })
//   }

//   render() {
//     return `
//       <div class="group">
//         <div class="group-head">
//           <div class="${this.type}back iconfont icon-fanhui"></div>
//           <div>胖火花</div>
//           <div class="iconfont icon-gengduo"></div>
//         </div>
//         <div class="group-content">
//           <div class="message">
//             <img src="./assets/avatar.jpg" class="message-avatar ${this.type}click">
//             <div class="message-words iconfont icon-zuosanjiao1">hello world</div>
//           </div>
//         </div>
//         <div class="input">
//           <div class="iconfont icon-yuyin"></div>
//           <input>
//           <div class="iconfont icon-xiaolian"></div>
//           <div class="iconfont icon-jiahao"></div>
//         </div>
//       </div>
//     `
//   }
// }

// class DetailPage extends Page{

//   constructor(eventEmitter, bindPage) {
//     super(eventEmitter, bindPage)
//     this.type = 'detailPage'
//   }

//   init() {
//     const click = document.querySelector(`.${this.type}click`)
    
//     click && click.addEventListener(`click`, () => {
//       this.eventEmitter.emit(`${this.type}click`)
//     })
//     const back = document.querySelector(`.${this.type}back`)
//     back && back.addEventListener('click', () => {
//       this.eventEmitter.emit(`${this.type}back`)
//     })
//   }

//   render() {
//     return `
//       <div class="information">
//         <div class="information-head">
//           <div class="${this.type}back iconfont icon-fanhui"></div>
//         </div>
//         <div class="introduction">
//           <img src="./assets/avatar.jpg">
//           <div class="introduction-self">
//             <span style="font-size: 18px; color: black" class="iconfont icon-touxiang-nan">胖火花</span>
//             <span>微信号：wechat</span>
//             <span>地区：中国</span>
//           </div>
//         </div>
//         <div class="friends">
//           <span >朋友圈</span>
//           <span class="iconfont icon-jinru"></span>
//         </div>
//         <div class="contact">
//           <span class="iconfont icon-comment"></span>
//           <span>发消息</span>
//         </div>
//       </div>
//     `
//   }
// }

// class WebStack {
//   constructor(pages, eventEmitter) {
//     this.eventEmitter = eventEmitter
//     this.wrap = document.querySelector('#wrap')
//     const homePage = pages[0]
//     this.wrap.innerHTML = homePage.render()
//     homePage.init()
//     this.stack = [homePage]
//     this.eventRegist(pages)
//   }
//   eventRegist(pages) {
//     pages.forEach((page) => {
//       this.eventEmitter.on(`${page.type}click`, () => {
//         const bindPage = page.bindPage
//         this.wrap.innerHTML = this.wrap.innerHTML + bindPage.render()
//         this.wrap.lastElementChild.animate([
//           {
//             left: '100%'
//           },
//           {
//             left: 0
//           }
//         ], {
//           duration: 500,
//           fill: "forwards"
//         })
//         bindPage.init()
//         this.stack.push(bindPage)
//       })
//       this.eventEmitter.on(`${page.type}back`, () => {
//         this.stack.pop()
//         this.wrap.lastElementChild.animate([
//           {
//             left: 0
//           },
//           {
//             left: '100%'
//           }
//         ], {
//           duration: 500,
//           fill: "forwards"
//         })
//         setTimeout(() => {
//           const backPage = this.stack[this.stack.length - 1]
//           this.wrap.removeChild(this.wrap.lastElementChild)
//           // this.wrap.innerHTML = backPage.render()
//           backPage.init()
//         }, 500)
//       })
//     })
//   }
// }
// class EventEmitter {
//   constructor() {
//     this.events = {};
//   }
//   // 实现订阅
//   on(type, callBack) {
//     if (!this.events[type]) {
//       this.events[type] = [callBack];
//     } else {
//       this.events[type].push(callBack);
//     }
//   }
//   // 删除订阅
//   off(type, callBack) {
//     if (!this.events[type]) return;
//     this.events[type] = this.events[type].filter((item) => {
//       return item !== callBack;
//     });
//   }
//   // 只执行一次订阅事件
//   once(type, callBack) {
//     function fn() {
//       callBack();
//       this.off(type, fn);
//     }
//     this.on(type, fn);
//   }
//   // 触发事件
//   emit(type, ...rest) {
//     this.events[type] &&
//       this.events[type].forEach((fn) => fn.apply(this, rest));
//   }
// }

// const eventEmitter = new EventEmitter()
// const detailPage = new DetailPage(eventEmitter)
// const groupPage = new GroupPage(eventEmitter, detailPage)
// const homePage = new HomePage(eventEmitter, groupPage)

// new WebStack([homePage, groupPage, detailPage], eventEmitter)



