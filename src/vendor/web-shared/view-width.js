/* View width: on a local page (localhost, 127.0.0.1, ::1 or file://), a small button in the bottom
   right corner switches between the page at the window's width and the page in a 390 px frame, a
   phone's width. Breakpoints follow the window, not an element, so the narrow view loads the same
   address in an iframe of that width; the copy inside the frame shows no button. The choice lasts
   for the tab (sessionStorage). The copy inside the frame keeps the window's address and title in step
   with the frame's, so a link followed in the frame shows in the address bar, and the page behind the
   frame follows it too. Anywhere else the script does nothing. */
(function () {
  var host = location.hostname;
  var local = location.protocol === "file:" || host === "localhost" || host === "127.0.0.1" || host === "[::1]";
  if (!local) return;

  if (window.self !== window.top) {
    var outer;
    try {
      outer = window.parent;
      if (!outer.document.querySelector(".ws-view-width")) return;
    } catch (e) {
      return;
    }
    // The window takes the frame's address with replaceState, so its history gains no entries of its
    // own, and hears a popstate, so a single-page app behind the frame routes to it as well.
    var mirror = function () {
      try {
        if (outer.location.href !== location.href) {
          outer.history.replaceState(outer.history.state, "", location.href);
          outer.dispatchEvent(new PopStateEvent("popstate", { state: outer.history.state }));
        }
        if (outer.document.title !== document.title) outer.document.title = document.title;
      } catch (e) {}
    };
    ["pushState", "replaceState"].forEach(function (name) {
      var original = history[name];
      history[name] = function () {
        var result = original.apply(this, arguments);
        mirror();
        return result;
      };
    });
    window.addEventListener("popstate", mirror);
    new MutationObserver(mirror).observe(document.head, { subtree: true, childList: true, characterData: true });
    mirror();
    return;
  }

  // A tool for the person at the screen, never part of the page itself: an automated browser (a PDF
  // render, a screenshot, a page check) gets no button, and print hides it. Every web-shared control
  // that floats over a page follows the same two rules; see README, "Screen-only controls".
  if (navigator.webdriver) return;
  screenOnlyInPrint();

  var KEY = "ws-view-width";
  var NARROW = 390;
  var frame = null;

  var button = document.createElement("button");
  button.type = "button";
  button.className = "ws-view-width";
  button.setAttribute("data-ws-screen-only", "");
  button.style.cssText =
    "position:fixed;right:0.5rem;bottom:0.5rem;z-index:2147483647;margin:0;padding:0.25rem 0.5rem;" +
    "font:12px/1.4 ui-monospace,Menlo,monospace;letter-spacing:normal;text-transform:none;" +
    "color:var(--cfg,#222);background:var(--clight,#eee);border:1px solid var(--cmed,#999);" +
    "border-radius:6px;cursor:pointer;opacity:0.85";

  function show(narrow) {
    if (narrow && !frame) {
      frame = document.createElement("div");
      frame.setAttribute("data-ws-screen-only", "");
      frame.style.cssText =
        "position:fixed;inset:0;z-index:2147483646;display:flex;justify-content:center;" +
        "background:var(--cbg,#fff)";
      var view = document.createElement("iframe");
      view.title = "This page at " + NARROW + " px";
      view.src = location.href;
      view.style.cssText =
        "width:" + NARROW + "px;height:100%;border:0;border-inline:1px solid var(--cmed,#999)";
      frame.appendChild(view);
      document.body.appendChild(frame);
      document.documentElement.style.overflow = "hidden";
    } else if (!narrow && frame) {
      frame.remove();
      frame = null;
      document.documentElement.style.overflow = "";
    }
    // The label says what a click will do, and the tooltip says it in full.
    button.textContent = narrow ? "switch to full width" : "switch to phone width";
    button.title = narrow
      ? "Show this page at the window's width again"
      : "Show this page in a " + NARROW + " px frame, the width of a phone";
  }

  button.addEventListener("click", function () {
    var narrow = !frame;
    try {
      sessionStorage.setItem(KEY, narrow ? "narrow" : "wide");
    } catch (e) {}
    show(narrow);
  });

  function start() {
    document.body.appendChild(button);
    var saved = null;
    try {
      saved = sessionStorage.getItem(KEY);
    } catch (e) {}
    show(saved === "narrow");
  }
  if (document.body) start();
  else document.addEventListener("DOMContentLoaded", start);

  // The print rule ships with the script, because a site may import this file without web-shared's
  // stylesheets. One <style> per page, whichever control adds it first.
  function screenOnlyInPrint() {
    if (document.getElementById("ws-screen-only")) return;
    var style = document.createElement("style");
    style.id = "ws-screen-only";
    style.textContent = "@media print{[data-ws-screen-only]{display:none!important}}";
    (document.head || document.documentElement).appendChild(style);
  }
})();
