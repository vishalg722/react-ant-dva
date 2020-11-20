import request from '../../utils/request'
const apiUrl = 'https://jsonplaceholder.typicode.com/posts';

export function fetch({ page }) {
  return request(`${apiUrl}`);
}

export function remove(id) {
  return request(`${apiUrl}/${id}`, {
    method: 'DELETE',
  });
}

export function patch(id, values) {
  return request(`${apiUrl}/${id}`, {
    method: 'PATCH',
    body: values
  });
}

export function create(values) {
  return request(`${apiUrl}`, {
    method: 'POST',
    body: JSON.stringify(values),
  });
}

export function getById(id) {
  return request(`${apiUrl}/${id}`, {
    method: 'GET',
  });
}
