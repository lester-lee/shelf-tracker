<template>
  <button class="Delete">✖</button>
</template>

<script>
export default {
  name: "DeleteButton",
};
</script>

<style lang="scss">
.Delete {
  visibility: visible;
  opacity: 0;
  width: 1.4rem;
  height: 1.4rem;

  position: absolute;
  right: 0px;
  transition: all 0.2s ease;
}
.--Edit .Delete {
  visibility: visible;
  opacity: 1;
  right: 45px;
}
</style>
