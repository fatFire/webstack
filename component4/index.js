import {Router, EventEmitter} from "./Router.js"
import routes from "./Routes.js"


const router = new Router({ routes, wrap: '#wrap'})
router.go("home")