<template>
  <input class="Searchbar" placeholder="Search for..." />
</template>

<script>
export default {
  name: "Searchbar",
  
};
</script>

<style lang="scss">
.Searchbar {
  box-sizing: border-box;
  width: 80vw;
  height: 40px;

  margin: 0 auto;
  margin-bottom: 20px;
  padding-left: 10px;

  outline: 0;
  border: 0;
  border-bottom: 1px solid $text-color;

  font-size: 1rem;
  color: $accent-color;

  &:active {
    border-bottom: 2px solid $accent-color;
  }
}
</style>
