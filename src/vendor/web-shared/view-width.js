/* View width: on a local page (localhost, 127.0.0.1, ::1 or file://), a small button in the bottom
   right corner switches between the page at the window's width and the page in a 390 px frame, a
   phone's width. Breakpoints follow the window, not an element, so the narrow view loads the same
   address in an iframe of that width; the copy inside the frame shows no button. The choice lasts
   for the tab (sessionStorage). Anywhere else the script does nothing. */
(function () {
  var host = location.hostname;
  var local = location.protocol === "file:" || host === "localhost" || host === "127.0.0.1" || host === "[::1]";
  if (!local || window.self !== window.top) return;

  var KEY = "ws-view-width";
  var NARROW = 390;
  var frame = null;

  var button = document.createElement("button");
  button.type = "button";
  button.className = "ws-view-width";
  button.style.cssText =
    "position:fixed;right:0.5rem;bottom:0.5rem;z-index:2147483647;margin:0;padding:0.25rem 0.5rem;" +
    "font:12px/1.4 ui-monospace,Menlo,monospace;letter-spacing:normal;text-transform:none;" +
    "color:var(--cfg,#222);background:var(--clight,#eee);border:1px solid var(--cmed,#999);" +
    "border-radius:6px;cursor:pointer;opacity:0.85";

  function show(narrow) {
    if (narrow && !frame) {
      frame = document.createElement("div");
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
    button.textContent = narrow ? NARROW + " px · show wide" : "wide · show " + NARROW + " px";
    button.setAttribute("aria-pressed", narrow ? "true" : "false");
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
})();
