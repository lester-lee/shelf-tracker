<template>
  <li
    :class="['Item', { '--Highlight': highlighted }, { '--Active': active }]"
    v-show="show"
  >
    <div class="ItemCheck">
      <input
        :id="'check' + item.item_id"
        type="checkbox"
        v-model="highlighted"
      />
      <label :for="'check' + item.item_id"></label>
    </div>
    <div class="ItemLabel" @click="toggleActive">{{ item.label }}</div>
    <DeleteButton @click="deleteItem" />
  </li>
</template>

<script>
import DeleteButton from "./DeleteButton";
export default {
  name: "Item",
  props: ["item"],
  components: { DeleteButton },
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
  padding: 0 15px;
  min-height: 2rem;

  display: flex;
  justify-content: space-between;
  align-items: center;

  &.--Highlight {
    background: $--primary-light;
    background: #8abdff66;
  }

  &Label {
    flex-grow: 1;
    margin: 0 10px;
  }

  &Check {
    input {
      display: none;
    }

    & input:checked {
      & ~ label {
        box-shadow: inset 0.2rem 0.2rem 0.5rem #6d5dfc88,
          inset -0.2rem -0.2rem 0.5rem #8abdff66;
        color: $--primary;
      }
    }

    label {
      cursor: pointer;
      border-radius: 0.5rem;
      box-shadow: $shadow;
      width: 1.3rem;
      height: 1.3rem;
      display: flex;
      justify-content: center;
      align-items: center;
      color: $--greyDark;
      &:hover {
        color: $--primary;
      }
    }
  }

  &Add {
    padding-left: 46px;
    display: none;
    align-items: center;
    input {
      width: 92%;
    }
  }

  .--Edit &Add {
    display: flex;
  }
}
</style>
