import $ from 'jquery';

export default function fetch(url, data = {}) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      $.ajax({
        url,
        data,
        method: 'POST',
        dataType: 'json',
        contentType: 'Content-Type: application/json; charset=utf-8',
        headers: {
          token: localStorage.token
        }
      })
      .then(data => {
        resolve(data);
      });
    }, 200);
  });
}
