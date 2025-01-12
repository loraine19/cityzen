const isProduction = process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'docker';
export const FETCH_URL = isProduction ? "https://back.imagindev-app.fr" : "http://localhost:3000";

export const GM_API_KEY = 'AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY'