<template>
  <li class="Shelf">
    <h3 class="ShelfLabel">{{ shelf.label }}</h3>
    <ul class="ShelfList">
      <Item v-for="item in items" :key="item.item_id" :item="item" />
      <li class="Item" v-on:keypress.enter="onSubmitNewItem">
        <input class="NewItem" placeholder="New Item" v-model="newItem" />
      </li>
    </ul>
  </li>
</template>

<script>
import ShelfService from "@/services/ShelfService";
import Item from "./Item";

export default {
  name: "Shelf",
  props: ["shelf"],
  components: { Item },
  computed: {
    items() {
      const shelfId = this.$props.shelf.shelf_id;
      return this.$store.state.items[shelfId];
    },
    newItem: {
      get() {
        const shelfId = this.$props.shelf.shelf_id;
        return this.$store.state.newItems[shelfId];
      },
      set(newItem) {
        this.$store.commit("updateNewItem", {
          shelfId: this.$props.shelf.shelf_id,
          newItem,
        });
      },
    },
  },
  methods: {
    onSubmitNewItem(event) {
      const shelfId = this.$props.shelf.shelf_id;
      ShelfService.addItem(this.$store, { shelfId });
    },
  },
};
</script>

<style lang="scss">
.Shelf {
  border-bottom: 1px solid #333;
  padding: 0;
  margin: 0;
  &Label {
    border-bottom: 1px solid #333;
    background: #888;
    color: #fff;
  }
}
</style>
