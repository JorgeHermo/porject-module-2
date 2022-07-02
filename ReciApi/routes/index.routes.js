module.exports = app => {
  app.use('/', require('./base.routes'))
  app.use('/auth', require('./auth.routes'))
  /* app.use('/users', require('./user.routes'))
  app.use('/admin', require('./admin.routes'))
  app.use('/recipes', require('./recipe.routes'))
  app.use('/maps', require('./maps.routes')) */
}
