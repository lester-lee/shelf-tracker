<template>
  <button class="Delete">✖</button>
</template>

<script>
export default {
  name: "DeleteButton"
}
</script>

<style lang="scss">
.Delete {
  visibility: hidden;
  opacity: 0;
  cursor: pointer;
  width: 1.4rem;
  height: 1.4rem;
  border: none;
  background: none;
  position: relative;
  right: -30px;
  transition: all 0.2s ease;
}
.--Active > .Delete {
  visibility: visible;
  opacity: 1;
  right: 0;
}
</style>