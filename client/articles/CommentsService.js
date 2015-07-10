import Qajax from 'qajax'

const BASE_URL = document.location.origin;

class CommentsService {
  constructor(base_url) {
    this.base_url = base_url;
  }

  create(comment) {
    return Qajax({
      url: `${this.base_url}/comments`,
      method: 'POST',
      data: comment
    })
    .then(Qajax.filterSuccess)
    .then(Qajax.toJSON);
  }

  update(comment) {
    return Qajax({
      url: `${this.base_url}/comments`,
      method: 'PUT',
      data: comment
    })
    .then(Qajax.filterSuccess)
    .then(Qajax.toJSON);
  }

  delete(id) {
    return Qajax({
      url: `${this.base_url}/comments/${id}`,
      method: 'DELETE'
    })
    .then(Qajax.filterSuccess)
    .then(Qajax.toJSON);
  }

  getAllBySlug(slug) {
    return Qajax({
      url: `${this.base_url}/comments/news/${slug}`,
      method: 'GET'
    })
    .then(Qajax.filterSuccess)
    .then(Qajax.toJSON);
  }
}

export default new CommentsService(BASE_URL);
