import { writable, derived, get } from 'svelte/store'

const width = writable(parseInt(localStorage.width) || 300)

const height = writable(parseInt(localStorage.height) || 400)

const fontFace = writable(localStorage.fontFace || 'inherit')

const fontSize = writable(localStorage.fontSize || '80%')

const customStyle = writable(localStorage.customStyle || '')

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

const behaviors = writable(
  JSON.parse(localStorage.behaviors || '{}')
)

export {
  width, height, fontFace, fontSize, customStyle,
  openingDirectory, toggleDirectory, behaviors
}
