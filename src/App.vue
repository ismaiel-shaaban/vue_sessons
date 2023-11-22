<template>
  <main>
    <router-view></router-view>
  </main>
</template>
<script setup>

</script>
<style lang="scss">
* {
  box-sizing: border-box;
}

:root {
  --bg-color: #EEF5F9;
  --white-color: #ffff;
  --offwhite-color: #e0e0e0;
}

body {}

a {
  text-decoration: none;
  color: black;
}

input,
select,
textarea,
button {
  background: none;
  outline: none !important;
  border: none;
}

.opacity-hover {
  transition: 0.2s;

  &:hover {
    opacity: 0.7;
  }
}

.ProseMirror {
  min-height: 150px;
  outline: none;
}

.date-input {
  width: 200px !important;
}


</style>