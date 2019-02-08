<template>
  <div class="add-smoothie container">
    <h2 class="center-align indigo-text">Add New Smoothie Recipe</h2>
    <form @submit.prevent="addSmoothie">
      <div class="field add-ingredient">
        <label for="title">Smoothie Title:</label>
        <input type="text" name="title" v-model="title">
      </div>
      <div class="field add-ingredient" v-for="(ingredient, i) in ingredients" :key="i">
        <label for="title">Ingredient:</label>
        <input type="text" name="ingredient" v-model="ingredients[i]">
        <i class="material-icons trash-icon" @click="deleteIngredient(ingredient)">delete</i>
      </div>
      <div class="field add-ingredient">
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
  name: "AddSmoothie",
  data() {
    return {
      title: null,
      ingredients: [],
      ingredient: null,
      feedback: null
    };
  },
  methods: {
    addSmoothie() {
      if (this.title) {
        this.feedback = null;
        db.collection("smoothies")
          .add({
            title: this.title,
            slug: this.title.replace(" ", "-").toLowerCase(),
            ingredients: this.ingredients
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
        this.ingredients.push(this.ingredient);
        this.ingredient = null;
        this.feedback = null;
      } else {
        this.feedback = "You must enter value to add an ingredient";
      }
    },
    deleteIngredient(ingredient) {
      this.ingredients = this.ingredients.filter(ing => ing != ingredient);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.add-smoothie {
  margin-top: 60px;
  max-width: 500px;
}
.add-smoothie h2 {
  font-size: 2em;
}
.add-ingredient {
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
