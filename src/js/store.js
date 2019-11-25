import { writable, derived, get } from 'svelte/store'

const width = writable(parseInt(localStorage.width) || 300)
width.subscribe(value => { localStorage.width = value })

const height = writable(parseInt(localStorage.height) || 400)
height.subscribe(value => { localStorage.height = value })

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

export { width, height, openingDirectory, toggleDirectory }
