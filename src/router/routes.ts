import type {RouteConfig} from '@mateothegreat/svelte5-router'

import Home from '../pages/Home.svelte'
import About from '../pages/About.svelte'
import NotFound from '../pages/NotFound.svelte'

const routes: RouteConfig[] = [
	{
		path: '/',
		component: Home,
	},
	{
		path: '/about',
		component: About,
	},
]

export default routes