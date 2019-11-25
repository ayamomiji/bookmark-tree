import { writable, derived, get } from 'svelte/store'

// appearance
const width = writable(parseInt(localStorage.width) || 300)

const height = writable(parseInt(localStorage.height) || 400)

const fontFace = writable(localStorage.fontFace || 'inherit')

const fontSize = writable(localStorage.fontSize || '80%')

const customStyle = writable(localStorage.customStyle || '')

// node state
const openingDirectories = writable(
  JSON.parse(localStorage.openingDirectories ||
             localStorage.openingDirectory || // for backward compatibility ><
             '{}')
)
openingDirectories.subscribe(value => {
  localStorage.openingDirectories = JSON.stringify(value)
})

const openingDirectory = id =>
  derived(openingDirectories, $openingDirectories => $openingDirectories[id])

const toggleDirectory = id => {
  const current = get(openingDirectories)
  openingDirectories.set({ ...current, [id]: !current[id] })
}

const hoveringNode = writable()

// behaviors
if (localStorage.behaviors) { // for backward compatibility ><
  const legacyBehaviors = JSON.parse(localStorage.behaviors)
  if (!legacyBehaviors.bookmark) {
    legacyBehaviors.bookmark = {}
  }
  if (!legacyBehaviors.directory) {
    legacyBehaviors.directory = {}
  }
  localStorage.bookmarkLeftBehavior = legacyBehaviors.bookmark.left
  localStorage.bookmarkMiddleBehavior = legacyBehaviors.bookmark.middle
  localStorage.bookmarkRightBehavior = legacyBehaviors.bookmark.right
  localStorage.directoryLeftBehavior = legacyBehaviors.directory.left
  localStorage.directoryMiddleBehavior = legacyBehaviors.directory.middle
  localStorage.directoryRightBehavior = legacyBehaviors.directory.right
  localStorage.removeItem('behaviors')
}

const bookmarkLeftBehavior =
  writable(localStorage.bookmarkLeftBehavior || 'openInNewTab')
const bookmarkMiddleBehavior =
  writable(localStorage.bookmarkMiddleBehavior || 'openInCurrentTab')
const bookmarkRightBehavior =
  writable(localStorage.bookmarkRightBehavior || 'openInBackgroundTab')
const directoryLeftBehavior =
  writable(localStorage.directoryLeftBehavior || 'toggle')
const directoryMiddleBehavior =
  writable(localStorage.directoryMiddleBehavior || 'openAllInCurrentWindow')
const directoryRightBehavior =
  writable(localStorage.directoryRightBehavior || 'openAllInNewWindow')

export {
  width, height, fontFace, fontSize, customStyle,
  openingDirectory, toggleDirectory, hoveringNode,
  bookmarkLeftBehavior, bookmarkMiddleBehavior, bookmarkRightBehavior,
  directoryLeftBehavior, directoryMiddleBehavior, directoryRightBehavior
}
