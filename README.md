# Welcome to Sector 33

**Info About the Simulator**

This version is the updated, refactored codebase developed in React and Tailwind CSS.

###  To Run a Local Copy of the Website

- Download the file `Sector33.html` within the `standalone` folder. Then double click the
  html file and it will automatically open in the browser (Wifi - Not Needed).

#### Known limits

- **Settings are not remembered.** Browsers give `file://` pages an opaque origin, so
  `localStorage` is unavailable or throws there. Text size and the audio preferences reset
  each time the file is opened. Every storage call is already guarded, so nothing breaks —
  it just forgets. Everything else behaves identically.
- **It is a single 4.8 MB download**, because the NASA fonts are inside it. That is the
  trade for needing no server and no extraction.