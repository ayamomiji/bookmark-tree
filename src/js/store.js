import { writable, derived, get } from 'svelte/store'

// appearance
function readWidth () {
  return Math.min(parseInt(localStorage.width) || 300, 800)
}

function readHeight () {
  return Math.min(parseInt(localStorage.height) || 400, 600)
}

const width = writable(readWidth())

const height = writable(readHeight())

const fontFace = writable(localStorage.fontFace || 'inherit')

const fontSize = writable(localStorage.fontSize || '80%')

const customStyle = writable(localStorage.customStyle || '')

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

// shortcuts
if (localStorage.shortcuts) { // for backward compatibility ><
  const legacyShortcuts = JSON.parse(localStorage.shortcuts)
  if (!legacyShortcuts.openBookmarkTreeInNewTab) {
    legacyShortcuts.openBookmarkTreeInNewTab = {}
  }
  if (!legacyShortcuts.openBookmarkTreeInNewWindow) {
    legacyShortcuts.openBookmarkTreeInNewWindow = {}
  }
  localStorage.disableShortcuts = legacyShortcuts.disable
  localStorage.openBookmarkTreeInNewTab =
    JSON.stringify(legacyShortcuts.openBookmarkTreeInNewTab)
  localStorage.openBookmarkTreeInNewWindow =
    JSON.stringify(legacyShortcuts.openBookmarkTreeInNewWindow)
  localStorage.removeItem('shortcuts')
}

function readDisableShortcuts () {
  return localStorage.disableShortcuts == 'true'
}

function readOpenBookmarkTreeInNewTab () {
  return JSON.parse(localStorage.openBookmarkTreeInNewTab ||
                    '{"modifier":"alt","key":"b"}')
}

function readOpenBookmarkTreeInNewWindow () {
  return JSON.parse(localStorage.openBookmarkTreeInNewWindow ||
                    '{"modifier":"alt","key":"w"}')
}

// misc
if (localStorage.rememberOpenedDirectory) { // for backward compatibility ><
  localStorage.rememberOpenedDirectories = localStorage.rememberOpenedDirectory
  localStorage.removeItem('rememberOpenedDirectory')
}
const rememberOpenedDirectories =
  writable(localStorage.rememberOpenedDirectories == 'true')

const moveDirectoriesToListTop =
  writable(localStorage.moveDirectoriesToListTop == 'true')

const rootDirectory =
  writable(localStorage.rootDirectory || '0')

const sortBy = writable(localStorage.sortBy || 'index')

// node state
const openingDirectories = writable(
  get(rememberOpenedDirectories) ?
    JSON.parse(localStorage.openingDirectories ||
               localStorage.openingDirectory || // for backward compatibility ><
               '{}') : {}
)

const openingDirectory = id =>
  derived(openingDirectories, $openingDirectories => $openingDirectories[id])

const toggleDirectory = id => {
  const current = get(openingDirectories)
  openingDirectories.set({ ...current, [id]: !current[id] })
}
openingDirectories.subscribe(value => {
  if (get(rememberOpenedDirectories)) {
    localStorage.openingDirectories = JSON.stringify(value)
  }
})

const hoveringNode = writable()

export {
  readWidth, readHeight,
  width, height, fontFace, fontSize, customStyle,
  bookmarkLeftBehavior, bookmarkMiddleBehavior, bookmarkRightBehavior,
  directoryLeftBehavior, directoryMiddleBehavior, directoryRightBehavior,
  rememberOpenedDirectories, moveDirectoriesToListTop, rootDirectory, sortBy,
  openingDirectory, toggleDirectory, hoveringNode,
}
