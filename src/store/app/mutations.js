export function SET_POSTER (state, poster) {
  state.posters.push({ ...poster, id: state.posters.length + 1 })
}

export function UPDATE_POSTER (state, payload) {
  const poster = state.posters.find((item) => item.id === payload.id)
  Object.assign(poster, payload)
}

export function REMOVE_POSTER (state, id) {
  const index = state.posters.findIndex((item) => item.id === id)
  state.posters.splice(index, 1)
}

export function SET_ALBUM (state, album) {
  state.albums.push({ ...album, id: state.albums.length + 1 })
}

export function UPDATE_ALBUM (state, payload) {
  const album = state.albums.find((item) => item.id === payload.id)
  Object.assign(album, payload)
}

export function REMOVE_ALBUM (state, id) {
  const albumIndex = state.albums.findIndex((item) => item.id === id)
  state.albums.splice(albumIndex, 1)

  const posters = state.posters.filter((p) => p.album_id === id)

  posters.forEach((item) => {
    const posterIndex = state.posters.findIndex((p) => p.id === item.id)
    state.posters.splice(posterIndex, 1)
  })
}

export function REMOVE_IMAGE (state, id) {
  const index = state.images.findIndex((item) => item.id === id)
  state.images.splice(index, 1)
}
