import {Router, EventEmitter} from "./Router.js"
import routes from "./Routes.js"


const router = new Router({ routes, eventEmitter: new EventEmitter(), wrap: '#wrap'})
router.go("home")