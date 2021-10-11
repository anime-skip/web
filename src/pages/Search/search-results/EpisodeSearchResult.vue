<template>
  <li
    class="
      p-4
      bg-on-surface bg-opacity-0
      hover:bg-opacity-hover
      transition-colors
      rounded-lg
      space-y-1
    "
  >
    <p class="heading-6 text-primary">{{ name }}</p>
    <p class="text-on-surface text-opacity-medium">
      {{ showName }}&ensp;&bull;&ensp;{{ episodeDetails }}
    </p>
  </li>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';

export default defineComponent({
  props: {
    id: { type: String, required: true },
    name: { type: String, required: true },
    showId: { type: String, required: true },
    showName: { type: String, required: true },
    season: { type: String, default: undefined },
    number: { type: String, default: undefined },
    absoluteNumber: { type: String, default: undefined },
  },
  setup(props) {
    const episodeDetails = computed(() => {
      const segments: string[] = [];
      if (props.season != null) segments.push('Season ' + props.season);
      if (props.number != null) {
        if (segments.length === 1) {
          segments[0] += ',';
        }
        segments.push('Episode ' + props.number);
      }
      if (props.absoluteNumber != null) {
        segments.push('#' + props.absoluteNumber);
        if (segments.length > 1) {
          segments[segments.length - 1] = '(' + segments[segments.length - 1] + ')';
        }
      }
      return segments.join(' ');
    });
    return {
      episodeDetails,
    };
  },
});
</script>
