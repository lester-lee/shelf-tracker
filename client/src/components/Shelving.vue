<template>
  <li class="Shelving">
    <h2 class="ShelvingLabel">
      <div class="ShelvingLabelText">{{ shelving.label }}</div>
      <DeleteButton @click="deleteShelving" />
    </h2>
    <ol class="ShelvingList">
      <Shelf v-for="shelf in shelves" :key="shelf.shelf_id" :shelf="shelf" />
      <li class="ShelfAdd">
        <h2 class="ShelfLabel">
          <input
            type="text"
            placeholder="+ Add Shelf"
            v-model="newShelf"
            @keypress.enter="onSubmitNewShelf"
          />
        </h2>
      </li>
    </ol>
  </li>
</template>

<script>
import Shelf from "./Shelf";
import DeleteButton from "./DeleteButton";

export default {
  name: "Shelving",
  props: ["shelving"],
  components: { Shelf, DeleteButton },
  data() {
    return {
      newShelf: "",
    };
  },
  computed: {
    shelves() {
      const shelvingId = this.$props.shelving.shelving_id;
      return this.$store.state.shelves[shelvingId];
    },
  },
  methods: {
    onSubmitNewShelf() {
      if (!this.newShelf) {
        console.info("New shelf cannot be blank.");
        return;
      }
      const shelvingId = this.$props.shelving.shelving_id;
      this.$ShelfService.addShelf(this.$store, {
        label: this.newShelf,
        shelvingId,
      });
      this.newShelf = "";
    },
    deleteShelving() {
      const shelvingId = this.$props.shelving.shelving_id;
      this.$ShelfService.deleteShelving(this.$store, { shelvingId });
    },
  },
};
</script>

<style lang="scss">
.Shelving {
  width: 80vw; // Change later
  max-width: 350px;

  margin: 25px auto;

  border-radius: 15px;
  box-shadow: $shadow;

  &Label {
    //border-bottom: 1px solid $--greyDark;
    color: $--primary-dark;
    text-transform: uppercase;

    display: flex;
    justify-content: center;
    align-items: center;

    height: 3rem;
    overflow: hidden;

    &Text {
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  &Add {
    display: none;
  }

  .--Edit &Add {
    display: block;
  }
}
</style>
