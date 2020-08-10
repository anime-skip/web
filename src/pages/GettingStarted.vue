<template>
  <div class="GetStarted">
    <div class="column">
      <h1>Get Started</h1>
      <ol>
        <li>
          Create an account - You already did this
        </li>
        <li>
          Download and install the extension from
          <a
            target="_blank"
            href="https://drive.google.com/drive/folders/1n3PLPq8B1-zNRNoP_XDFMRe2_3uNJ3Gg?usp=sharing"
            >Google Drive</a
          >
          on your computer
        </li>
        <li>Watch some anime! Just follow one of the show links below</li>
        <li>
          Report anything you find (good, bad, ideas, improvements) though this
          <a target="_blank" href="https://forms.gle/LhcjN8LSUXmA4K9z6">Google Form</a>
        </li>
      </ol>
      <p>
        <i><span class="highlight">If you don't have a VRV account</span></i
        >, reach out to Aaron and he can give you access to a shared account.
      </p>
      <p>
        <span class="highlight red">Please don't try and break anything right now</span>, there will
        be a time and place for you to test out the security of the application. This is just a
        usage test, ie: do you like what this provides?
      </p>
      <div class="spacer" />

      <h2>Shows/Test Data</h2>
      <p>
        Both <a href="https://vrv.co/series/G6J0G49DR/Tower-of-God">Tower of God</a> and
        <a href="https://vrv.co/series/G6ZJ48K4Y/No-Game-No-Life">No Game, No Life</a> are fully
        filled out. There are a few other shows that have episodes with timestamps here and there,
        but right now those are the primary ones. Demon Slayer is coming soon.
      </p>
      <p>
        <i><span class="highlight">If you're one of my testers new to anime</span></i
        >, I would NOT recommend either of those shows. Demon Slayer will be a good place to start
        once I have that done. If you don't want to wait, Tower of God would be better starter
        anime, No Game No Life is going to be... to much.
      </p>
      <p>
        Try and watch at least 3 episodes before you give up on the show. Its only an hour of your
        life.
      </p>
      <div class="spacer" />

      <h2>Tips & Tricks</h2>

      <h3>Basic Keyboard Shortcuts</h3>
      <p>
        There are keyboard shortcuts if you watch something that doesn't have timestamps. They are
        designed for you to place your index fingers on <code>F</code> and <code>J</code> like
        you're typing.
      </p>
      <ul>
        <li>
          <code>R</code>
          - Advance 1:30
        </li>
        <li>
          <code>F</code>
          - Advance 0:05
        </li>
        <li>
          <code>V</code>
          - Advance 0:01
        </li>
        <br />
        <li>
          <code>W</code>
          - Go back 1:30
        </li>
        <li>
          <code>S</code>
          - Go back 0:05
        </li>
        <li>
          <code>X</code>
          - Go back 0:01
        </li>
        <br />
        <li>
          <code>E</code>
          - Next timestamp
        </li>
        <li>
          <code>D</code>
          - Play/pause
        </li>
        <li>
          <code>C</code>
          - Previous timestamp
        </li>
      </ul>

      <h3>Editing Keyboard Shortcuts</h3>
      <ul>
        <li>
          <code>J</code>
          - Go back 1 frame
        </li>
        <li>
          <code>K</code>
          - When editing, create a timestamp
        </li>
        <li>
          <code>L</code>
          - Advance 1 frame
        </li>
      </ul>
      <p>
        I'm not going to go into editing right now, but you're welcome to mess around.
        <span class="highlight red">Please do this in shows I haven't done yet</span>. Other than
        the shortcuts, it's fairly straight forward and easy to do.
      </p>
      <p>
        If you want to add some timestamps to shows I haven't gotten to, place the timestamps the
        frame after the cut, not the frame before the cut.
      </p>
      <p>
        For an example, open an episode from Tower of God and go into edit mode. Skip to a timestamp
        that has a hard cut using <code>E</code> or <code>C</code>, then press <code>J</code> to go
        back 1 frame. It will take you to before the cut, meaning the timestamp should be the next
        frame, the one after the cut.
      </p>
    </div>
  </div>
</template>

<script lang="ts">
export default {};
</script>

<style lang="scss" scoped>
.GetStarted {
  display: flex;
  flex-direction: column;
  align-items: center;

  .column {
    max-width: 720px;
    display: flex;
    flex-direction: column;
    padding: 24px;

    & > * {
      margin-bottom: 16px;
    }
  }

  .spacer {
    height: 24px;
  }

  .highlight {
    color: #009ce4;

    &.red {
      color: #e57373;
    }
  }

  p {
    line-height: 24px;
  }

  h2 {
    margin-bottom: 16px;
  }

  li {
    margin-left: 36px;
    margin-bottom: 8px;
  }

  code {
    padding: 2px 6px;
    background-color: rgba($color: #ffffff, $alpha: 0.12);
    color: white;
    border-radius: 3px;
    font-family: monospace;
    font-size: 16px;
  }
}
</style>
