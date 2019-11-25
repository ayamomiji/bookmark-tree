import { writable } from 'svelte/store'

const width = writable(parseInt(localStorage.width) || 300)
width.subscribe(value => { localStorage.width = value })

const height = writable(parseInt(localStorage.height) || 400)
height.subscribe(value => { localStorage.height = value })

export { width, height }
