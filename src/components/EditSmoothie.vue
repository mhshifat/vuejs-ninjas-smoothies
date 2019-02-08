<template>
  <div v-if="smoothie" class="edit-smoothie container">
    <h2>Edit {{ smoothie.title }} Smoothie</h2>
    <form @submit.prevent="editSmoothie">
      <div class="field edit-ingredient">
        <label for="title">Smoothie Title:</label>
        <input type="text" name="title" v-model="smoothie.title">
      </div>
      <div class="field edit-ingredient" v-for="(ingredient, i) in smoothie.ingredients" :key="i">
        <label for="title">Ingredient:</label>
        <input type="text" name="ingredient" v-model="smoothie.ingredients[i]">
        <i class="material-icons trash-icon" @click="deleteIngredient(ingredient)">delete</i>
      </div>
      <div class="field edit-ingredient">
        <label for="add-ingredient">Add Ingredient:</label>
        <input
          type="text"
          name="add-ingredient"
          v-model="ingredient"
          @keydown.tab.prevent="addIngredient"
        >
      </div>
      <div class="center-align">
        <p class="red-text" v-if="feedback">{{ feedback }}</p>
        <button class="btn pink">Add Smoothie</button>
      </div>
    </form>
  </div>
</template>

<script>
import db from "@/firebase/init";
export default {
  name: "EditSmoothie",
  data() {
    return {
      smoothie: null,
      ingredient: null,
      feedback: null
    };
  },
  async created() {
    const snapshot = await db
      .collection("smoothies")
      .where("slug", "==", this.$route.params.slug)
      .get();
    snapshot.forEach(doc => {
      this.smoothie = doc.data();
      this.smoothie.id = doc.id;
    });
  },
  methods: {
    editSmoothie() {
      if (this.smoothie.title) {
        this.feedback = null;
        db.collection("smoothies")
          .doc(this.smoothie.id)
          .update({
            title: this.smoothie.title,
            slug: this.smoothie.title.replace(" ", "-").toLowerCase(),
            ingredients: this.smoothie.ingredients
          })
          .then(() => {
            this.$router.push("/");
          });
      } else {
        this.feedback = "You must add a title for the ingredients";
      }
    },
    addIngredient() {
      if (this.ingredient) {
        this.smoothie.ingredients.push(this.ingredient);
        this.ingredient = null;
        this.feedback = null;
      } else {
        this.feedback = "You must enter value to add an ingredient";
      }
    },
    deleteIngredient(ingredient) {
      this.smoothie.ingredients = this.smoothie.ingredients.filter(
        ing => ing != ingredient
      );
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.edit-smoothie {
  margin-top: 60px;
  max-width: 500px;
}
.edit-smoothie h2 {
  font-size: 2em;
}
.edit-ingredient {
  margin: 30px 0;
  position: relative;
}
.trash-icon {
  position: absolute;
  top: 35px;
  right: 0;
  color: #aaaaaa;
  font-size: 1.4em;
  cursor: pointer;
}
</style>
