import cookie from 'cookiejs';

export const getAuthCookie = () => {
  return cookie.get('gitin:token');
};

export const hasAuthCookie = () => {
  return !!getAuthCookie();
};
