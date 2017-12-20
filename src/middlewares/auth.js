/**
 * AuthMiddleware, you can get access
 * to myfirebase functionalities and vue auth guard via actions.
 * myfirebase => [auth, storage, database, firestore]
 * actions => [to, from, next()]
 * 
 * @param {object} myfirebase 
 * @param {object} actions 
 */
const AuthMiddleware = (myfirebase, actions) => {
    if (actions.to.matched.some(record => record.meta.auth)) {
        myfirebase.auth.check({
            then: (user) => {
                actions.next()
            },
            catch: () => {
                actions.next({ path: '/login' })
            }
        })
    } else {
        actions.next()
    }
}

export default AuthMiddleware