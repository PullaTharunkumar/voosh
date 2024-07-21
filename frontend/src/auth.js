import cookies from 'js-cookie';

function auth() {
    const token = cookies.get('access_token')
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };
    return config
}

export default auth;