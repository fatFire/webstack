import {Router, EventEmitter} from "./Router.js"


const router = new Router({ eventEmitter: new EventEmitter(), wrap: '#wrap'})
router.go("home")