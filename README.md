# Modern Finds - Amazon Affiliate Blog

A modern, minimalist, responsive static website for publishing product guides and Amazon affiliate recommendations.

## Files

- `index.html` - page structure and content sections
- `style.css` - complete responsive styling
- `script.js` - posts data, search, category filters, mobile menu
- `assets/` - local demo artwork used by the sample posts

## Add a new post

Open `script.js` and find:

```js
const posts = [
```

Copy an existing object and edit:

```js
{
  title: "Your new article title",
  category: "Your Category",
  date: "Aug 26, 2026",
  excerpt: "A short description of the article.",
  image: "assets/your-image.jpg",
  amazonUrl: "YOUR-AMAZON-AFFILIATE-LINK"
},
```

Then place your image in `assets/`.

No HTML editing is required for normal post additions.

## Important affiliate settings

Replace the demo `https://www.amazon.com/` URLs with your own Amazon Associates links.

The template already uses:

```html
rel="nofollow sponsored noopener"
```

for outbound Amazon links and contains a basic affiliate disclosure.

## Run locally

Double-click `index.html` or open it in a browser.

For best results with some hosting environments, serve the folder with a simple local web server.

Example with Python:

```bash
python -m http.server 8000
```

Then open:

`http://localhost:8000`

## Before publishing

- Replace sample post content.
- Replace all demo Amazon URLs.
- Add your own images.
- Change the site name in `index.html`.
- Review your Amazon Associates disclosure and link requirements for your region.
- Add any privacy, cookie, or legal pages required for your setup.
