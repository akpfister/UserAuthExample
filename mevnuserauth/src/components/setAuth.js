import Cookies from 'universal-cookie'
const cookies = new Cookies();

export function setToken (token) {
  console.log("here");
  cookies.set('token', token, { path: '/' })
}
