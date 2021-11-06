<template>
  <li :class="['Item', { '--Highlight': highlighted }]" v-show="show">
    <span>{{ item.label }}</span>
    <input type="checkbox" v-model="highlighted" />
  </li>
</template>

<script>
export default {
  name: "Item",
  props: ["item"],
  computed: {
    highlighted: {
      get() {
        const highlighted = this.$props.item.highlighted;
        return Boolean(highlighted);
      },
      set(highlight) {
        let item = this.$props.item;
        item.itemId = item.item_id;
        item.highlighted = highlight;
        this.$ShelfService.updateItem(this.$store, { item });
      },
    },
    show() {
      const label = this.$props.item.label.toLowerCase();
      const search = this.$store.state.search.toLowerCase();
      return label.includes(search);
    },
  },
};
</script>

<style lang="scss">
.Item {
  &:not(:last-child) {
    border-bottom: 1px solid #aaa;
  }
  padding: 0 20px;
  min-height: 40px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  &.--Highlight {
    background-color: #ffe70c88;
  }
}
</style>
