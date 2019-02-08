import Vue from "vue";
import Router from "vue-router";
import Homepage from "@/components/Homepage";
import AddSmoothie from "@/components/AddSmoothie";
import EditSmoothie from "@/components/EditSmoothie";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "Homepage",
      component: Homepage
    },
    {
      path: "/add-smoothie",
      name: "AddSmoothie",
      component: AddSmoothie
    },
    {
      path: "/edit-smoothie/:slug",
      name: "EditSmoothie",
      component: EditSmoothie
    }
  ]
});
