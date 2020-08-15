<template>
  <div class="Home">
    <header class="one">
      <div class="background">
        <div class="grid">
          <h1>Anime Skip</h1>
          <img src="../../assets/logo.svg" />
          <p>Skip timestamps and watch anime faster than ever before</p>
          <div class="buttons">
            <router-link to="/get-started" class="button primary get-started"
              >Get Started</router-link
            >
            <button to="#learn-more" class="transparent" @click="scrollToLearnMore">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </header>
    <section class="two" id="learn-more">
      <div class="title">
        <h2>What is Anime Skip?</h2>
        <p>
          Anime Skip is a community managed, timestamp database and custom video player. It uses a
          web extension to replace the video player of supported services with it’s own.
        </p>
      </div>
      <div class="example">
        <img src="../../assets/death_note_example.jpg" />
        <p class="disabled label">Death Note on VRV</p>
      </div>
      <div class="first benefit">
        <h3>Automaticaly Skip Timestamps</h3>
        <p>
          You can choose all the stuff you don’t want to watch in your account setttings. This
          ranges from intros or credits to commercial transitions and recap
        </p>
      </div>
      <div class="benefit">
        <h3>Advanced Player Controls</h3>
        <p>
          Watch episdes at speeds up to x4 and skip betweeen timestamps manually
        </p>
        <p>
          We’re always looking for your feedback when developing new features!
        </p>
      </div>
      <div class="benefit">
        <h3>Useful Keyboard Shortcuts</h3>
        <p>
          The player comes setup with 12 keyboard shortcuts that are fully customizable, and make
          the player worth, even when there are not timestamps available for an episode.
        </p>
      </div>
      <div class="benefit">
        <h3>Standardized Video Player</h3>
        <p>
          With Anime Skip, you get a standardized, beautiful video player that is the same between
          all services
        </p>
      </div>
    </section>
    <section class="three" id="supported-services">
      <h2>Supported Services</h2>
      <ul class="service-list">
        <li class="vrv">VRV</li>
      </ul>
      <h3>Coming Soon</h3>
      <ul class="service-list">
        <li class="funimation">Funimation Now</li>
        <li class="netflix">NETFLIX</li>
        <li class="crunchyroll">crunchyroll</li>
        <li class="hulu">hulu</li>
        <li class="prime">Amazon Prime Video</li>
      </ul>
      <p class="affiliation label disabled">
        Anime Skip is not affiliated with any of these services
      </p>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {
    const scrollToLearnMore = () => {
      document.querySelector('section.two')?.scrollIntoView({ behavior: 'smooth' });
    };
    return {
      scrollToLearnMore,
    };
  },
});
</script>

<style lang="scss" scoped>
$GRID_BREAK_SMALL: 720px;
$GRID_BREAK_LARGE: 1440px;

