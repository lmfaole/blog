<script>
const { children } = $props();
</script>

<header>
    Ole Jørgen Bakken
</header>
<main>
    {@render children()}
</main>
<footer>
    <p>Du kan følge, stalke eller kontakte meg på
        <a href="https://bsky.app/profile/lmfaole.no" rel="me">Bluesky</a>,
        <a href="https://github.com/lmfaole" rel="me">Github</a> eller
        <a href="https://www.linkedin.com/in/olejorgenbakken/" rel="me">LinkedIn</a>.
    </p>
</footer>

<style>
    header, main, footer {
        max-width: 90ch;
        margin-inline: auto;
    }

    header {
        padding-block: 1lh;
    }
</style>