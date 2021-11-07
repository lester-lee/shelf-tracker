<template>
  <input
    class="SearchbarInput"
    type="search"
    placeholder="Search for..."
    v-model="search"
  />
</template>

<script>
export default {
  name: "Searchbar",
  computed: {
    search: {
      get() {
        return this.$store.state.search;
      },
      set(search) {
        this.$store.commit("updateSearch", search);
      },
    },
  },
};
</script>

<style lang="scss">
.SearchbarInput {
    width: 70%;
    height: 2rem;
    padding-left: 2rem;
    box-shadow: $inner-shadow;

    &::placeholder {
      color: $--greyLight-3;
    }
    &:focus {
      outline: none;
      box-shadow: $shadow;
    }
}
</style>
