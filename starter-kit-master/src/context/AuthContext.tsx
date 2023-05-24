// ** React Imports
import { createContext, useEffect, useState, ReactNode } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** Axios
import axios from 'axios'

// ** Config
import authConfig from 'src/configs/auth'

// ** Types
import { AuthValuesType, RegisterParams, LoginParams, ErrCallbackType, UserDataType } from './types'

// ** Defaults
const defaultProvider: AuthValuesType = {
  user: null,
  loading: true,
  setUser: () => null,
  setLoading: () => Boolean,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  register: () => Promise.resolve()
}

const AuthContext = createContext(defaultProvider)

type Props = {
  children: ReactNode
}

const AuthProvider = ({ children }: Props) => {
  // ** States
  const [user, setUser] = useState<UserDataType | null>(defaultProvider.user)
  const [loading, setLoading] = useState<boolean>(defaultProvider.loading)

  // ** Hooks
  const router = useRouter()
  useEffect(() => {
    const initAuth = async (): Promise<void> => {
      // setIsInitialized(true)
      const storedToken = window.localStorage.getItem('accessToken')!
      if (storedToken) {
        setLoading(false)
        await axios
          .get('http://localhost:4001/auth/me', {
            headers: {
              Authorization: `Bearer ${storedToken}`
            }
          })
          .then(async response => {
            setLoading(false)
            setUser({ ...response.data.userData })
          })
          .catch(() => {
            localStorage.removeItem('userData')
            localStorage.removeItem('refreshToken')
            localStorage.removeItem('accessToken')
            setUser(null)
            setLoading(false)
          })
      } else {
        setLoading(false)
      }

      // if (refreshToken) {
      // setLoading(true)
      // try {
      // const rs = await axios.post(`http://localhost:4001/auth/token/refresh`, {
      // refresh: refreshToken
      // })
      // console.log(rs.data)
      // window.localStorage.setItem(authConfig.storageTokenKeyName, rs.data.accessToken)
      // const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)!

      // if (storedToken) {
      // setLoading(false)
      // await axios
      // .get('http://localhost:4001/auth/me', {
      // headers: {
      // Authorization: `Bearer ${storedToken}`
      // }
      // })
      // .then(async response => {
      // setLoading(false)
      // setUser({ ...response.data.userData })
      // })
      // .catch(() => {
      // localStorage.removeItem('userData')
      // localStorage.removeItem('refreshToken')
      // localStorage.removeItem('accessToken')
      // setUser(null)
      // setLoading(false)
      // })
      // } else {
      // setLoading(false)
      // }

      // return
      // } catch (_error) {
      // return Promise.reject(_error)
      // }
      // } else {
      // setLoading(false)
      // }
    }
    initAuth()
  }, [])

  const handleLogin = (params: LoginParams, errorCallback?: ErrCallbackType) => {
    axios
      .post('http://localhost:4001/auth/login', params)
      .then(async response => {
        params.rememberMe
          ? window.localStorage.setItem(authConfig.storageTokenKeyName, response.data.accessToken)
          : null
        const returnUrl = router.query.returnUrl

        setUser({ ...response.data.userData })
        params.rememberMe ? window.localStorage.setItem('userData', JSON.stringify(response.data.userData)) : null
        window.localStorage.setItem(authConfig.onTokenExpiration, response.data.refreshToken)
        const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : '/'

        router.replace(redirectURL as string)
      })

      .catch(err => {
        if (errorCallback) errorCallback(err)
      })
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('userData')
    window.localStorage.removeItem(authConfig.storageTokenKeyName)
    window.localStorage.removeItem(authConfig.onTokenExpiration)
    router.push('/login')
  }

  const handleRegister = (params: RegisterParams, errorCallback?: ErrCallbackType) => {
    axios
      .post(authConfig.registerEndpoint, params)
      .then(res => {
        if (res.data.error) {
          if (errorCallback) errorCallback(res.data.error)
        } else {
          handleLogin({ email: params.email, password: params.password })
        }
      })
      .catch((err: { [key: string]: string }) => (errorCallback ? errorCallback(err) : null))
  }

  const values = {
    user,
    loading,
    setUser,
    setLoading,
    login: handleLogin,
    logout: handleLogout,
    register: handleRegister
  }

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthProvider }
