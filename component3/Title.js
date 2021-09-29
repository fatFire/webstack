import Page from './Page.js'

class Title extends Page {
  constructor(props) {
    super(props)
  }

  compile() {
    if (this.props.node) {
      this.props.node.innerHTML(this.props.selector, this.dom, this.props.pos)
    } else {
      const wrap = document.querySelector("#wrap")
      wrap.appendChild(this.dom)
    }
  }

  render() {
    const title = this.props.title ? this.props.title : ""
    const back = this.props.back
      ? `<div class="${this.props.id}pageback iconfont icon-fanhui"></div>`
      : ""
    const slot = this.props.icon
      ? `<div class="iconfont ${this.props.icon}"></div>`
      : ""

    return `
        <div class="${this.props.id}-head">
          ${back}
          ${title}
          ${slot}
        </div>
    `
  }
}

export default Title
