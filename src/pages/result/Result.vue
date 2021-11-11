<template>
  <div class="result">
    <div class="result__inner">
      <div class="result__circle-img">
        <img
          src="~@/assets/img/result/image_result.jpg"
          alt=""
          class="circle__img"
        />
      </div>
      <div @click="goToHome" class="result__icon-home">
        <img
          class="icon-home__img"
          src="~@/assets/img/result/icon_home-white.png"
          alt="home"
        />
      </div>
      <div class="result__content">
        <div class="result__content-box">
          <div class="result__view">
            <div class="result__view-item">
              <span class="view__item-res">{{ percentResult(allSad) }}%</span>
              <span class="view__item-drug">Препарат 1</span>
            </div>
            <div class="result__view-item">
              <span class="view__item-res">{{ percentResult(allHappy) }}%</span>
              <span class="view__item-drug">Препарат 2</span>
            </div>
            <div class="result__view-item">
              <span class="view__item-res">{{ percentResult(allHeart) }}%</span>
              <span class="view__item-drug">Препарат 3</span>
            </div>
          </div>
          <hr />
          <div class="result__text">
            <p class="result__text-1">Ваш результат:</p>
            <p class="result__text-2">«Что я здесь делаю?»</p>
            <p class="result__text-3">
              Это тестовое задание, так что не будем углубляться в глубины
              проблем фармацевтов.
            </p>
          </div>
        </div>
      </div>
    </div>
    <button @click="goToMain" class="result-btn">Попробовать еще</button>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { PATIENTS } from "../../constants";
import { PATIENTS_GETTERS } from "../../store/modules/patients";

export default {
  PATIENTS,
  computed: {
    ...mapGetters("patients", {
      allSad: PATIENTS_GETTERS.ALL_SAD,
      allHappy: PATIENTS_GETTERS.ALL_HAPPY,
      allHeart: PATIENTS_GETTERS.ALL_HEART,
    }),
  },

  methods: {
    goToMain() {
      this.$router.push("/main");
    },
    goToHome() {
      this.$router.push("/");
    },
    percentResult(value) {
      return (value / this.$options.PATIENTS.length) * 100;
    },
  },
};
</script>

<style>
@import url("https://fonts.cdnfonts.com/css/avenir-next-cyr");
@import url("https://fonts.cdnfonts.com/css/montserrat");


.result__inner {
  display: flex;
  flex-direction: column;
  color: #424242;
}

.result {
  position: relative;
  overflow: hidden;
  height: 100vh;
  color: #424242;
}

.result__circle-img {
  position: absolute;
  right: -150px;
  top: -100px;
  width: 820px;
  height: 820px;
}

.result__circle-img::before {
  content: "";
  position: absolute;
  right: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(63.53deg, #2d8550 16.62%, #5e6ec2 83.38%);
  z-index: 1;
  border-radius: 50%;
  opacity: 0.25;
}

.result__circle-img img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  position: relative;
  box-shadow: 0px 0px 160px #c4c4c4;
}

.result__icon-home {
  width: 70px;
  height: 70px;
  background: linear-gradient(63.53deg, #2d8550 16.62%, #5e6ec2 83.38%);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 70px auto 120px 50px;
  cursor: pointer;
}

.result__content {
  max-width: 580px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-left: 130px;
}

.result__view {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 50px;
}

.result__view-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 180px;
  text-align: center;
}

.view__item-res {
  font-size: 48px;
  line-height: 59px;
  height: 70px;
}

.view__item-drug {
  font-size: 16px;
  line-height: 20px;
  font-weight: bold;
  height: 40px;
}

.result__text {
  margin-top: 40px;
}

.result__text-1 {
  font-size: 40px;
  line-height: 44px;
  letter-spacing: 0.02em;
  color: #8e9ad5;
  font-weight: 600;
}
.result__text-2 {
  font-family: "Avenir Next Cyr Heavy", sans-serif;
  font-size: 40px;
  line-height: 44px;
  letter-spacing: 0.02em;
  color: #8e9ad5;
  margin-bottom: 20px;
}
.result__text-3 {
  font-size: 24px;
  line-height: 29px;
}

.result-btn {
  position: absolute;
  left: 130px;
  bottom: 64px;
  padding: 30px 60px;
  border-radius: 100px;
  border: none;
  font-size: 28px;
  line-height: 34px;
  color: #ffffff;
  background: linear-gradient(90deg, #d9d9d9 0%, #a1a1a1 100%);
  cursor: pointer;
}

@media (max-width: 1024px) {
  .result__circle-img {
    width: 500px;
    height: 500px;
  }
  .result__content {
    max-width: 450px;
  }
  .result__view {
    margin-bottom: 10px;
  }
  .result__icon-home {
    margin-bottom: 40px;
  }
  .result-btn {
    padding: 20px 40px;
  }
}

@media (max-width: 768px) {
  .result__icon-home {
    margin-bottom: 240px;
  }
  .result__content {
    margin-left: 60px;
  }
}
</style>