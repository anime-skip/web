<template>
  <div class="Contributing">
    <div class="column">
      <h1>Contributing Guidelines</h1>
      <p>
        Contributing an episode to anime skip consists of two parts:
      </p>
      <ol>
        <li>
          <p><strong>Connect the epiosde to Anime Skip</strong></p>
          <p>
            In the Anime Skip Player, there is a button labeled "Connect to Anime Skip". Press it!
          </p>
          <p>
            If Anime Skip already has data matching the episode and show names, you will see a list
            of suggestions. When you click on a suggestion, it will add the url to Anime skip and
            you can begin editing timestamps. You can also do a manual search for the show if the
            suggestions don't contain the episode you're looking for.
          </p>
          <p>
            If there are no suggestions, or you can't find any matching episodes via the manual
            search, you will have to create the episode manually. Anime Skip will prefill some
            fields for you. Sometimes it can't find any useful information and you will have to
            enter it all manually. The prefilled is sometimes wrong, so sure to verify all the
            fields before creating the episode.
          </p>
        </li>
        <li>
          <p><strong>Edit the timestamps</strong></p>
          <p>
            You can open the list of timestamps by clicking on the "Timestamps" button in the bottom
            right. Timestamps mark the beginning of a section, they do not have an end time.
            Instead, another timestamp or the end of the episode logically mark the end of a
            section.
          </p>
          <p>
            From here, you can enter edit mode by clicking "Start Editing", deleting a timestamp, or
            adding a timestamp. When a timestamp is selected, it's position can be updated by using
            the keyboard shortcuts to advance/rewind the current time.
          </p>
          <p>After you're done editing, you can either save or discard your changes.</p>
        </li>
      </ol>

      <h2 id="contributing-best-practices">Best Practices</h2>
      <ol>
        <li>
          <p><strong>Place timestamps at the beginning frame of a section</strong></p>
          <p>
            When there is a hard cut between two frames (cuts to black or a different scene), the
            beginnnig frame is the one after the cut.
          </p>
          <p>
            When there is a transition between two sections it's a bit harder to nail down the
            start. These can be a bit less strict, and probably won't be frame perfect. In this
            situation, there are a couple ways to define the start of the next section.
          </p>
          <ul>
            <li>
              <i>If it's a fade to white/black</i>, put the timestamp after the fade is finished.
            </li>
            <li>
              <i>If it's a fade from white/black</i>, put the timestamp right at the beginning of
              the fade
            </li>
            <li>
              <i>If there's some kind of overlay that shows over the previous section</i>, put it on
              the first frame the overlay/animation becomes visible
            </li>
          </ul>
        </li>
        <li>
          <p><strong>Use the correct timestamp type</strong></p>
          <p>
            Make sure to check out the list of timestamp types above. Most should be obvious from
            the name, but if you're confused when ones should be used, you can click to on them and
            see their description.
          </p>
        </li>
        <li>
          <p>
            <strong
              >Remember to close short sections by adding a new timestamp for what comes
              after</strong
            >
          </p>
          <p>
            Since timestamps only go a the beginning of sections, it can be easy to forget to start
            the next section, especailly when the section was very short or the transition didn't
            interupt the episode.
          </p>
          <p>
            Future versions of the Anime Skip Player will attempt to warn you if you forgot to start
            a new section. For now, an easy way to check this is after you save the timestamps, look
            at the non-skipped sections in the video progress bar to see if there are large chunks
            of the episode skipped.
          </p>
        </li>
      </ol>

      <h2 id="contributing-tip">Tips & Tricks</h2>
      <p>
        <strong>Editing timestamps is done most efficently when you only use the keyboard</strong>.
        Timestamp editing was actually designed to be done this way, while using your mouse was
        meant for one off changes.
      </p>
      <p>
        Here are some tips and tricks so you can start contriubting!
      </p>
      <ul class="extra-spacing">
        <li>
          The keyboard shortcut for "Create Timestamp" isn't just for creating a timestamp, it will
          also enter editing mode if you're not in it.
        </li>
        <li>
          Immediately after your create a timestamp, you can update it's position using the
          advance/rewind keyboard shortcuts, including frame by frame ones
        </li>
        <li>
          When in editing mode, you can edit a nearby timestamp using the next/previous timestamp
          keyboard shortcuts
        </li>
        <li>
          Only the advance/rewind keyboard shortcuts will update a timestamp's position. So if you
          have a timestamp's position set, but you don't know it's type, you can resume playing the
          video without moving the timestamp's position (via play button or keyboard shortcut). Then
          once you know the type, select it and save the timestamp
        </li>
        <li>
          After the a timestamp was selected/created and it's position is set, you can use tab to
          move your cursor to begin filtering types.
        </li>
        <li>
          As you type and filter the types list, the type at the top of the list will become
          selected. If your cursor is in the filter text box and you press enter, it will save the
          timestamp with the selected type.
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.Contributing {
  display: flex;
  flex-direction: column;
  align-items: center;

  .column {
    width: 100%;
    max-width: 1128px;
    padding: 64px 32px;
    box-sizing: border-box;
  }
}

h1,
h2,
p,
ul {
  margin-bottom: 16px;
}

ul {
  margin-top: 24px;
  &.extra-spacing {
    li {
      margin-bottom: 16px;
    }
  }
}
ol ul {
  margin-top: 0;
  li {
    margin-bottom: 4px;
  }
}

h2 {
  margin-top: 64px;
}

ul,
ol {
  margin-left: 24px;
}
</style>
