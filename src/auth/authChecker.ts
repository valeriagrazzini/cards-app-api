import { AuthChecker } from 'type-graphql'
import { Context } from './context.interface'

const authChecker: AuthChecker<Context> = ({ context: { user } }, roles) => {
  if (roles.length === 0) {
    // if `@Authorized()`, check only if user exists
    return user !== undefined
  }
  // there are some roles defined now

  if (!user) {
    // and if no user, restrict access
    return false
  }
  if (user.roles && user.roles.some((role) => roles.includes(role))) {
    // grant access if the roles overlap
    return true
  }

  // no roles matched, restrict access
  return false
}
export default authChecker
