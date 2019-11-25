import { writable, derived, get } from 'svelte/store'

const width = writable(parseInt(localStorage.width) || 300)

const height = writable(parseInt(localStorage.height) || 400)

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

export { width, height, openingDirectory, toggleDirectory, behaviors }
