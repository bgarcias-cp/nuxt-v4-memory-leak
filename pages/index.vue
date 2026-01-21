<script setup lang="ts">
    const { data } = await useAsyncData('test', async () => {
        const base = 'https://jsonplaceholder.typicode.com'

        const [
            posts,
            comments,
            albums,
            photos,
            todos,
            users,
        ] = await Promise.all([
            $fetch<[]>(`${base}/posts`),
            $fetch<[]>(`${base}/comments`),
            $fetch<[]>(`${base}/albums`),
            $fetch<[]>(`${base}/photos`),
            $fetch<[]>(`${base}/todos`),
            $fetch<[]>(`${base}/users`),
        ])

        // 🔴 Amplify memory usage intentionally
        // You can increase times to 100 to more clearly see the memory leak increase.
        const amplify = <T>(arr: T[], times = 50): T[] => {
            const result: T[] = []
            for (let i = 0; i < times; i++) {
            // structuredClone guarantees new objects (no shared refs)
                result.push(...structuredClone(arr))
            }
            return result
        }

        return {
            posts: amplify(posts),
            comments: amplify(comments),
            albums: amplify(albums),
            photos: amplify(photos, 20),
            todos: amplify(todos),
            users: amplify(users),
        }
    })
</script>


<template>
    <h1>Hello World</h1>
    <p>{{ data?.albums.length }}</p>
</template>
