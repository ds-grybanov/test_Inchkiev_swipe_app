<template>
  <div class="home">
    <div class="home__content">
      <div class="home__content-box">
        <p class="home__content-text">Добро пожаловать в игру</p>
        <h1 class="home__content-title-1">Помоги</h1>
        <h1 class="home__content-title-2">Фармацевту</h1>
      </div>
      <button @click="goToMain" class="btn btn-home">Начать</button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    goToMain() {
      this.$router.push("/main");
    },
  },
};
</script>

<style>
@import url("https://fonts.cdnfonts.com/css/avenir-next-cyr");
@import url("https://fonts.cdnfonts.com/css/montserrat");



.home {
  height: 100vh;
  width: 100vw;
  background-image: url("~@/assets/img/home/main_bg.jpg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
  overflow: hidden;
    color: #ffffff;
}

.home::before {
  content: "";
  position: absolute;
  width: 100vw;
  height: 100vh;
  background: linear-gradient(63.53deg, #2d8550 16.62%, #5e6ec2 83.38%);
  opacity: 0.35;
}

.home__background img {
  max-width: 100%;
  max-height: 100%;
}

.home__content {
  width: 860px;
  height: 860px;
  position: absolute;
  top: -30px;
  left: 110px;
  background: linear-gradient(63.53deg, #2d8550 16.62%, #5e6ec2 83.38%);
  z-index: 3;
  border-radius: 50%;
}

.home__content-box {
  margin-top: 250px;
  margin-left: 181px;
}

.home__content-text {
  font-family: "Avenir Next Cyr Light", sans-serif;
  font-size: 35px;
  line-height: 41px;
  letter-spacing: 0.02em;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}

.home__content-title-1 {
  font-family: "Avenir Next Cyr Medium", sans-serif;
  margin-top: 29px;
  font-size: 60px;
  line-height: 66px;
  letter-spacing: 0.02em;
}

.home__content-title-2 {
  font-family: "Avenir Next Cyr Medium", sans-serif;
  text-transform: uppercase;
  font-size: 60px;
  line-height: 66px;
  letter-spacing: 0.02em;
  margin-bottom: 120px;
}

.btn-home {
  font-family: "Montserrat", sans-serif;
  font-weight: 700;
  color: #8e9ad5;
  display: block;
  margin: 0 auto;
  width: 380px;
  height: 90px;
  border-radius: 100px;
  border: none;
  font-size: 36px;
  line-height: 44px;
  cursor: pointer;
}

@media (max-width: 1024px) {
  .home__content {
    width: 750px;
    height: 750px;
    left: 80px;
  }
}

@media (max-width: 768px) {
  .home__content {
    width: 601px;
    height: 601px;
    left: 30px;
  }
  .home__content-box {
    margin-top: 120px;
    margin-left: 80px;
  }
}
</style>