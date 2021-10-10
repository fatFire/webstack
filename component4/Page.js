class Page {
  constructor(props) {
    this.props = props || {}
    this.state = null
    this.componentWillMount()
    this.domString = this.render()
    this.compile()
    this.componentDidMount()
  }

  componentWillMount() {}

  render() {}

  compile() {
    this.dom = this.stringToDom(this.domString)
    if (!this.props.node) {
      const wrap = document.querySelector(this.props.parentSelector)
      wrap.appendChild(this.dom)
    }
  }

  componentDidMount() {}

  recompile() {}

  childEventstoParent(...events) {
    if (this.props.node) {
      this.props.node.childEvents = this.props.node.childEvents || []
      this.props.node.childEvents.push(...events)
    } else {
      [...events, ...this.childEvents].forEach((event) => event())
    }
  }

  setState(state) {
    this.state = state
    this.recompile()
  }

  destoryPage() {
    const wrap = document.querySelector("#wrap")
    wrap.removeChild(this.dom)
  }

  innerHTML(selector, dom, pos = "afterbegin") {
    const wrap = this.dom.querySelector(selector) || this.dom
    wrap.insertAdjacentElement(pos, dom)
  }

  stringToDom(domString) {
    const domParser = new DOMParser()
    return domParser.parseFromString(domString, "text/html").body
      .firstElementChild
  }
}

export default Page