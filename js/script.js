/* =========================================================
   script.js – used by every page
   1. Video buttons (play/pause, back 5s, forward 5s)
   2. Mobile menu + Recipes dropdown
   3. Tick off ingredients
   4. Print recipe button
   5. Placeholder for missing photos
   ========================================================= */

/* ---------- 1. VIDEO BUTTONS ---------- */
// Turns seconds into "m:ss", e.g. 75 -> "1:15"
function formatTime(seconds) {
  if (isNaN(seconds)) return "0:00";
  var mins = Math.floor(seconds / 60);
  var secs = Math.floor(seconds % 60);
  return mins + ":" + (secs < 10 ? "0" : "") + secs;
}

var players = document.querySelectorAll(".video-player");

players.forEach(function (player) {
  var video = player.querySelector("video");
  var playBtn = player.querySelector(".btn-play");
  var backBtn = player.querySelector(".btn-back");
  var forwardBtn = player.querySelector(".btn-forward");
  var timeText = player.querySelector(".vc-time");

  // Play or pause
  function togglePlay() {
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  }

  playBtn.addEventListener("click", togglePlay);
  video.addEventListener("click", togglePlay); // clicking the video also works

  // Change the button text when the video plays or pauses
  video.addEventListener("play", function () {
    playBtn.innerHTML = "&#10074;&#10074; Pause";
    playBtn.setAttribute("aria-label", "Pause");
  });
  video.addEventListener("pause", function () {
    playBtn.innerHTML = "&#9654; Play";
    playBtn.setAttribute("aria-label", "Play");
  });

  // Go back 5 seconds (but not before the start)
  backBtn.addEventListener("click", function () {
    video.currentTime = Math.max(0, video.currentTime - 5);
  });

  // Skip forward 5 seconds (but not past the end)
  forwardBtn.addEventListener("click", function () {
    video.currentTime = Math.min(video.duration || 0, video.currentTime + 5);
  });

  // Show the time, e.g. "0:35 / 3:20"
  function updateTime() {
    timeText.textContent = formatTime(video.currentTime) + " / " + formatTime(video.duration);
  }
  video.addEventListener("timeupdate", updateTime);
  video.addEventListener("loadedmetadata", updateTime);
});


/* ---------- 2. MOBILE MENU + RECIPES DROPDOWN ---------- */
var nav = document.querySelector(".site-nav");
var menuToggle = document.querySelector(".menu-toggle");
var dropdown = document.querySelector(".dropdown");
var dropdownToggle = document.querySelector(".dropdown-toggle");

// ☰ Menu button (only visible on phones)
menuToggle.addEventListener("click", function () {
  var isOpen = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", isOpen);
});

// "Recipes" button opens/closes the list of 12 recipes
dropdownToggle.addEventListener("click", function () {
  var isOpen = dropdown.classList.toggle("open");
  dropdownToggle.setAttribute("aria-expanded", isOpen);
});

// Close the dropdown when you click somewhere else on the page
document.addEventListener("click", function (event) {
  if (!dropdown.contains(event.target)) {
    dropdown.classList.remove("open");
    dropdownToggle.setAttribute("aria-expanded", false);
  }
});


/* ---------- 3. TICK OFF INGREDIENTS ---------- */
// Tap an ingredient to cross it out, tap again to undo
document.querySelectorAll(".ingredients li").forEach(function (item) {
  item.addEventListener("click", function () {
    item.classList.toggle("done");
  });
});


/* ---------- 4. PRINT RECIPE BUTTON ---------- */
var printBtn = document.querySelector(".btn-print");
if (printBtn) {
  printBtn.addEventListener("click", function () {
    window.print();
  });
}


/* ---------- 5. MISSING PHOTO PLACEHOLDER ---------- */
// If a photo file hasn't been added yet, show a friendly box instead of a broken image
document.querySelectorAll(".photo img").forEach(function (img) {
  function showPlaceholder() {
    img.parentElement.innerHTML = '<div class="photo-missing">Photo coming soon</div>';
  }
  if (img.complete && img.naturalWidth === 0) {
    showPlaceholder();
  } else {
    img.addEventListener("error", showPlaceholder);
  }
});
