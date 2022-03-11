<template>
  <v-container class="mt__10">
    <v-row>
      <v-col cols="12" sm="12" md="6" lg="6" xl="6">
        <h1 class="text_uppercase">About Us</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat
          officiis alias non sequi voluptas iure corrupti quasi consectetur,
          sunt eum quo! Quis iusto vitae id itaque delectus possimus
          necessitatibus sit recusandae quas perferendis, nostrum excepturi
          dolore molestiae minus explicabo laborum minima veniam cupiditate
          voluptate, exercitationem vero nisi quae in. Impedit minima dolorem
          dolorum ipsam voluptas quod voluptatibus quia quis! Sapiente enim a
          mollitia eum tenetur, sequi quasi dolorum, perspiciatis cumque, ipsa
          laudantium deserunt beatae ab excepturi. Fuga quibusdam a ipsam sequi,
          quaerat officia dolorem cumque maiores veritatis soluta ab asperiores
          odit voluptate consequuntur doloremque suscipit earum nulla fugit id
          nobis!
        </p>
      </v-col>
      <v-col cols="12" sm="12" md="6" lg="6" xl="6">
        <!-- <v-img src="/assets/img/about.png"> </v-img> -->
        <img class="w__200 " src="~/assets/img/Capture12.PNG" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {};
</script>

<style scoped>
.w__200 {
  width: 600px;
}
.mt__10 {
  margin-top: 60px;
}
.text_uppercase {
  text-transform: uppercase;
  color: gray;
  letter-spacing: 3px;
  font-size: 45px;
  margin-top: 30px;
}
</style>
