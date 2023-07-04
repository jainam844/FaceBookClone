import { createContext } from 'react'
import { IUserContext, UserDataContext } from '../../Models/UserContext'

const UserContext = createContext<IUserContext>(new UserDataContext())

export default UserContext
