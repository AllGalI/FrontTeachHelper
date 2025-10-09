<script setup>
import { useUserStore } from '../../stores/store_user.js'

const store = useUserStore()
const a = 'teacher'

</script>

<template>
	<h1>{{ a }}</h1>
	<h2>{{ store.user}}</h2>
	<p>{{ store.token}}</p>
</template>