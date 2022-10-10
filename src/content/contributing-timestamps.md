# Contributing Timestamps

## Overview

Contributing an episode to Anime Skip consists of two parts:

1. Connect the episode
2. Edit timestamps

### Connect the Episode to Anime Skip

In the Anime Skip Player, there is a button labeled "Connect to Anime Skip". Press it!

If Anime Skip already has data matching the episode and show names, you will see a list of suggestions. When you click on a suggestion, it will add the url to Anime Skip and you can begin editing timestamps. You can also do a manual search for the show if the suggestions don't contain the episode you're looking for.

If there are no suggestions, or you can't find any matching episodes via the manual search, you will have to create the episode manually. Anime Skip will prefill some fields for you. Sometimes it can't find any useful information and you will have to enter it all manually.

### Edit Timestamps

You can open the list of timestamps by clicking on the "Timestamps" button in the bottom right. Timestamps mark the beginning of a section, **they do not have an end time**. Instead, another timestamp or the end of the episode mark the start of the next section.

From here, you can enter edit mode by clicking "Start Editing", deleting a timestamp, or adding a timestamp. When a timestamp is being edited, it's position can be updated by using the keyboard shortcuts to advance/rewind the current time.

Keyboard shortcuts that make editing timestamps really fast! See the [Tips & Tricks](#use-keyboard-shortcuts) for how to use them.

After you're done editing, make sure you save your chnage!

## Best Practices

### Timestamp Placement

When there is a hard cut between two frames (cuts to black or a different scene), place the timestamp after

When there is a transition between two sections it's a bit harder to nail down the start. These can be a bit less strict, and probably won't be frame perfect. In this situation, there are a couple ways to define the start of the next section.

- If it's a fade to white/black, put the timestamp after the fade is finished.
- If it's a fade from white/black, put the timestamp right at the beginning of the fade
- If there's some kind of overlay that shows over the previous section, put it on the first frame the overlay/animation becomes visible

### Timestamp Types

Make sure to check out the list of [timestamp types](https://www.anime-skip.com/support#timestamp-types). Most should be obvious from the name, but if you're confused which ones should be used, you can click to on them and see their description.

### Add Ending Timestamps

Since timestamps only go a the beginning of sections, it can be easy to forget to start the next section, especailly when the section was very short or the transition didn't interupt the episode.

Future versions of the Anime Skip Player will attempt to warn you if you forgot to start a new section. For now, an easy way to check this is after you save the timestamps, look at the non-skipped sections in the video progress bar to see if there are large chunks of the episode skipped.

## Tips & Tricks

### Use Keyboard Shortcuts

Keyboard shortcuts make it really easy to add and edit timestamps. Here's the general flow I use to create, place, select a type, and save the timestamp

- <kbd>K</kbd> will pause the video and start editing. Use this shortcut to place a timestamp and start editing!
- <kbd>J</kbd> / <kbd>L</kbd> to move the timestamp forwards and backwards frame-by-frame
- <kbd>TAB</kbd> to switch to the timestamp type filter
- Type in the timestamp type. You don't need to type the full name, just the first couple of letters
- Use <kbd>↑</kbd> and <kbd>↓</kbd> to select a type after filtering if the one you want isn't selected by default
- <kbd>ENTER</kbd> to save the timestamp
- <kbd>ctrl+ENTER</kbd> to save your changes
