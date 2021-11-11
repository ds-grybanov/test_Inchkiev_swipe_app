export const PATIENTS_ACTIONS = {
  ADD_SAD: 'addSad',
  ADD_HAPPY: 'addHappy',
  ADD_HEART: 'addHeart',
  RESET_ALL: 'resetAll'
}

export const PATIENTS_GETTERS = {
  ALL_SAD: 'sad',
  ALL_HAPPY: 'happy',
  ALL_HEART: 'heart',
}

const PATIENTS_MUTATIONS = {
  SET_SAD: 'setSad',
  SET_HAPPY: 'setHappy',
  SET_HEART: 'setHeart',
  RESET_ALL: 'resetAll'
}

export default {
  namespaced: true,
  state: {
    sad: 0,
    happy: 0,
    heart: 0
  },
  getters: {
    [PATIENTS_GETTERS.ALL_SAD]: (state) => state.sad,
    [PATIENTS_GETTERS.ALL_HAPPY]: (state) => state.happy,
    [PATIENTS_GETTERS.ALL_HEART]: (state) => state.heart
  },
  mutations: {
    [PATIENTS_MUTATIONS.SET_SAD]: (state) => state.sad++,
    [PATIENTS_MUTATIONS.SET_HAPPY]: (state) => state.happy++,
    [PATIENTS_MUTATIONS.SET_HEART]: (state) => state.heart++,
    [PATIENTS_MUTATIONS.RESET_ALL]: (state) => {
      state.sad = 0;
      state.happy = 0;
      state.heart = 0;
    }
  },
  actions: {
    [PATIENTS_ACTIONS.ADD_SAD]: ({commit}) => commit(PATIENTS_MUTATIONS.SET_SAD),
    [PATIENTS_ACTIONS.ADD_HAPPY]: ({commit}) => commit(PATIENTS_MUTATIONS.SET_HAPPY),
    [PATIENTS_ACTIONS.ADD_HEART]: ({commit}) => commit(PATIENTS_MUTATIONS.SET_HEART),
    [PATIENTS_ACTIONS.RESET_ALL]: ({commit}) => commit(PATIENTS_MUTATIONS.RESET_ALL)
  }
}
