<template>
  <transition name="background">
   <div @click.stop="toggleModal" class="modal__background">
     <v-preloader :opacity="true" v-if="getLoading"/>
     <div @click.stop class="modal__block">
      <button @click="toggleModal" class="modal__close">&#215;</button>
      <h1 class="modal__title">{{ title }}</h1>
      <slot></slot>
    </div>
  </div>
  </transition>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  props: {
    title: String
  },
  computed: {
    ...mapGetters({getLoading: "getLoading"})
  },
  methods: {
    ...mapActions({toggleModal: "toggleModal"})
  }
}
</script>

<style scoped lang="scss">
.background-enter-active, .background-leave-active {
  transition: opacity .5s;
}
.background-enter, .background-leave-to {
  opacity: 0;
}
.modal__background {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: 0;
  top: 0;
  min-width: 100%;
  min-height: 100%;
  background-color: rgba(83, 83, 86, 0.3);
  z-index: 9999;
  .modal__block {
    position: relative;
    margin: 10px;
    padding: 25px 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 85vw;
    min-height: 80vh;
    border-radius: 20px;
    background-color: white;
    scroll-behavior: auto;
    .modal__close {
      position: absolute;
      font-size: 18px;
      right: 10px;
      top: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #e82323;
      color: white;
      border-radius: 20px;
      width: 24px;
      height: 24px;
    }
    .modal__title {
      font-size: 24px;
      font-weight: 600;
      margin-bottom: 20px;
    }
    .modal__slot {
      display: flex;
    }
  }
}
</style>