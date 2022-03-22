<template>
  <div>
    <h1>Cart</h1>
    <div v-for="c of cart" :key="c.id">
      <p>{{ c.name }}</p>
      <img :src="c.imageUrl" />
      <br />
      <input
        style="width: 15px"
        type="text"
        name=""
        id="newqua"
        :value="c.quantity"
      />
      <button
        style="background-color: #4caf50; padding: 10px 15px; margin-left: 30px"
        @click="updateQuantity(c)"
      >
        update</button
      ><br /><br />
      <button @click="removeFromCart(c.id)">remove from cart</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Cart",
  data() {
    return {
      cart: [],
    };
  },
  methods: {
    removeFromCart(itemId) {
      
      const index = this.cart.findIndex(({ id }) => id === itemId);
      this.cart.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(this.cart));
    },
    getCart() {
      if (!localStorage.getItem("cart")) {
        localStorage.setItem("cart", JSON.stringify([]));
      }
      this.cart = this.groupItem(JSON.parse(localStorage.getItem("cart")));
    },
    getLengthOfItem() {
      if (!localStorage.getItem("cart")) {
        localStorage.setItem("cart", JSON.stringify([]));
      }
      var allitem = JSON.parse(localStorage.getItem("cart"));
      return allitem.length;
    },
    groupItem(alldata) {
      var frouts = [];
      var result = [];
      alldata.forEach((item) => {
        if (!frouts.includes(item.name)) {
          frouts.push(item.name);
          var froutModel = {
            id: item.id,
            name: item.name,
            imageUrl: item.imageUrl,
            quantity: 1,
          };
          result.push(froutModel);
        } else {
          var getIndex = result.findIndex((f) => {
            return f.name == item.name;
          });
          result[getIndex].quantity = result[getIndex].quantity + 1;
        }
      });
      return result;
    },
    updateQuantity(item) {
      var getIndex = this.cart.findIndex((f) => {
        return f.name == item.name;
      });
      var newQuantity = document.getElementById("newqua").value;
      this.cart[getIndex].quantity = newQuantity;
      var forsaveinStore = this.forSetInLocalStore(this.cart)
      localStorage.setItem("cart", JSON.stringify(forsaveinStore));
    },
    forSetInLocalStore(item) {
      var returnmodel = [];
      item.forEach((i) => {
        for (var round = 0; round < i.quantity; round++) {
          var itemmodel = {
            id: i.id,
            name: i.name,
            imageUrl: i.imageUrl,
          };
          returnmodel.push(itemmodel);
        }
      });
      return returnmodel;
    },
  },
  mounted() {
    this.getCart();
  },
};
</script>

<style>
</style>