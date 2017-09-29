/**
 * Here where you can register your middlewares
 * you can simply do that by adding them to the middlewares array.
 */

// import AuthMiddleware.
import AuthMiddleware from './auth'

// register AuthMiddleware.
const middlewares = [AuthMiddleware]

export default middlewares