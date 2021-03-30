<template>
  <NavAndFooterLayout>
    <div class="Home">
      <header class="one">
        <div class="background">
          <div class="grid">
            <h1>Anime Skip</h1>
            <img src="../../assets/logo.svg" />
            <p>Skip timestamps and watch anime faster than ever before</p>
            <div class="buttons">
              <router-link to="/get-started" class="button primary get-started">
                Get Started
              </router-link>
              <button class="transparent" @click="scrollToLearnMore">Learn More</button>
            </div>
          </div>
        </div>
      </header>
      <img class="section-transition" src="../../assets/dark500_section_bottom.svg" />
      <section class="two">
        <div id="about" class="about">
          <h2>What is Anime Skip?</h2>
          <p>
            Anime Skip is a community managed timestamp database, with a
            <a href="http://test.api.anime-skip.com/graphiql" target="_blank">public API</a>
            for devlopers to use.
          </p>
          <p>
            Anime Skip is integrated with
            <a target="_blank" href="http://tuckerchap.in/BetterVRV/">BetterVRV</a>, another
            timestamp database specifically for VRV, which boasts a library of
            <strong>over 1400 annotated episodes accross 400 series</strong>.
          </p>
        </div>
        <div id="anime-skip-player">
          <h2>Anime Skip Player</h2>
          <p>
            The Anime Skip Player is a web extension that makes watching anime and contributing
            timestamps easy! For
            <router-link to="#supported-services">supported services</router-link>, it replaces the
            video player with it's own, adding playback features that let you
            <strong>passively watch anime up to 25% faster</strong>.
          </p>
          <div class="example">
            <img src="../../assets/death_note_example.jpg" />
            <p class="disabled label">Watching Death Note on VRV using the Anime Skip Player</p>
          </div>
          <div id="benefits">
            <div class="benefit">
              <img class="icon" src="../../assets/ic_home_benefit_autoskip.svg" />
              <h3>Auto-skip Timestamps</h3>
              <p>
                Don't want to watch intros? You don't have to move a finger. Anything you don't want
                to watch is automatically skipped
              </p>
            </div>
            <div class="benefit">
              <img class="icon" src="../../assets/ic_home_benefit_controls.svg" />
              <h3>Advanced Player Controls</h3>
              <p>
                Playback speed up to 4x, advance between timestamps, 4 levels of fast forwards and
                rewinds
              </p>
            </div>
            <div class="benefit">
              <img class="icon" src="../../assets/ic_home_benefit_keyboard_shortcuts.svg" />
              <h3>Custom Keyboard Shortcuts</h3>
              <p>
                Over a dozen customizable keyboard shortcuts for advancing, contributing, and more!
              </p>
            </div>
            <div class="benefit">
              <img class="icon" src="../../assets/ic_home_benefit_stadard_player.svg" />
              <h3>Standardized Video Player</h3>
              <p>
                Regardless of where you're watching anime, you'll get the same, beautiful video
                player with the same, awesome features
              </p>
            </div>
          </div>
        </div>
      </section>
      <img class="section-transition" src="../../assets/dark400_section_top.svg" />
      <section id="supported-services" class="three">
        <h2>Supported Services</h2>
        <ul class="service-list">
          <li class="vrv">VRV</li>
          <li class="funimation">Funimation Now</li>
        </ul>
        <h3>In the Future</h3>
        <ul class="service-list">
          <li class="netflix">NETFLIX</li>
          <li class="crunchyroll">crunchyroll</li>
          <li class="hulu">hulu</li>
          <li class="prime">Amazon Prime Video</li>
        </ul>
        <p class="affiliation label disabled">
          Anime Skip is not affiliated with any of these services
        </p>
      </section>
      <img class="section-transition" src="../../assets/dark400_section_bottom.svg" />
      <section id="recently-added" class="four">
        <h2>Recently Added Epiosdes</h2>
        <RecentEpisodesList class="list" />
        <p class="label">
          BetterVRV episodes do not show up on this list. You can view those
          <a target="_blank" href="http://tuckerchap.in/BetterVRV/">here</a>
        </p>
      </section>
      <img class="section-transition" src="../../assets/dark400_section_top.svg" />
    </div>
  </NavAndFooterLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import RecentEpisodesList from '../../components/RecentEpisodesList.vue';

export default defineComponent({
  components: { RecentEpisodesList },
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
@import '@/scss/theme.scss';
$transitionHeight: 10vw;

.Home {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: -1px;

  p.label {
    font-size: 14px;
  }

  section,
  header {
    box-sizing: border-box;
    width: 100%;
    padding-left: 24px;
    padding-right: 24px;
  }

  .section-transition {
    width: 100%;
    height: $transitionHeight;
  }

  .two,
  .three,
  .four {
    padding-top: 112px;
    padding-bottom: 112px;
  }

  .one {
    height: 100vh;
    background-color: $dark500;
    z-index: 1;

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
      padding: 24px;
      text-align: center;
      gap: 24px;
      grid-gap: 24px;
      justify-items: flex-start;
      margin-bottom: $navBarHeight;

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
        padding: 0 48px;
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
        min-width: 124px;
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

  .two {
    max-width: 900px;
    display: flex;
    flex-direction: column;
    align-items: center;

    h2 {
      text-align: center;
    }

    p {
      margin-top: 16px;
    }

    #about {
      display: flex;
      flex-direction: column;
      align-items: center;
      max-width: 900px;

      h2 {
        margin-bottom: 16px;
      }

      p {
        margin-bottom: 16px;
      }
    }

    #anime-skip-player {
      display: flex;
      flex-direction: column;
      align-items: center;
      max-width: 900px;
      margin-top: 64px;

      .example {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 48px;
        margin-bottom: 16px;
        max-width: 600px;

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
          text-align: center;
        }
      }

      #benefits {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;

        .benefit {
          display: flex;
          flex-direction: column;
          width: 256px;
          padding: 16px;
          margin: 0 auto;
          text-align: center;

          .icon {
            width: 48px;
            height: 48px;
            padding: 16px;
            align-self: center;
          }

          @media only screen and (min-width: $GRID_BREAK_SMALL) {
            padding: 24px;
            padding-bottom: 0px;
            border: none;
            border-radius: 8px;
          }
        }
      }
    }
  }

  .three {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: $dark400;

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
      font-family: $overpassFontFamily;
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
      text-align: center;
      margin-top: 64px;
    }
  }

  .four {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-left: 0px;
    padding-right: 0px;

    h2,
    .label {
      text-align: center;
      padding: 0 24px;
    }

    .list {
      margin: 48px 0;
    }

    .label {
      color: $textDisabledColor;
    }
  }
}
</style>
