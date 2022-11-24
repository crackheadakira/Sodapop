<script setup>

</script>

<template>
    <div>
        <h2>Settings</h2>
        <ul>
            <li>General</li>
            <li>Music</li>
        </ul>
    </div>
</template>

<style scoped>
body div {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 150px;
    height: 100%;
    background-color: #171717;
    border-right: 1px solid #272727;
}

ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
}

li {
    font-size: 1.2rem;
    font-weight: 500;
    padding-left: 15px;
    margin-top: 10px;
    cursor: pointer;
}

li:hover {
    filter: brightness(85%);
}
</style>