/**
 * Here where you can register your middlewares
 * you can simply do that by adding them to the middlewares array.
 */

// Import AuthMiddleware.
import AuthMiddleware from '@/middlewares/auth'

// Register AuthMiddleware.
const middlewares = [AuthMiddleware]

export default middlewares
