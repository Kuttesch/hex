<script lang="ts">
	import {goto} from '@mateothegreat/svelte5-router'
</script>

<h1>404</h1>

<p>Page not found.</p>

<button onclick={() => goto('/')}>
	Go Home
</button>