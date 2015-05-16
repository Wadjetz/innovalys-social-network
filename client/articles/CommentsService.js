import Qajax from 'qajax'

const BASE_URL = document.location.origin;

export default {
  getAllBySlug: function (slug) {
    return Qajax({
      url: BASE_URL + '/comments/news/' + slug,
      method: 'GET'
    })
    .then(Qajax.filterSuccess)
    .then(Qajax.toJSON)
  },

  create :function (comment) {
    return Qajax({
      url: BASE_URL + '/comments',
      method: 'POST',
      data: comment
    })
    .then(Qajax.filterSuccess)
    .then(Qajax.toJSON)
  }
};
