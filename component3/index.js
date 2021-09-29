import Router from "./Router.js"
import TabPage from "./TabPage.js"


const router = new Router()
router.go("/home")
new TabPage({ router })