import Page from "./Page.js"
import TabPage from "./TabPage.js"
import WXPage from "./wxPage.js"
import ContactPage from "./ContactPage.js"
import FindPage from "./FindPage.js"
import MyPage from "./MyPage.js"

class HomePage extends Page {
  componentDidMount() {
    this.childEventstoParent()
  }

  render() {
    const wxPage = new WXPage({...this.props, node: this })
    const contactPage = new ContactPage({...this.props, node: this })
    const findPage = new FindPage({...this.props, node: this })
    const myPage = new MyPage({ ...this.props, node: this })

    return `
      <div class="homepage">
        <div class="main">
          ${wxPage.render()}
          ${contactPage.render()}
          ${findPage.render()}
          ${myPage.render()}
        </div>
        ${new TabPage({
          node: this,
          tab1: wxPage.className,
          tab2: contactPage.className,
          tab3: findPage.className,
          tab4: myPage.className,
          defaultDisplay: wxPage
        }).render()}
      </div>
      `
  }
}

export default HomePage
