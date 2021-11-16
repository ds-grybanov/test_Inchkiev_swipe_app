<template>
  <div class="wrapper">
    <div class="main__sidebar">
      <div class="sidebar__top">
        <div @click="goToHome" class="sidebar__top-icon">
          <img
            class="icon-img"
            src="~@/assets/img/main/icon_home.svg"
            alt="home"
          />
          <a href="" class="top-icon__link"></a>
        </div>
        <div @click="resetCounter" class="sidebar__top-icon">
          <img
            class="icon-img"
            src="~@/assets/img/main/icon_restart.png"
            alt="restart"
          />
        </div>
      </div>
      <div class="sidebar__center">
        <p class="sidebar__center-text">Параметри:</p>
        <div class="sidebar__center-counters">
          <div class="sidebar__counter-item">
            <img
              class="counter__item-icon"
              src="~@/assets/img/main/icon_smile-sad.png"
              alt="sad_smile"
            />
            <span class="counter__iten-count">{{ allSad }}</span>
          </div>
          <div class="sidebar__counter-item">
            <img
              class="counter__item-icon"
              src="~@/assets/img/main/icon_smile-happy.png"
              alt="sad_smile"
            />
            <span class="counter__iten-count">{{ allHappy }}</span>
          </div>
          <div class="sidebar__counter-item">
            <img
              class="counter__item-icon"
              src="~@/assets/img/main/heart_icon.png"
              alt="sad_smile"
            />
            <span class="counter__iten-count">{{ allHeart }}</span>
          </div>
        </div>
      </div>
      <div class="sidebar__bottom">
        <div class="sidebar__bottom-main-count">
          <p class="sidebar__bottom-text">Осталось в очереди:</p>
          <span class="sidebar__bottom-number"
            >{{ cards.length - index }}<span>/{{ cards.length }}</span></span
          >
        </div>
      </div>
    </div>
    <div class="main__swipe-board">
      <div class="swipe__board-inner" v-if="current">
        <Vue2InteractDraggable
          v-if="isVisible"
          :interact-out-of-sight-x-coordinate="900"
          :interact-out-of-sight-y-coordinate="700"
          :interact-max-rotation="10"
          :interact-x-threshold="100"
          :interact-y-threshold="100"
          interact-block-drag-down
          interact-lock-swipe-down
          :interact-event-bus-events="interactEventBus"
          @draggedRight="emitAndNext('right')"
          @draggedLeft="emitAndNext('left')"
          @draggedUp="emitAndNext('up')"
        >
          <div class="swipe-board__card">
            <div
              v-show="isShowLabel"
              class="label__card"
              :style="{ color: label.color, transform: label.transform }"
            >
              <span>{{ label.text }}</span>
            </div>
            <div class="card__item-img">
              <img
                :src="require(`../../assets/img/main/cards/${current.photo}`)"
                alt="card"
                class="card__img"
              />
            </div>
            <div class="card__item-content">
              <p class="item__content-title">
                {{ current.name }}, {{ current.age }} років
              </p>
              <p class="item__content-text">
                {{ current.description }}
              </p>
            </div>
          </div>
        </Vue2InteractDraggable>
        <div class="swipe__board-inner" v-if="next" style="display: none">
          <div class="swipe-board__card">
            <div class="card__item-img">
              <img
                :src="require(`../../assets/img/main/cards/${next.photo}`)"
                alt="card"
                class="card__img"
              />
            </div>
            <div class="card__item-content">
              <p class="item__content-title">
                {{ next.name }}, {{ next.age }} років
              </p>
              <p class="item__content-text">
                {{ next.description }}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="swipe-board__buttons">
        <button
        @click="left"
        :disabled="disabledBtn"
        class="main-btn bg-1">Препарат 1</button>
        <button @click="up" 
        :disabled="disabledBtn"
        class="main-btn bg-2">Препарат 2</button>
        <button @click="right" 
        :disabled="disabledBtn"
        class="main-btn bg-3">Препарат 3</button>
      </div>
    </div>
  </div>
</template>


<script>
import { mapGetters, mapActions } from "vuex";
import { Vue2InteractDraggable, InteractEventBus } from "vue2-interact";
import { PATIENTS } from "../../constants";
import {
  PATIENTS_GETTERS,
  PATIENTS_ACTIONS,
} from "../../store/modules/patients";
const EVENTS = {
  RIGHT: "right",
  UP: "up",
  LEFT: "left",
};

