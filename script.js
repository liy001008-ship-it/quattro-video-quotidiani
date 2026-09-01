const experience = document.querySelector(".experience");
const videoScreen = document.querySelector(".video-screen");
const video = document.querySelector("#installation-video");
const backButton = document.querySelector(".back-button");
const hotspots = document.querySelectorAll(".hotspot");

let returnTimer;

function returnHome() {
  clearTimeout(returnTimer);
  video.pause();
  video.removeAttribute("src");
  video.load();
  videoScreen.classList.remove("is-active");
  videoScreen.setAttribute("aria-hidden", "true");
  experience.classList.remove("is-playing");
}

async function enterVideo(source) {
  clearTimeout(returnTimer);
  video.pause();
  video.src = source;
  video.load();

  experience.classList.add("is-playing");
  videoScreen.classList.add("is-active");
  videoScreen.setAttribute("aria-hidden", "false");

  try {
    await video.play();
  } catch {
    // Browsers may require a second tap before audible playback can begin.
  }
}

hotspots.forEach((hotspot) => {
  hotspot.addEventListener("click", () => enterVideo(hotspot.dataset.video));
});

backButton.addEventListener("click", returnHome);
video.addEventListener("ended", returnHome);

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && experience.classList.contains("is-playing")) {
    returnHome();
  }
});
