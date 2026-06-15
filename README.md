index.html - Entry point for application
README.md - This file, useful info for dev
.git - GitHub important files
package.json - Node.js setup
package-lock.json - Node.js file locked
vite.config.js - Vite setup

node_modules/: Node.js dependencies

.idea/: WebStorm dependencies

assets/: Static Resources

assets/styles - CSS files for proj
    styles.css - main CSS file contains GSAP struct
assets/images - all images for proj (buttons, background, etc.)
assets/fonts - all fonts used in proj
assets/videos - any videos embedded
assets/JSON - static JSON files needed or used

src/: Code & Logic

main.js - Central entry point for JS and all logic happens here



src/components - Reusable UI such as buttons, headers, modals, cards, nav menus
src/constants - static unchanged values such as color palettes, static var, logic constants
src/services - api layer, auth scripts
src/styles - extra CSS needed
src/views - extra pages
src/controllers - business logic, data processing, response formatting
src/utils - utility functions used to reduce redundancy

tests/: testing for various bugs and cases automatically

tests/unit
tests/integration
