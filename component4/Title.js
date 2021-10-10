import Page from './Page.js'

class Title extends Page {

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
