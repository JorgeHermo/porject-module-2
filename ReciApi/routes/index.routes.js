module.exports = app => {
  app.use('/', require('./base.routes'))
  app.use('/', require('./auth.routes'))
  app.use('/users', require('./user.routes'))
  app.use('/recipes', require('./recipe.routes'))
  app.use('/api', require('./api.routes'))
  app.use('/maps', require('./maps.routes'))
  app.use('/admin', require('./admin.routes'))
  app.use('/comments', require('./comment.routes'))
} 
