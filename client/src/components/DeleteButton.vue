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
  visibility: visible;
  opacity: 0;
  cursor: pointer;
  width: 1.4rem;
  height: 1.4rem;
  border: none;
  background: none;
  position: absolute;
  right: 0px;
  transition: all 0.2s ease;
  color: $--greyDark;
}
.--Edit .Delete {
  visibility: visible;
  opacity: 1;
  right: 45px;
}
</style>