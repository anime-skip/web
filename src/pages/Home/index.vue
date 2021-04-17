<template>
  <NavAndFooterLayout>
    <div class="">
      <hero @scrollTo="scrollTo" />
      <img class="section-transition" src="../../assets/home-section-bottom.svg" />
      <about />
      <img class="section-transition" src="../../assets/home-section-top.svg" />
      <supported-services />
      <img class="section-transition" src="../../assets/home-section-bottom.svg" />
      <recently-added />
      <img class="section-transition" src="../../assets/home-section-top.svg" />
    </div>
  </NavAndFooterLayout>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import About from './About.vue';
import Hero from './Hero.vue';
import RecentlyAdded from './RecentlyAdded.vue';
import SupportedServices from './SupportedServices.vue';

export default defineComponent({
  components: {
    Hero,
    About,
    SupportedServices,
    RecentlyAdded,
  },
  setup() {
    const scrollTo = (selector: string) => {
      setTimeout(() => {
        document.querySelector(selector)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 10);
    };

    const route = useRoute();
    onMounted(() => {
      if (!route.hash) return;
      scrollTo(route.hash);
    });

    return {
      scrollTo,
    };
  },
});
</script>

<style scoped>
.section-transition {
  @apply w-full h-28;
}

/*$transitionHeight: 10vw;


// .Home {
//   position: relative;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   margin-bottom: -1px;

//   p.label {
//     font-size: 14px;
//   }

//   section,
//   header {
//     box-sizing: border-box;
//     width: 100%;
//     padding-left: 24px;
//     padding-right: 24px;
//   }

//   .two {
//     max-width: 900px;
//     display: flex;
//     flex-direction: column;
//     align-items: center;

//     h2 {
//       text-align: center;
//     }

//     p {
//       margin-top: 16px;
//     }

//     #about {
//       display: flex;
//       flex-direction: column;
//
//   position: relative;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   margin-bottom: -1px;

//   p.label {
//     font-size: 14px;
//   }

//   .three {
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     // background-color: $dark400;

//     h2,
//     h3 {
//       margin-bottom: 48px;
//     }

//     h3 {
//       margin-top: 64px;
//     }

//     ul.service-list {
//       display: flex;
//       flex-direction: row;
//       flex-wrap: wrap;
//       align-items: center;
//       justify-content: center;
//       gap: 24px;
//       grid-gap: 24px;
//       max-width: 1016px;
//     }

//     li {
//       box-sizing: border-box;
//       display: inline-block;
//       list-style: none;
//       width: 320px;
//       height: 72px;
//       padding-top: 2px;

//       // background-color: $dark500;
//       border-radius: 4px;
//       filter: drop-shadow(0px 6px 12px rgba(0, 0, 0, 0.36));

//       line-height: 72px;
//       // font-family: $overpassFontFamily;
//       text-align: center;
//       font-size: 28px;
//       font-weight: 800;

//       &.vrv {
//         background-color: #ffdd00;
//         color: #000000;
//       }
//       &.funimation {
//         background-color: #4d02a3;
//         color: #f9f9f9;
//       }
//       &.netflix {
//         background-color: #000000;
//         color: #e30d1a;
//       }
//       &.crunchyroll {
//         background-color: #f37521;
//         color: #ffffff;
//       }
//       &.hulu {
//         background-color: #000000;
//         color: #1ce783;
//       }
//       &.prime {
//         background-color: #181f27;
//         color: #3daae0;
//       }
//     }

//     .affiliation {
//       text-align: center;
//       margin-top: 64px;
//     }
//   }

//   .four {
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     padding-left: 0px;
//     padding-right: 0px;

//     h2,
//     .label {
//       text-align: center;
//       padding: 0 24px;
//     }

//     .list {
//       margin: 48px 0;
//     }

//     .label {
//       // color: $textDisabledColor;
//     }
//   }
// }     }

//       p {
//         margin-bottom: 16px;
//       }
//     }

//     #anime-skip-player {
//       display: flex;
//       flex-direction: column;
//       align-items: center;
//       max-width: 900px;
//       margin-top: 64px;

//       .example {
//         display: flex;
//         flex-direction: column;
//         align-items: center;
//         margin-top: 48px;
//         margin-bottom: 16px;
//         max-width: 600px;

//         img {
//           width: 100%;
//           border-radius: 4px;
//           filter: drop-shadow(0px 6px 12px rgba(0, 0, 0, 0.36));

//           // @media only screen and (min-width: $GRID_BREAK_SMALL) {
//           //   border-radius: 8px;
//           // }
//         }

//         .label {
//           margin-top: 16px;
//           text-align: center;
//         }
//       }

//       #benefits {
//         display: flex;
//         flex-direction: row;
//         flex-wrap: wrap;

//         .benefit {
//           display: flex;
//           flex-direction: column;
//           width: 256px;
//           padding: 16px;
//           margin: 0 auto;
//           text-align: center;

//           .icon {
//             width: 48px;
//             height: 48px;
//             padding: 16px;
//             align-self: center;
//           }

//           // @media only screen and (min-width: $GRID_BREAK_SMALL) {
//           //   padding: 24px;
//           //   padding-bottom: 0px;
//           //   border: none;
//           //   border-radius: 8px;
//           // }
//         }
//       }
//     }
//   }

//   .four {
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     padding-left: 0px;
//     padding-right: 0px;

//     h2,
//     .label {
//       text-align: center;
//       padding: 0 24px;
//     }

//     .list {
//       margin: 48px 0;
//     }

//     .label {
//       // color: $textDisabledColor;
//     }
//   }
// }
*/
</style>
