<script lang="ts">
	import {
		Router,
		StatusCode,
		type RouteResult,
	} from '@mateothegreat/svelte5-router'

	import routes from './router/routes'
	import NotFound from './pages/NotFound.svelte'
</script>

<Router
	{routes}
	statuses={{
		[StatusCode.NotFound]: (_: RouteResult) => ({
			component: NotFound,
		}),
	}}
/>