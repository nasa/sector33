# Building a Local Version of Sector 33

One file. Download it, double-click it, play. No install, no server, no extraction, and no
Node on the player's machine.

---

## Building it

```
npm run build:standalone
```

That writes `standalone/Sector33.html`, about **4.8 MB**.

## Handing it out

Attach that file to a
[GitHub Release](https://docs.github.com/en/repositories/releasing-projects-on-github).
The whole instruction to a player is:

> Download `Sector33.html` and double-click it.

No zip, so there is no extraction step to explain and no folder of assets that has to stay
next to the file. It opens in whatever browser they already have, works offline, and makes
**zero network requests** — everything is inside the one document: the stylesheet, all 26
NASA fonts, the logos, and the HDS icon sprite.

---

## Why the normal build cannot just be opened

Worth knowing, because the obvious approach fails *silently*: the page loads, nothing
appears, and it looks like the app is broken rather than the delivery method.

- The entry is `<script type="module">`, and browsers refuse to load module scripts over
  `file://` because the origin is opaque.
- Asset paths are absolute (`/assets/...`), which resolve to the root of the hard drive
  rather than to the folder the file is sitting in.

`scripts/build-standalone.mjs` folds everything into one document so there is nothing left
to fetch. It is commented with the reasoning and with the two traps that bit while writing
it, in case it ever needs changing.

One detail there is deliberate and easy to "simplify" by mistake: **the icon sprite is
injected into the document rather than turned into a `data:` URI.** Browsers block `<use>`
pointing at `data:` URIs, so switching it would make every icon silently disappear.

---

## Known limits

- **Settings are not remembered.** Browsers give `file://` pages an opaque origin, so
  `localStorage` is unavailable or throws there. Text size and the audio preferences reset
  each time the file is opened. Every storage call is already guarded, so nothing breaks —
  it just forgets. Everything else behaves identically.
- **It is a single 4.8 MB download**, because the NASA fonts are inside it. That is the
  trade for needing no server and no extraction.

---

## Commands

| Command | Result |
|---|---|
| `npm run dev` | Development server |
| `npm run build` | `dist/` — the hosted build, for the NASA domain |
| `npm run build:standalone` | `standalone/Sector33.html` — the offline single file |
| `npm run preview` | Serve `dist/` locally to check a production build |

`standalone/` is gitignored. It is a build output like `dist/`: publish it on a Release
rather than committing 4.8 MB to the repository every time it changes.
