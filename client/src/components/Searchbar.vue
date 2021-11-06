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

  background: #333;

  display: flex;
  align-items: center;

  &Input {
    width: 70%;
    height: 30px;

    outline: 0;
    border: 0;
    border-bottom: 1px solid #333;
    margin-left: 10%;
    padding-left: 20px;

    font-size: 1rem;
    color: #fff;

    background: #555;
    border-radius: 5px;
  }
}
</style>
