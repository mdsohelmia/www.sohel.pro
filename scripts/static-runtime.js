// Inlined into every built page by scripts/static-html.ts, replacing the
// React/TanStack client bundle. Mirrors the two interactive behaviours of
// the React components: ThemeToggle and the header's mobile menu.
;(function () {
  var doc = document
  var root = doc.documentElement

  // Theme: same storage key and class as ThemeToggle.
  doc.querySelectorAll("[data-theme-toggle]").forEach(function (button) {
    button.addEventListener("click", function () {
      var dark = root.classList.toggle("dark")
      try {
        localStorage.setItem("theme", dark ? "dark" : "light")
      } catch (e) {}
    })
  })
  try {
    matchMedia("(prefers-color-scheme: dark)").addEventListener(
      "change",
      function (e) {
        if (!localStorage.getItem("theme")) root.classList.toggle("dark", e.matches)
      }
    )
  } catch (e) {}

  // Mobile menu: aria-expanded drives the icon swap in CSS.
  var button = doc.querySelector('[aria-controls="mobile-nav"]')
  var nav = doc.getElementById("mobile-nav")
  if (!button || !nav) return
  function setOpen(open) {
    nav.hidden = !open
    button.setAttribute("aria-expanded", String(open))
    button.setAttribute("aria-label", open ? "Close menu" : "Open menu")
  }
  button.addEventListener("click", function () {
    setOpen(nav.hidden)
  })
  doc.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !nav.hidden) {
      setOpen(false)
      button.focus()
    }
  })
})()