export default {
  components: { Vue2InteractDraggable },
  PATIENTS,
  data() {
    return {
      isVisible: true,
      index: 0,
      interactEventBus: {
        draggedRight: EVENTS.RIGHT,
        draggedLeft: EVENTS.LEFT,
        draggedUp: EVENTS.UP,
      },
      cards: PATIENTS,
      isShowLabel: false,
      disabledBtn: false,
      label: {
        color: "white",
        text: "Препарат 1",
        transform: "rotate(10deg)",
      },
    };
  },
  computed: {
    ...mapGetters("patients", {
      allSad: PATIENTS_GETTERS.ALL_SAD,
      allHappy: PATIENTS_GETTERS.ALL_HAPPY,
      allHeart: PATIENTS_GETTERS.ALL_HEART,
    }),
    current() {
      return this.cards[this.index];
    },
    next() {
      return this.cards[this.index + 1];
    },
  },
  mounted() {
    this.resetCounter();
  },
  watch: {
    index(value) {
      if (value === this.cards.length) {
        this.$router.push("/result");
      }
    },
  },

  methods: {
    ...mapActions("patients", {
      addSad: PATIENTS_ACTIONS.ADD_SAD,
      addHappy: PATIENTS_ACTIONS.ADD_HAPPY,
      addHeart: PATIENTS_ACTIONS.ADD_HEART,
      resetAll: PATIENTS_ACTIONS.RESET_ALL,
    }),
    showLabel(position) {
      switch (position) {
        case EVENTS.RIGHT:
          this.label.color = "#FFCA01";
          this.label.text = "Препарат 1";
          this.label.transform = "rotate(20deg)";
          break;
        case EVENTS.LEFT:
          this.label.color = "#8049C7";
          this.label.text = "Препарат 2";
          this.label.transform = "rotate(-20deg)";
          break;
        default:
          this.label.color = "#169AE4";
          this.label.text = "Препарат 3";
          this.label.transform = "rotate(-20deg)";
      }
    },
    goToHome() {
      this.$router.push("/");
    },
    resetCounter() {
      this.resetAll();
      this.index = 0;
    },
    right() {
      InteractEventBus.$emit(EVENTS.RIGHT);
    },
    left() {
      console.log(this.index)
      InteractEventBus.$emit(EVENTS.LEFT);
    },
    up() {
      InteractEventBus.$emit(EVENTS.UP);
    },
    emitAndNext(event) {
      this.isShowLabel = true;
      this.disabledBtn = true;
      this.$emit(event, this.index);
      switch (event) {
        case EVENTS.RIGHT:
          this.addHeart();
          this.showLabel(EVENTS.RIGHT);
          break;
        case EVENTS.LEFT:
          this.addSad();
          this.showLabel(EVENTS.LEFT);
          break;
        default:
          this.addHappy();
          this.showLabel(EVENTS.UP);
      }

      setTimeout(() => (this.isVisible = false), 400);
      setTimeout(() => {
        this.index++;
        this.isVisible = true;
        this.isShowLabel = false;
        this.disabledBtn = false;
      }, 400);
    },
  },
};
</script>

<style>
@import url("https://fonts.cdnfonts.com/css/avenir-next-cyr");
@import url("https://fonts.cdnfonts.com/css/montserrat");

.wrapper {
  display: flex;
}

.main__sidebar {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 33%;
  height: 100vh;
  background: linear-gradient(63.53deg, #2d8550 16.62%, #5e6ec2 83.38%);
  position: relative;
  z-index: 2;
  color: #ffffff;
}

.sidebar__top {
  display: flex;
  padding-left: 30px;
  padding-top: 70px;
  align-items: center;
}

.sidebar__top-icon {
  width: 70px;
  height: 70px;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 20px;
  border-radius: 50%;
  cursor: pointer;
  overflow: hidden;
}

.vue-interact-animated {
  transition: transform 1.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) 0s !important;
}

.sidebar__center {
  margin-left: 40px;
}

.sidebar__center-text {
  font-family: "Avenir Next Cyr Medium", sans-serif;
  font-size: 36px;
  line-height: 44px;
  font-weight: 600;
  color: #ffffff;
}

