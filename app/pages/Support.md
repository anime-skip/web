<script setup>
import SupportTimestampTypes from '../components/SupportTimestampTypes.vue'
</script>

# Support

## Contact Me

Anime Skip is a one-man team! Feel free to reach out if you have any issues or need help, but please checkout the [FAQ](#faq) first.

- Email: <support@anime-skip.com>
- Tag me on the Anime Skip Discord: :md-external-link{to="DISCORD_INVITE" text="@aaron"}

## FAQ

<details>
<summary>The Anime Skip video player doesn't show up when I go to watch an episode</summary>

Make sure you've followed the [getting started guide](/) and you've properly installed the Anime Skip web extension. Also keep in mind that Anime Skip does not work on every streaming service, so make sure you're watching on one of the [supported services](/#supported-services).

In very rare cases, a website update can break how the Anime Skip player replaces the websites default player with it's own. If you believe this is the case, you should be able to find some kind of announcement on the [Discord](https://discord.gg/9wVhwZg).

</details>

<details>
<summary>Video starts playing as muted</summary>

You likely have auto-play set to "Start muted" for the website. This is a browser setting, usually accessible to the left of the URL in the browser search bar.

</details>

<details>
<summary>How do I submit timestamps?</summary>

Head over to the [contributing guidelines](/docs/contributing-timestamps) for an overview, best practices, and tips and tricks.

</details>

<details>
<summary>How do I edit keyboard shortcuts?</summary>

Keyboard shortcuts are apart of the "all settings" page of the extension. Make sure you have followed the [getting started guide](/get-started) and installed the web extension.

When watching a video, open the player settings by clicking on the menu button in the bottom right. Then click the "All Settings" button.

You can also access the "all settings" page from your account page on this website! Sign in or go to your account, then click "Player Settings" on the sidebar.

</details>

<details>
<summary>I would like to delete my account, how do I go about doing that?</summary>

In the future, there will be an option to delete your account from your account settings page. Until then, fill out and send [this email template](mailto:support@anime-skip.com?subject=Anime%20Skip%20-%20Delete%20Account&body=My%20email%20is%20_,%20and%20my%20username%20is%20_.) so that I can delete your account manually.

</details>

<details>
<summary>What happens to my account and contributions when I delete my account?</summary>

In accordance with the [Privacy Policy](/docs/policies/privacy), your contributations are not deleted and you're account is wiped of all personal data. No history of your personal information is ever stored.

This is done so that Anime Skip still knows which account created an episode or timestamp. This way we can tell deleted users apart and still provide a robust interface with any apps that depend on that data, while respecting your right to your data.

</details>

<details>
<summary>What permissions does the extension use, and why?</summary>

#### Host

This is used to replace the original service's video player with Anime Skips.

For Chrome, this shows as the "Host" permission. For Firefox, it shows as "Access your data for \_\_\_\_"

#### Storage

In order to provide a good user experience, the extension needs access to the browser's storage. An example: whether or not you are logged in is persisted to the extension's local storage so that you don't have to login for every episode.

Also worth mentioning, the Anime Skip Player does not create or read cookies.

#### Tabs

For some services it's impossible to get the current URL when linking it to an episode. The permission is used to listen for tab URL changes. When a tab's URL changes, if it's for a service Anime Skip supports, the tab is notified what the new URL is.

It's unfortunate this is required, and I recognize that how this permission is used could be abused to track user history. However, the extension is open source, and you're welcome to review the code! I would love a PR that removes the need for this permission.

VRV (and maybe future services) uses HTML5 history to navigate their Single Page Application, meaning in iframes that are not from the same origin cannot get the tab's current URL. They can get the URL that the iframe was created at, but when HTML5 history is used to go to another episode, the iframe isn't always destroyed (it's reused with a new tab URL), meaning the method to aforementioned method would return the original URL, not the new one.

The "currentTab" permission does not provide enough utility for each tab to be notified when it's URL changes, so that can't be used as a replacement.

</details>

## Timestamp Types

<SupportTimestampTypes />
