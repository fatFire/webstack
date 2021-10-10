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

  recompile() {}

  setState(state) {
    this.state = state
    this.recompile()
  }

  innerHTML(selector, dom, pos = "afterbegin") {
    const wrap = this.dom.querySelector(selector) || this.dom
    wrap.insertAdjacentElement(pos, dom)
  }

  destoryPage() {
    const wrap = document.querySelector("#wrap")
    wrap.removeChild(this.dom)
  }

  stringToDom(domString) {
    const domParser = new DOMParser()
    return domParser.parseFromString(domString, "text/html").body
      .firstElementChild
  }
}

export default Page