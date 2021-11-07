<template>
  <li
    :class="['Item', { '--Highlight': highlighted }, { '--Active': active }]"
    v-show="show"
  >
    <input class="ItemCheck" type="checkbox" v-model="highlighted" />
    <div class="ItemLabel" v-on:click="toggleActive">{{ item.label }}</div>
    <button class="ItemDelete" v-on:click="deleteItem">✖</button>
  </li>
</template>

<script>
export default {
  name: "Item",
  props: ["item"],
  data() {
    return {
      active: false,
    };
  },
  computed: {
    highlighted: {
      get() {
        const highlighted = this.$props.item.highlighted;
        return Boolean(highlighted);
      },
      set(highlight) {
        // Send API request to update highlighted status of this item
        let item = this.$props.item;
        item.itemId = item.item_id;
        item.highlighted = highlight;
        this.$ShelfService.updateItem(this.$store, { item });
      },
    },
    show() {
      // Used to filter items by what is typed in searchbar
      const label = this.$props.item.label.toLowerCase();
      const search = this.$store.state.search.toLowerCase();
      return label.includes(search);
    },
  },
  methods: {
    toggleActive() {
      this.active = !this.active;
    },
    deleteItem() {
      const itemId = this.$props.item.item_id;
      const shelfId = this.$props.item.shelf_id;
      this.$ShelfService.deleteItem(this.$store, { itemId, shelfId });
    },
  },
};
</script>

<style lang="scss">
.Item {
  &:not(:last-child) {
    border-bottom: 1px solid #aaa;
  }
  padding: 0 15px;
  min-height: 40px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  &Label {
    flex-grow: 1;
    margin: 0 10px;
  }

  &Check {
    width: 20px;
    height: 20px;
    border-radius: 50%;
  }

  &.--Highlight {
    background-color: #ffe70c88;
  }

  &Delete {
    display: none;
    color: red;
    cursor: pointer;
    width: 30px;
    height: 30px;
  }

  &.--Active &Delete {
    display: block;
  }
}
</style>
