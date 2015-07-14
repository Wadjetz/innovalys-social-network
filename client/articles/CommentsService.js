import Qajax from 'qajax';
import { BASE_URL } from '../conf';

class CommentsService {
  constructor(url) {
    this.url = url;
  }

  create(comment) {
    return Qajax({
      url: `${this.url}/comments`,
      method: 'POST',
      data: comment
    })
    .then(Qajax.filterSuccess)
    .then(Qajax.toJSON);
  }

  update(id, comment) {
    return Qajax({
      url: `${this.url}/comments/${id}`,
      method: 'PUT',
      data: comment
    })
    .then(Qajax.filterSuccess)
    .then(Qajax.toJSON);
  }

  delete(id) {
    return Qajax({
      url: `${this.url}/comments/${id}`,
      method: 'DELETE'
    })
    .then(Qajax.filterSuccess)
    .then(Qajax.toJSON);
  }

  getAllBySlug(slug) {
    return Qajax({
      url: `${this.url}/comments/news/${slug}`,
      method: 'GET'
    })
    .then(Qajax.filterSuccess)
    .then(Qajax.toJSON);
  }
}

export default new CommentsService(BASE_URL);
