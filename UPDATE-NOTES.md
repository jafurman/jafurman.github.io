# Portfolio update — November 15, 2026

The opening now visualizes the carving phase of Joshua's Unity RandomTilemap.cs from AscentionPCG/Assets/Scripts: 100 by 100 grid, center start, four cardinal directions, the original revisit probability gate (modulator 100), and stop two cells from the edge. This is a JavaScript/Three.js visualization, not the Unity game: prefab placement, terrain cleanup and Unity random-number sequences are not reproduced. The original unreachable inner bias loop is not applied. Attempts are spread over animation frames so the browser stays responsive.

New cave regenerates the map; Pause freezes it. Reduced-motion preferences start with a static generated map. Animation pauses when hidden or off-screen. Existing portfolio content and project pages are retained. Three.js is vendored locally; no installation/build is required for GitHub Pages.

Quick checks: desktop and mobile rendering, browser errors, horizontal overflow, pause/reset and reduced-motion rendering. Evidence and original-file backups are in the ignored .smudge folder. No publishing was performed.

Preview locally: http://127.0.0.1:8014/ while the existing preview server is running. Otherwise run `python -m http.server 8014 --bind 127.0.0.1` from this folder.

## Publish yourself

In PowerShell:

```powershell
cd "C:\Users\Joshua Furman\Documents\GitHub\jafurman.github.io"
git status
git add .
git commit -m "Refresh portfolio with animated PCG random-walk opening"
git push origin HEAD
```

Review `git status` first: the previous model also changed the site and converted image/video assets. The commit includes those existing local changes. `HEAD` pushes the current branch; it does not switch branches or force-push. GitHub Pages must already be configured to deploy that branch. If Git reports this is not a repository, do not initialize or force-push blindly: use a fresh clone and copy the website files into it (excluding .smudge, node_modules and .idea).
