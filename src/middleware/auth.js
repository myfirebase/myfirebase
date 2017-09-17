const AuthMiddleware = (myfirebase, actions) => {
    if (actions.to.matched.some(record => record.meta.auth)) {
        myfirebase.auth.check({
            then: () => {
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