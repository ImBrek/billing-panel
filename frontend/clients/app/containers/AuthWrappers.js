import { UserAuthWrapper } from 'redux-auth-wrapper'
import { replace } from 'react-router-redux'

export const UserIsAuthenticated = UserAuthWrapper({
    authSelector: state => state.token,
    redirectAction: replace,
    wrapperDisplayName: 'UserIsAuthenticated'
})