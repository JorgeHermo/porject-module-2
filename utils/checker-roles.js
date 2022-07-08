const rolesChecker = user => {
    
    return {
        isAdmin: user?.role === "ADMIN",
        isUser: user?.role === "USER"
    }
}
 
module.exports = { rolesChecker }