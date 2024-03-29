function getCookie(name: string): string {
  const nameLenPlus = name.length + 1;
  return (
    document.cookie
      .split(';')
      .map((c) => c.trim())
      .filter((cookie) => {
        return cookie.substring(0, nameLenPlus) === `${name}=`;
      })
      .map((cookie) => {
        return decodeURIComponent(cookie.substring(nameLenPlus));
      })[0] || ''
  );
}

export const setAuthCookie = (key: string, value: string) => {
  document.cookie = `${key}=${value}; SameSite=Strict`;
};

export default getCookie;
