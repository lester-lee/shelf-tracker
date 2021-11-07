<template>
  <footer class="Searchbar">
    <input
      class="SearchbarInput"
      placeholder="Search for..."
      v-model="search"
    />
  </footer>
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
.Searchbar {
  width: 100%;
  height: 50px;

  position: fixed;
  bottom: 0;

  display: flex;
  justify-content: center;
  align-items: center;

  background: $--greyLight-1;

  &Input {
    width: 70%;
    height: 2rem;
    border: none;
    border-radius: 0.5rem;
    padding-left: 2rem;

    background: none;
    box-shadow: $inner-shadow;

    font-size: 1rem;
    color: $--greyDark;

    &::placeholder {
      color: $--greyLight-3;
    }
    &:focus {
      outline: none;
      box-shadow: $shadow;
    }
  }
}
</style>
