import $ from 'jquery';

export default function fetch(url, data = {}) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      $.ajax({
        url,
        data,
        method: 'POST',
        dataType: 'json',
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
