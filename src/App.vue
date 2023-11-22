<template>
  <main>
    <router-view></router-view>
  </main>
</template>
<script setup>
      import { onMounted, onBeforeUnmount } from 'vue';
    const preventContextMenu = (e) => {
      e.preventDefault();
    };
    window.addEventListener('contextmenu', preventContextMenu);

    const preventDevToolsShortcuts = (e) => {
      if (
        (e.ctrlKey && e.shiftKey && e.keyCode === 73) || // Ctrl+Shift+I
        (e.ctrlKey && e.shiftKey && e.keyCode === 74) || // Ctrl+Shift+J
        e.keyCode === 123
      ) {
        // F12
        e.preventDefault();
      }
    };
    window.addEventListener('keydown', preventDevToolsShortcuts);

    onBeforeUnmount(() => {
      // Cleanup: remove event listeners when the component is unmounted
      window.removeEventListener('contextmenu', preventContextMenu);
      window.removeEventListener('keydown', preventDevToolsShortcuts);
    });

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
