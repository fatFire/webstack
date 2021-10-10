import HomePage from "./HomePage.js"
import DetailPage from "./DetailPage.js"
import ChatPage from "./ChatPage.js"
import ContactPage from "./ContactPage.js"
import FindPage from "./FindPage.js"
import MyPage from "./MyPage.js"


const routes = {
  "home": {
    component: HomePage,
    props: {
      title: "微信",
    },
  },
  "chat": {
    component: ChatPage,
  },
  "detail": {
    component: DetailPage,
  },
  "contact": {
    component: ContactPage,
    props: {
      title: "通讯录",
    },
  },
  "find": {
    component: FindPage,
    props: {
      title: "发现",
    },
  },
  "my": {
    component: MyPage,
  },
}

export default routes