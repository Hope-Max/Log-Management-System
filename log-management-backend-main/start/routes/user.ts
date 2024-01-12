import Route from '@ioc:Adonis/Core/Route'

const apiPrefix = '/api/v1/'

Route.group(() => {
  Route.post('user/login', 'UsersController.login')

  Route.post('user/does-exist', 'UsersController.doesUserExist')
  Route.post('user/send/otp', 'UsersController.sendOTP')
  Route.post('user/verify/otp', 'UsersController.verifyOTP')
}).prefix(apiPrefix)

Route.group(() => {
  Route.post('user/create', 'UsersController.create')
  Route.get('user/:id', 'UsersController.getUser')
  Route.put('user/update/:id', 'UsersController.update')
  Route.delete('user/delete/:id', 'UsersController.delete')

  Route.get('users/list', 'UsersController.list')
  Route.get('user', 'UsersController.show')
  Route.put('user/update-password', 'UsersController.updatePassword')
})
  .prefix(apiPrefix)
  .middleware('auth')
