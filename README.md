# BH Digital — Balkis Hmidi

## Current contact setup — FormSubmit

The form now posts directly to `https://formsubmit.co/bhdigital.contact@gmail.com` rather than opening an email application. This supersedes earlier mailto instructions below. The provider handles its anti-spam challenge and confirmation page; a hidden honeypot adds spam filtering. Visitor information passes through FormSubmit, which retains submissions according to its policies. The visible form notice reflects this.

Deploy the updated files, submit a test on the hosted site, then open the activation email in `bhdigital.contact@gmail.com` and confirm the form. Check Spam if necessary. Submit another test after activation and verify inbox delivery. Delivery has not yet been verified. Local `file:` submissions are blocked with a helpful message; use the hosted website. No email password or API secret belongs in this project.

## Interactive studio experience

`experience.css` adds the colorful visual layer: gradient headline, dark portfolio section, tinted service cards, animated accents, manifesto, and FAQ. Include this stylesheet when publishing. The objective selector recommends a service and prefills the contact dropdown. Native FAQ disclosures work without JavaScript. Animations respect reduced-motion preferences.

## Logo-based visual identity

Lina Boutique is the second example project, with supplied homepage, catalogue and boutique screenshots in `assets/lina-boutique-*.png`. Each portfolio card opens its own responsive gallery. The images are static design examples, not live shops.

The Café Yasmine portfolio card opens a keyboard-accessible gallery using the three supplied screenshots in `assets/cafe-yasmine-*.png`. These are static screenshots, not an interactive café website. They scale to available space without distortion. The project is labeled as an example rather than a verified client engagement.

The current design uses your supplied logo in `assets/bh-digital-logo.png`, with navy, electric blue and white. `brand.css` contains the visual redesign over the base layout. Logo whitespace is cropped by CSS without modifying the source image. Include `brand.css` and the `assets` folder when publishing.

Motion includes floating interface artwork, staggered scroll reveals, hover states and a scroll progress line. Reduced-motion preferences are respected; content remains available without JavaScript.

A responsive French-language website for your independent web studio in Tunisia. Built with HTML, CSS and JavaScript; no installation or build step required.

## Open in Visual Studio Code

Open this `bh-digital` folder in VS Code, then open `index.html` in your browser. You can also use the VS Code Live Server extension and choose **Open with Live Server** on `index.html`.

## Customize before publishing

- In `script.js`, set `CONTACT.email` to your real business email and `CONTACT.whatsapp` to your international WhatsApp number (digits only). The WhatsApp link remains hidden until configured. The contact form prepares an email in the visitor’s mail application; it does not send or save submissions itself.
- Update text and packages in `index.html`. No prices or delivery promises have been invented.
- The Oliva, Nūra and Café Lune designs are original illustrative concepts, not client work. Replace them with genuine portfolio examples when ready.
- Colors and responsive layouts are in `styles.css`.
- French copy is included. Arabic support is described as a service; an Arabic website translation is not included.
- Google Fonts requires an internet connection; local system fonts are used as a fallback.

## Publish

Upload `index.html`, `styles.css`, `script.js` and `favicon.svg` together to any static web host. Configure your real contact details first. No hosting account, analytics, backend or paid service is required by this source project.

## Structure

`index.html`: content and accessible structure. `styles.css`: design, mockup illustrations and responsive layouts. `script.js`: mobile navigation, package selection and contact configuration. `favicon.svg`: studio icon.
