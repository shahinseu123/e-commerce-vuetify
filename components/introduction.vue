<template>
  <div id="intro">
    <h1 class="my__heading white--text text-h4 pt-10">SHOP NOW</h1>
    <h2 class="white--text text-h3 discount">15% Discount</h2>
    <p class="pera">On order value of 300 and above</p>
    <p class="pera">
      * This discount is only valid online and on selected items only.
    </p>
    <div class="promodiv">
      <p class="promocode">PROMO CODE 2323</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Introduction"
};
</script>

<style scoped>
#intro {
  height: 320px;
  width: 100%;
  background: teal;
}
.promodiv {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}
.promocode {
  padding: 10px 20px;
  background: white;
  color: teal;
  text-align: center;
  width: 200px;
}
.pera {
  margin: 0;
  text-align: center;
  color: white;
}
.discount {
  text-align: center;
  font-weight: 300;
  text-shadow: 4px 4px gray;
  margin-top: 30px;
  margin-bottom: 20px;
}
.my__heading {
  display: flex;
  width: 100%;
  align-items: center;
}
.my__heading::before,
.my__heading::after {
  content: "";

  background: white;
  height: 1px;
  margin: 20px;
  flex: 1;
}
</style>