.Home {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;

  p.label {
    font-size: 14px;
  }

  section,
  header {
    box-sizing: border-box;
    width: 100%;
  }

  .one {
    height: 100vh;
    background-color: $dark500;
    z-index: 10;

    .background {
      height: 100%;
      background: url(../../assets/home_stars.svg);
      background-size: cover;
      background-position: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }

    .grid {
      display: grid;
      grid-template-columns: auto;
      grid-template-rows: repeat(4, auto);
      grid-template-areas: 'title' 'logo' 'subtitle' 'buttons';
      padding: 0 48px;
      text-align: center;
      gap: 24px;
      grid-gap: 24px;
      justify-items: flex-start;

      @media only screen and (min-width: $GRID_BREAK_SMALL) {
        margin-right: 0;
        width: 600px;
        grid-template-columns: repeat(2, auto);
        grid-template-rows: repeat(3, auto);
        grid-template-areas: 'logo title' 'logo subtitle' 'logo buttons';
        gap: 0;
        grid-gap: 0;
        column-gap: 24px;
        grid-column-gap: 24px;
        text-align: unset;
      }

      h1 {
        font-size: 48px;
        justify-self: center;
        grid-area: title;

        @media only screen and (min-width: $GRID_BREAK_SMALL) {
          justify-self: flex-start;
          font-size: 64px;
        }
      }

      img {
        width: 30%;
        min-width: 172px;
        justify-self: center;
        grid-area: logo;

        @media only screen and (min-width: $GRID_BREAK_SMALL) {
          width: 196px;
          justify-self: flex-start;
          align-self: center;
        }
      }

      p {
        justify-self: center;
        grid-area: subtitle;

        @media only screen and (min-width: $GRID_BREAK_SMALL) {
          margin-top: -8px;
          width: 300px;
          justify-self: flex-start;
          font-size: 15.5px;
          margin-bottom: 24px;
        }
      }

      .buttons {
        justify-self: center;
        grid-area: buttons;
        @media only screen and (min-width: $GRID_BREAK_SMALL) {
          justify-self: flex-start;
          margin-right: 24px;
        }
      }

      .get-started {
        margin-right: 24px;
      }
    }
  }

  .two,
  .three {
    padding: 128px 24px;
  }

  .two {
    max-width: 600px;
    display: grid;
    grid-template-columns: auto;
    grid-template-rows: repeat(6, auto);
    grid-template-areas: 'title' 'image' 'benefit' 'benefit' 'benefit' 'benefit';
    gap: 24px;
    grid-gap: 24px;
    padding-bottom: 0px;

    @media only screen and (min-width: $GRID_BREAK_SMALL) {
      max-width: $GRID_BREAK_SMALL;
      grid-template-columns: 1fr 1fr;
      grid-template-rows: repeat(4, auto);
      grid-template-areas: 'title title' 'image image' 'benefit benefit' 'benefit benefit';
    }

    @media only screen and (min-width: $GRID_BREAK_LARGE) {
      max-width: $GRID_BREAK_LARGE;
      grid-template-columns: 2fr 1fr 1fr;
      grid-template-rows: repeat(3, auto);
      grid-template-areas: 'image title title' 'image benefit benefit' 'image benefit benefit';
    }

    p {
      margin-top: 16px;
    }

    .title {
      grid-area: title;
    }

    .example {
      display: flex;
      flex-direction: column;
      align-items: center;
      grid-area: image;
      margin-bottom: 16px;
      margin-top: 24px;

      @media only screen and (min-width: $GRID_BREAK_LARGE) {
        align-self: center;
        margin: 0;
        padding-right: 24px;
      }

      img {
        width: 100%;
        border-radius: 4px;
        filter: drop-shadow(0px 6px 12px rgba(0, 0, 0, 0.36));

        @media only screen and (min-width: $GRID_BREAK_SMALL) {
          border-radius: 8px;
        }
      }

      .label {
        margin-top: 16px;
      }
    }

    .benefit {
      padding-bottom: 24px;
      border-bottom: 1px solid rgba($color: white, $alpha: 0.12);
      &.first {
        @media only screen and (max-width: $GRID_BREAK_SMALL) {
          padding-top: 24px;
          border-top: 1px solid rgba($color: white, $alpha: 0.12);
        }
      }

      @media only screen and (min-width: $GRID_BREAK_SMALL) {
        padding: 24px;
        padding-bottom: 0px;
        border: none;
        border-radius: 8px;
      }
    }
  }

  .three {
    display: flex;
    flex-direction: column;
    align-items: center;

    h2,
    h3 {
      margin-bottom: 48px;
    }

    h3 {
      margin-top: 64px;
    }

    ul.service-list {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
      gap: 24px;
      grid-gap: 24px;
      max-width: 1016px;
    }

    li {
      box-sizing: border-box;
      display: inline-block;
      list-style: none;
      width: 320px;
      height: 72px;
      padding-top: 2px;

      background-color: $dark500;
      border-radius: 4px;
      filter: drop-shadow(0px 6px 12px rgba(0, 0, 0, 0.36));

      line-height: 72px;
      font-family: 'Overpass', sans-serif;
      text-align: center;
      font-size: 28px;
      font-weight: 800;

      &.vrv {
        background-color: #ffdd00;
        color: #000000;
      }
      &.funimation {
        background-color: #4d02a3;
        color: #f9f9f9;
      }
      &.netflix {
        background-color: #000000;
        color: #e30d1a;
      }
      &.crunchyroll {
        background-color: #f37521;
        color: #ffffff;
      }
      &.hulu {
        background-color: #000000;
        color: #1ce783;
      }
      &.prime {
        background-color: #181f27;
        color: #3daae0;
      }
    }

    .affiliation {
      margin-top: 64px;
    }
  }
}
</style>
