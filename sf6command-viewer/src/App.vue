<template>
  <div id="app" @keydown="handleKeydown" @keyup="handleKeyup" tabindex="0">

    <div class="attack-button-container">
      <img
        v-for="button in attackButtons"
        :key="button.name"
        :src="button.src"
        :alt="`${button.name} attack`"
        :class="{active: currentKey === button.key}"
        :style="{gridArea: button.name}"
      />
    </div>

    <div class="arrow-container">
      <img
        v-for="arrow in arrows"
        :key="arrow.direction"
        :src="arrow.src"
        :alt="`${arrow.direction} Arrow`"
        :class="{active: currentKey === arrow.key}"
        :style="{ gridArea: arrow.direction.toLowerCase()}"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

  export default defineComponent({
    data() {
      return {
        currentKey: '',
        arrows: [
          {direction: 'Up', key: 'i', src: '/img/up-arrow.png'},
          {direction: 'Down', key: 'k', src: '/img/down-arrow.png'},
          {direction: 'Left', key: 'j', src: '/img/left-arrow.png'},
          {direction: 'Right', key: 'l', src: '/img/right-arrow.png'}
        ],
        attackButtons: [
        {name: 'a_small', key: 's', src: '/img/attack-small-button.png'},
        {name: 'a_middle', key: 'd', src: '/img/attack-middle-button.png'},
        {name: 'a_strong', key: 'f', src: '/img/attack-strong-button.png'}
        ]
      }
    },
    methods: {
      handleKeydown(e: KeyboardEvent) {
        const key = e.key;
        if (['j', 'i', 'k', 'l', 's', 'd', 'f'].includes(key)) {
          this.currentKey = key;
        }
      }, 
      handleKeyup() {
        this.currentKey = '';
      }
    }, 
    // mounted() {
    //   (this.$el as HTMLElement).focus();
    // }
  });
</script>

<style>
  #app {
    outline:none;

  }
  img {
    width: 50px;
    opacity: 0.5;
  }
  img.active{
    opacity: 1;
  }
  .arrow-container {
    display: grid;
    grid-template-areas: 
      ". up ."
      "left . right"
      ". down .";
    grid-gap: 10px;
  };
  .attack-buttons-container {
    display: grid;
    grid-template-areas:
      "small . middle . strong"
    ;
    column-gap: 10px;
    
  }
  
</style>
