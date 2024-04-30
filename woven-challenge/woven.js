class Authorization {
  constructor(permissions, users) {
    this.permissions = permissions
    this.users = users
  }

  find_current_user(userId) {
    return this.users.find((user) => user.id === userId)
  }

  listPermissions(userId) {
    const current_user = this.find_current_user(userId)
    const current_user_permissions = []

    if (!current_user) {
      return []
    }

    this.permissions.forEach((p) => {
      if (p.active === false) {
        return null
      }
      current_user.roles.forEach((role) => {
        if (role === p.role) {
          current_user_permissions.push(p.name)
        }
      })
    })

    return current_user_permissions
  }

  checkPermitted(permissionName, userId) {
    const current_user = this.find_current_user(userId)

    if (!current_user) {
      return false
    }

    const current_user_permissions = this.listPermissions(userId)
    const result = current_user_permissions.find((p) => p === permissionName)

    return result ? true : false
  }
}

const sayHello = (name) => {
  return name ? `Hello, ${name}!` : 'Hello there!'
}
