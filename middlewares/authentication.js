const {validateToken} = require('../services/authentication');
function checkForAuthenticationCookies(cookieName){
    return(req, res, next) => {
        const tokenCookieValue = req.cookies[cookieName];
        if(!tokenCookieValue) {
            res.locals.user = null;
            return next();
        }
        try{
            const userPayload = validateToken(tokenCookieValue);
            req.user = userPayload;
            res.locals.user = userPayload;
        } catch (error) {}
        
        return next();
    };
}

module.exports = {
    checkForAuthenticationCookies,
};