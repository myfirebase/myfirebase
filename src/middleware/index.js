/**
 * Here where you can register your middlewares.
 */

// import AuthMiddleware
import AuthMiddleware from './auth'

// register AuthMiddleware
const middlewares = [AuthMiddleware]

export default middlewares