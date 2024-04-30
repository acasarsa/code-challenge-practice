const chai = require('chai')
chai.config.truncateThreshold = 0
const { assert, expect, should } = chai

describe('sayHello', () => {
  it('should say hello', () => {
    assert.equal(sayHello('Qualified'), 'Hello, Qualified!')
  })
})

describe('Authorization', () => {
  beforeEach(() => {
    const permissions = [
      { role: 'superuser', name: 'lock user account', active: true },
      { role: 'superuser', name: 'unlock user account', active: true },
      { role: 'superuser', name: 'purchase widgets', active: false },
      { role: 'charger', name: 'view pick up locations', active: true },
      { role: 'rider', name: 'view my profile', active: true },
      { role: 'rider', name: 'scooters near me', active: true },
    ]

    const users = [
      { id: 1, name: 'Anna Administrator', roles: ['superuser'] },
      { id: 2, name: 'Charles N. Charge', roles: ['charger', 'rider'] },
      { id: 7, name: 'Ryder', roles: ['rider'] },
      { id: 11, name: 'Unregistered Ulysses', roles: [] },
      { id: 18, name: 'Tessa Tester', roles: ['beta tester'] },
    ]

    this.authorization = new Authorization(permissions, users)
  })

  it('listPermissions returns correct permission names when there is one role', () => {
    const result = this.authorization.listPermissions(7)
    expect(result, 'view my profile').to.include('view my profile')
    expect(result, 'scooters near me').to.include('scooters near me')
    expect(result.length).to.equal(2)
  })

  //   additional tests for listPermissions

  it('listPermissions returns correct permission names when there is multiple roles', () => {
    const result = this.authorization.listPermissions(2)
    expect(result).to.include('view pick up locations')
    expect(result).to.include('view my profile')
    expect(result).to.include('scooters near me')
    expect(result.length).to.equal(3)
  })

  it('listPermissions returns empty list when user or role cannot be found or the user has no permissions', () => {
    const user_with_no_roles = this.authorization.listPermissions(11)
    expect(user_with_no_roles).to.have.lengthOf(0)
    expect(user_with_no_roles).to.be.a('array')

    const unknown_user = this.authorization.listPermissions(100)
    expect(user_with_no_roles).to.have.lengthOf(0)
    expect(user_with_no_roles).to.be.a('array')
  })

  it('listPermissions does not return inactive permissions', () => {
    const result = this.authorization.listPermissions(1)
    expect(result.length).to.equal(2)
  })

  it('checkPermitted returns true for all of the permissions that exist for the user', () => {
    expect(
      this.authorization.checkPermitted('view pick up locations', 2),
      'view pick up locations'
    ).to.equal(true)
    expect(
      this.authorization.checkPermitted('view my profile', 2),
      'view my profile'
    ).to.equal(true)
    expect(
      this.authorization.checkPermitted('scooters near me', 2),
      'scooters near me'
    ).to.equal(true)
  })

  // additional checkPermitted test

  it('checkPermitted returns false when user cannot be found', () => {
    expect(this.authorization.checkPermitted(100)).to.equal(false)
  })

  it('checkPermitted returns false when permission cannot be found', () => {
    expect(
      this.authorization.checkPermitted('some fake permission', 2)
    ).to.equal(false)
  })
})
