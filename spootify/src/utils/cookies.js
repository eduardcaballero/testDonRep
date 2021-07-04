import Cookies from 'js-cookie'

const getToken = () => Cookies.get('token')

const setToken = token => Cookies.set('token', token)

const removeToken = () => Cookies.remove('token')


export { getToken, removeToken, setToken }
