import {goto} from '@mateothegreat/svelte5-router'

export const routing = {
	home() {
		return goto('/')
	},

	about() {
		return goto('/about')
	},
}