export class AuthApi {
  constructor(options) {
    this._baseUrl = options.baseUrl;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  signIn(email, password) {
    return fetch(this._baseUrl + "/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    }).then(this._checkResponse);
  }

  signUp(email, password) {
    return fetch(this._baseUrl + "/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    }).then(this._checkResponse);
  }

  checkTokenValidity(JWT) {
    return fetch(this._baseUrl + "/users/me", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${JWT}`,
      },
    }).then(this._checkResponse);
  }
}

const authApi = new AuthApi({ baseUrl: "https://auth.nomoreparties.co" });
export default authApi;
