# Mouad Chouai – Portfolio

Static portfolio (HTML, CSS, vanilla JS). No build step, no backend, GitHub Pages ready.

## Structure
```
index.html
css/style.css
js/script.js
assets/images/profile.jpg
assets/icons/favicon.svg
assets/cv/CV_Mouad_Chouai.pdf
```

## Run locally
Open `index.html` in a browser, or serve the folder:
```
python3 -m http.server 8000
```
Then visit http://localhost:8000.

## Customize
- **Text, experience, skills:** edit the matching `<section>` in `index.html`.
- **Colors and fonts:** change the variables at the top of `css/style.css`.
- **Project links:** inside a project's `.project__body`, add
  `<a class="btn btn--sm" href="YOUR_URL" target="_blank" rel="noopener"><i class="fa-brands fa-github"></i> Code</a>`.
  Add a new project by copying an `<article class="project">` and setting `data-cat` (`streaming`, `batch`, `devops`).
- **Replace the CV:** overwrite `assets/cv/CV_Mouad_Chouai.pdf` (keep the filename, or update the link in the hero).
- **Replace the photo:** overwrite `assets/images/profile.jpg` (square, about 600×600).

## Deploy on GitHub Pages
1. Create a repository and push these files to the `main` branch (`index.html` at the root).
2. Go to **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**, select `main` and `/ (root)`, then save.
4. Your site is live at `https://<username>.github.io/<repository>/` after a minute.

All paths are relative, so it works in a project subfolder.
