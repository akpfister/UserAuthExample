import Cookies from 'universal-cookie'
const cookies = new Cookies();

axios.onRequest((config) => {
  var token = cookies.get('token');
  console.log("here middleware");
  if (token) {
    config.withCredentials = true;
    config.headers.common['x-access-token'] = token; // get token from cookies and set it here
  }
  // config.withCredentials = true
  return config
});
