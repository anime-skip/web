<template>
  <header class="bg-control text-center md:text-left">
    <div id="stars" class="h-full flex items-center justify-center pb-16">
      <div class="grid justify-items-center md:justify-items-start">
        <h1 class="text-5xl md:text-6xl font-bold md:-mb-4">Anime Skip</h1>
        <img id="logo" class="md:mr-4" src="../../assets/logo.svg" />
        <h6 id="subtitle" class="justify-self-center mt-2 opacity-medium px-8 md:px-0 font-normal">
          Skip timestamps and watch anime faster than ever before
        </h6>
        <div class="flex md:flex-row-reverse">
          <flat-button transparent @click="$emit('scrollTo', '#about')"> Learn More </flat-button>
          <div class="w-4" />
          <raised-button @click="onClickGetStarted">Get Started</raised-button>
        </div>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { FlatButton, RaisedButton } from '@anime-skip/ui';
import { useRouter } from 'vue-router';

export default defineComponent({
  components: { FlatButton, RaisedButton },
  emits: {
    scrollTo: (id: string) => true,
  },
  setup() {
    const router = useRouter();
    const onClickGetStarted = () => {
      router.push('/get-started');
    };

    return {
      onClickGetStarted,
    };
  },
});
</script>

<style scoped>
header {
  height: calc(100vh - 4rem); /* total height - nav bar height */
}

#stars {
  background: url(../../assets/home_stars.svg);
  background-size: cover;
  background-position: center;
}

.grid {
  display: grid;
  grid-template-columns: auto;
  grid-template-rows: repeat(4, auto);
  grid-template-areas: 'title' 'logo' 'subtitle' 'buttons';
  grid-gap: 1.5rem;
  gap: 1.5rem;
}
h1 {
  grid-area: title;
}
#logo {
  width: 30%;
  min-width: 156px;
  grid-area: logo;
}
#subtitle {
  max-width: 512px;
  grid-area: subtitle;
}
.buttons {
  grid-area: buttons;
}

@media only screen and (min-width: theme('screens.md')) {
  .grid {
    width: 600px;
    grid-template-columns: repeat(2, auto);
    grid-template-rows: repeat(3, auto);
    grid-template-areas: 'logo title' 'logo subtitle' 'logo buttons';
  }

  h1 {
    justify-self: flex-start;
    font-size: 64px;
  }
  #logo {
    width: 192px;
    align-self: center;
  }
}
</style>
