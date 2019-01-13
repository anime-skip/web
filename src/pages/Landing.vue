<template>
  <div class="landing">
    <section class="section-1 flex-row">
      <div class="content">
        <div class="top flex-row">
          <img class="logo" src="../assets/logo-landing.svg" />
          <div class="right">
            <h1>Anime Skip</h1>
            <p><i>Binge watch faster than ever before</i></p>
          </div>
        </div>
        <div class="buttons">
          <Button class="button--white learn-more" label="Learn More" flat="true" link="#learn-more" />
          <Button class="button--white" label="Get Started" white="true" />
          <Button class="button--white learn-more" label="Sign In" flat="true" link="sign-in" />
        </div>
        <img class="player-preview" src="../assets/img_player.png"/>
      </div>
    </section>
    <section class="section-2" id="learn-more">

    </section>
  </div>
</template>

<script lang="ts">
import { Vue, Component} from 'vue-property-decorator';
import Button from '@/components/Button.vue';

@Component({
  components: {
    Button,
  },
})
export default class Landing extends Vue {

}
</script>

<style lang="scss" scoped>
.landing {
  height: 100%;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  scroll-snap-type: y proximity;
  background-image: url('../assets/bg_stars.svg');
  background-blend-mode: soft-light;
  background-color: $primary500;
  background-size: cover;
  background-position: center;
  section {
    min-height: 100vh;
    box-sizing: border-box;
    scroll-snap-align: start;
  }
  .section-1 {
    height: 100vh;
    display: flex;
    flex-direction: row;
    justify-content: center;
    background: linear-gradient(180deg, transparent, $secondary500);
    .content {
      max-width: 100vw;
      align-self: center;
      justify-self: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      .top {
        justify-self: center;
        margin-bottom: 24px;
        .logo {
          height: 108px;
          margin-right: 24px;
        }
        .right {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          align-self: center;
          padding-bottom: 12px;
          h1 {
            $size: 34px;
            color: white;
            font-size: $size;
            line-height: $size;
            margin-bottom: 12px;
            text-align: start;
          }
          p {
            color: rgba($color: #ffffff, $alpha: 0.7);
            text-align: start;
          }
        }
      }
      .buttons {
        align-self: center;
        display: grid;
        grid-template-columns: repeat(3, auto);
        grid-template-rows: auto;
        grid-column-gap: 24px;
        margin-bottom: 48px;
        .learn-more {
          color: white;
        }
      }
      .player-preview {
        width: 100%;
        box-shadow: $shadow-3;
      }
    }
  }
  .section-2 {
    background-color: #303030;
  }
}
@media only screen and (min-width: 375px) {
  .landing {
    .section-1 {
      .content {
        .player-preview {
          min-width: 375px;
          width: 90vw;
          max-width: 510px;
          border-bottom-left-radius: 8px;
        }
      }
    }
  }
}
@media only screen and (min-width: 426px) {
  .landing {
    .section-1 {
      .content {
        width: 100vw;
        min-width: 425px;
        .top {
          .logo {
            min-height: 108px;
            height: 25vw;
            max-height: 144px;
          }
          .right {
            h1 {
              $size: 8vw;
              font-size: $size;
              line-height: $size;
            }
          }
        }
      }
    }
  }
}
@media only screen and (min-width: 769px) {
  .landing {
    .section-1 {
      .content {
        .top {
          .logo {
            margin-right: 3.125vw;
          }
        }
        .player-preview {
          min-width: 510px;
          width: 66vw;
          max-width: 840px;
        }
      }
    }
  }
}
@media only screen and (min-width: 800px) {
  .landing {
    .section-1 {
      .content {
        .top {
          .right {
            h1 {
              $size: 64px;
              font-size: $size;
              line-height: $size;
            }
          }
        }
      }
    }
  }
}
@media only screen and (min-width: 1408px) {
  .landing {
    .section-1 {
      .content {
        .top {
          .logo {
            margin-right: 44px;
          }
        }
      }
    }
  }
}
</style>
