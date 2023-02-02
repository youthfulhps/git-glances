import cookie from 'cookiejs';

export const getAuthCookie = () => {
  return cookie.get('gitin:token');
};

export const hasAuthCookie = () => {
  return !!getAuthCookie();
};

export const removeAuthCookie = () => {
  return cookie.remove('gitin:token');
};
