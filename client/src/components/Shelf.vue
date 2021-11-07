<template>
  <li class="Shelf">
    <h3
      :class="['ShelfLabel', { '--Active': active }]"
      v-on:click="toggleActive"
    >
      <span>{{ shelf.label }}</span>
      <DeleteButton @click="deleteShelf" />
    </h3>
    <ul class="ShelfList">
      <Item v-for="item in items" :key="item.item_id" :item="item" />
      <li class="Item">
        <input
          class="ItemAdd"
          placeholder="+ Add Item"
          v-model="newItem"
          v-on:keypress.enter="onSubmitNewItem"
        />
      </li>
    </ul>
  </li>
</template>

<script>
import DeleteButton from "./DeleteButton";
import Item from "./Item";

export default {
  name: "Shelf",
  props: ["shelf"],
  components: { Item, DeleteButton },
  data() {
    return {
      newItem: "",
      active: false,
    };
  },
  computed: {
    items() {
      const shelfId = this.$props.shelf.shelf_id;
      return this.$store.state.items[shelfId];
    },
  },
  methods: {
    onSubmitNewItem() {
      // Prevent from submitting if new item is blank
      if (!this.newItem) {
        console.info("New item cannot be blank.");
        return;
      }
      // Add item and reset to blank
      const shelfId = this.$props.shelf.shelf_id;
      this.$ShelfService.addItem(this.$store, { label: this.newItem, shelfId });
      this.newItem = "";
    },
    deleteShelf() {
      const shelfId = this.$props.shelf.shelf_id;
      this.$ShelfService.deleteShelf(this.$store, { shelfId });
    },
    toggleActive() {
      this.active = !this.active;
    },
  },
};
</script>

<style lang="scss">
.Shelf {
  border-radius: 15px;

  &Label {
    color: $--primary;
    text-transform: capitalize;

    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: text-align 1s;

    padding: 0 15px;
    padding-left: 40px;
    min-height: 2rem;
  }
}
</style>
