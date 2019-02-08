<template>
  <div class="home container">
    <div class="card" v-for="smoothie in smoothies" :key="smoothie.id">
      <div class="card-coontent">
        <i class="material-icons delete-icon" @click="deleteSmoothie(smoothie.id)">delete</i>
        <h2 class="indigo-text">{{ smoothie.title }}</h2>
        <ul class="ingredients">
          <li v-for="(ingredient, i) in smoothie.ingredients" :key="i">
            <span class="chip">{{ ingredient }}</span>
          </li>
        </ul>
      </div>
      <a href class="btn-floating btn-large halfway-fab pink">
        <router-link :to="{ name: 'EditSmoothie', params: { slug: smoothie.slug } }">
          <i class="material-icons">edit</i>
        </router-link>
      </a>
    </div>
  </div>
</template>

<script>
import db from "@/firebase/init";
export default {
  name: "Homepage",
  data() {
    return {
      smoothies: []
    };
  },
  methods: {
    deleteSmoothie(id) {
      db.collection("smoothies")
        .doc(id)
        .delete()
        .then(() => {
          this.smoothies = this.smoothies.filter(smoothie => smoothie.id != id);
        });
    }
  },
  async created() {
    const snapshot = await db.collection("smoothies").get();
    snapshot.forEach(doc => {
      const smoothie = doc.data();
      smoothie.id = doc.id;
      this.smoothies.push(smoothie);
    });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.home {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 30px;
  margin-top: 60px;
}
.home h2 {
  font-size: 1.6em;
  text-align: center;
}
.ingredients {
  padding: 30px;
  display: flex;
  justify-content: center;
}
.ingredients li {
  display: inline-block;
}
.delete-icon {
  position: absolute;
  top: 4px;
  right: 4px;
  cursor: pointer;
  color: #aaa;
  font-size: 1.4em;
}
</style>
