export function setSearchHistory() {
  let history = window.localStorage.__history__
  if (!history) {
    history = []
  } else {
    history = JSON.parse(history)
  }
}
