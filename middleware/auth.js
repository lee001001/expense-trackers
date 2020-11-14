module.exports = {
  authenticator: (req, res, next) => { // 會出一個物件 叫做authenticator 物件的 的函式
    if (req.isAuthenticated()) { // Passport.js 提供的函式，會根據 request 的登入狀態回傳 true 或 false。
      return next()
    }
    req.flash('warning_msg', '請先登入才能使用！')
    res.redirect('/users/login')
  }
}
