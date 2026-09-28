const config = {
  baseUrl: 'https://nomoreparties.co/v1/higher-front-back-dev_cohort_01',
  headers: {
    authorization: '089efec7-fb15-4ffa-82dc-f7b95f4a1f5a',
    'Content-Type': 'application/json'
  }
};


function request(url, options) {
  return fetch(url, options)
    .then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`);
    });
}


export function getUserInfo() {
  return request(`${config.baseUrl}/users/me`, {
    headers: config.headers
  });
}


export function getCards() {
  return request(`${config.baseUrl}/cards`, {
    headers: config.headers
  });
}
export function editProfile(data) {
  return request(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: data.name,
      about: data.about
    })
  });
}
export function addCardApi(data) {
  return request(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: data.name,
      link: data.link
    })
  });
}
export function deleteCardApi(cardId) {
  return request(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  });
}
export function likeCardApi(cardId) {
  return request(`${config.baseUrl}/cards/${cardId}/likes`, {
    method: 'PUT',
    headers: config.headers
  });
}


export function unlikeCardApi(cardId) {
  return request(`${config.baseUrl}/cards/${cardId}/likes`, {
    method: 'DELETE',
    headers: config.headers
  });
}