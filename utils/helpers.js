module.exports = {
  if_equal: function (a, b, options) {
    if (a === b) {
      return options.fn(this)
    }
  },
  if_idEqual: function (objectId1, objectId2, options) {
    if (objectId1 && objectId2) {
      if (objectId1.toString() === objectId2.toString()) {
        return options.fn(this)
      }
    }
  }
}
