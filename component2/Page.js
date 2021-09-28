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

  setState(state) {
    this.state = state
  }

  componentUnmount() {
    const wrap = document.querySelector("#wrap")
    wrap.removeChild(this.dom)
  }

  stringToDom(domString) {
    const domParser = new DOMParser()
    return domParser.parseFromString(domString, "text/html").body
      .firstElementChild
  }
}