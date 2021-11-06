<template>
  <li :class="['Item', { '--Highlight': item.highlighted }]" v-show="show">
    {{ item.name }}
  </li>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Item",
  props: ["item"],
  computed: {
    show() {
      const name = this.$props.item.name.toLowerCase();
      const search = this.$store.state.search.toLowerCase();
      return name.includes(search);
    },
  },
};
</script>

<style lang="scss">
.Item {
  &:not(:last-child) {
    border-bottom: 1px solid #aaa;
  }
  padding: 2px;
  padding-left: 20px;
  min-height: 40px;
  display: flex;
  align-items: center;

  &.--Highlight {
    background-color: #ffe70c88;
  }
}
</style>
