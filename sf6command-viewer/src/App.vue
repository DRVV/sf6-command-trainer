<template>
  <div id="app" @keydown="handleKeydown" @keyup="handleKeyup" tabindex="0">

    <div class="attack-buttonscontainer">
      <img
        v-for="button in attackButtons"
        :key="button.name"
        :src="button.src"
        :alt="`${button.name} attack`"
        :class="{active: keysPressed[button.key]}"
        :style="{gridArea: button.name.toLowerCase()}"
      />
    </div>

    <div class="arrow-container">
      <img
        v-for="arrow in arrows"
        :key="arrow.direction"
        :src="arrow.src"
        :alt="`${arrow.direction} Arrow`"
        :class="{active: keysPressed[arrow.key]}"
        :style="{ gridArea: arrow.direction.toLowerCase()}"
      />
    </div>

    <div class="drive-button-container">
      <img 
        v-for="button in driveButtons"
        :key="button.name"
        :src="button.src"
        :alt="`${button.name}`"
        :class="{active: keysPressed[button.key]}"
        :style="{gridArea: button.name}"
      />
    </div>    
  </div>

  <CommandList class="command"/>

  
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CommandList from './components/CommandList.vue';


  export default defineComponent({
    data() {
      return {
        keysPressed:{} as Record<string, boolean>,
        arrows: [
          {direction: 'Up', key: 'i', src: '/img/up-arrow.png'},
          {direction: 'Down', key: 'k', src: '/img/down-arrow.png'},
          {direction: 'Left', key: 'j', src: '/img/left-arrow.png'},
          {direction: 'Right', key: 'l', src: '/img/right-arrow.png'}
        ],
        attackButtons: [
        {name: 'small', key: 's', src: '/img/attack-small-button.png'},
        {name: 'middle', key: 'd', src: '/img/attack-middle-button.png'},
        {name: 'strong', key: 'f', src: '/img/attack-strong-button.png'}
        ],
        driveButtons: [
          {name: 'parry', key: ' ', src: '/img/drive-parry.png'}
        ]
      }
    },
    methods: {
      handleKeydown(e: KeyboardEvent) {
        const key = e.key;
        if (['j', 'i', 'k', 'l', 's', 'd', 'f', ' '].includes(key)) {
          this.keysPressed[e.key] = true;
        }
      }, 
      handleKeyup(e: KeyboardEvent) {
        this.keysPressed[e.key] = false;
      }
    },
    components:{
      CommandList
    } 
    // mounted() {
    //   (this.$el as HTMLElement).focus();
    // }
  });
</script>

<style>
  #app {
    outline:none;
    display: grid;
    grid-template-areas: 
      "arrow-container attack-buttonscontainer"
    ;
    grid-gap: 10px;

  }
  img {
    width: 50px;
    opacity: 0.2;
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
  }
  .attack-buttonscontainer {
    display: grid;
    grid-template-areas:
      ". . ."
      "small middle strong"
      ". . ."
    ;
    grid-gap: 10px;
  }  
</style>
