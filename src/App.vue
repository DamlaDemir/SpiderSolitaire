<template>
  <div id="app">
    <router-view :key="$route.fullPath" />
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
:root {
  --solitaire-red: #874444;
  --solitaire-dark-blue: #576472;
  --solitaire-blue: #48697c;
  --solitaire-light-blue: rgb(94, 131, 155);
  --solitaire-very-light-blue: #7b9caf;
  --solitaire-light-white: rgba(238, 238, 238, 0.4);
  --solitaire-pink: #ff4848;
  --solitaire-purple: #480032;
  --solitaire-yellow: #fdca40;
}

@font-face {
  font-family: "LilitaOne-Regular";
  src: url("../src/assets/fonts/LilitaOne-Regular.ttf");
  font-display: swap;
}

* {
  box-sizing: border-box;
  font-family: "LilitaOne-Regular", Helvetica, Arial, Sans-Serif;
}

html {
  background-image: linear-gradient(
    var(--solitaire-light-white),
    var(--solitaire-very-light-blue),
    var(--solitaire-light-white)
  );
  background-attachment: fixed;
  overflow-x: hidden;
  letter-spacing: 0.1vw;
}

ul {
  padding: 0;
}
</style>