.sidebar__center-counters {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.sidebar__counter-item {
  background-color: #ffffff;
  border-radius: 100px;
  width: 190px;
  height: 80px;
  margin: 30px 10px 0 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  box-shadow: 0px 0px 50px rgba(131, 42, 64, 0.4);
}

.sidebar__counter-item span {
  font-weight: bold;
  color: #424242;
  font-size: 48px;
  line-height: 59px;
  width: 100px;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.sidebar__bottom-main-count {
  text-align: center;
}

.sidebar__bottom-text {
  font-family: "Avenir Next Cyr Light", sans-serif;
  font-size: 45px;
  line-height: 53px;
  letter-spacing: 0.02em;
  color: #ffffff;
}

.sidebar__bottom {
  position: relative;
  padding: 25px 0;
}

.sidebar__bottom::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #ffffff;
  opacity: 0.15;
}

.sidebar__bottom-number {
  font-size: 45px;
  line-height: 53px;
  letter-spacing: 0.02em;
  font-weight: 600;
  color: #ffffff;
}

.sidebar__bottom-number span {
  font-weight: 500;
  color: #ffffff;
}

.main__swipe-board {
  width: 67%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  overflow: hidden;
}

.swipe__board-inner {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 3%;
}

.swipe-board__card {
  max-height: 590px;
  max-width: 540px;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  cursor: grabbing;
}

.label__card {
  position: absolute;
  z-index: 99;
  top: 45%;
  left: 20%;
  width: 350px;
  height: 120px;
  border: 7px solid;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.label__card span {
  font-family: 'Avenir Next Cyr', sans-serif;
  font-size: 52px;
  line-height: 51px;
  font-weight: bold;
}

.card__item-content {
  background: #ffffff;
  padding: 25px 60px;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
}

.card__item-img {
  position: relative;
}

.card__item-img::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(63.53deg, #2d8550 16.62%, #5e6ec2 83.38%);
  opacity: 0.2;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
}

.card__item-img img {
  display: block;
  width: 100%;
  height: 100%;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
}

.item__content-title {
  font-size: 32px;
  line-height: 39px;
  color: #5e6ec2;
  font-weight: bold;
}

.item__content-text {
  font-size: 23px;
  line-height: 28px;
  color: #424242;
  font-family: "Avenir Next Cyr Light", sans-serif;
  letter-spacing: 0.02em;
  margin-top: 5px;
}

.swipe-board__buttons {
  margin-bottom: 3%;
}

.main-btn {
  padding: 30px 60px;
  margin: 0 10px;
  border-radius: 100px;
  border: none;
  font-size: 28px;
  line-height: 34px;
  color: #ffffff;
  font-weight: 700;
  cursor: pointer;
}

.bg-1 {
  background: linear-gradient(266.19deg, #8049c7 0%, #ca57fd 100%);
}

.bg-2 {
  background: linear-gradient(266.19deg, #169ae4 0%, #0cc4fa 100%);
}

.bg-3 {
  background: linear-gradient(
    90deg,
    #ffd748 0.02%,
    rgba(195, 199, 11, 0.96) 99.97%,
    #cac6ab 99.98%,
    #d3e9e1 99.99%
  );
}

@media (max-width: 1367px) {
  .swipe__board-inner {
    margin-top: 6%;
  }
  .main-btn {
    padding: 30px 50px;
  }
  .swipe-board__buttons {
    margin-bottom: 15%;
  }
}

@media (max-width: 1024px) {
  .swipe__board-inner {
    margin-top: 10%;
  }
  .swipe-board__card {
    max-height: 500px;
    max-width: 400px;
  }
  .card__item-content {
    padding: 10px 30px 30px;
  }
  .main-btn {
    padding: 17px 29px;
    margin: 0 5px;
  }
  .swipe-board__buttons {
    margin-bottom: 10%;
  }
  .card__item-img::after {
    bottom: -70px;
    left: 13px;
  }
}

@media (max-width: 768px) {
  .sidebar__center {
    margin-left: 20px;
  }
  .sidebar__top {
    padding-left: 20px;
  }
  .swipe__board-inner {
    margin-top: 30%;
  }
  .main-btn {
    padding: 10px 20px;
    font-size: 21px;
  }
  .swipe-board__buttons {
    margin-bottom: 25%;
  }
}

</style>