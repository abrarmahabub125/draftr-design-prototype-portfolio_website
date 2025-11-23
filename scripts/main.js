const menuBtn = document.getElementById("menu-button");
const navigation = document.getElementById("navigation");
const header = document.getElementById("header");

let lastScroll = 0;

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;

  // SCROLL DOWN → hide header
  if (currentScroll > lastScroll) {
    header.classList.add("hide");
  }

  // SCROLL UP (even a little bit) → show header
  if (currentScroll < lastScroll && currentScroll > 0) {
    header.classList.remove("hide");
  }

  lastScroll = currentScroll;
});

menuBtn.addEventListener("click", () => {
  if (menuBtn.getAttribute("data") == "close") {
    if (navigation.classList.contains("-top-60")) {
      menuBtn.innerHTML = `<svg class="size-5 stroke-[#FFFFFF]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                          </svg>`;
      navigation.classList.remove("-top-60");
      navigation.classList.add("top-10");
    } else {
      menuBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
          class="size-5 stroke-[#FFFFFF]">
          <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
        </svg> `;
      navigation.classList.add("-top-60");
      navigation.classList.remove("top-10");
    }
  }
});

AOS.init({
  duration: 1000, // 1.2 seconds
});

// User scrolling speed control logic
let targetScroll = 0; // where the page should scroll
let currentScroll = 0; // current virtual scroll

// Listen to wheel scroll
window.addEventListener(
  "wheel",
  (e) => {
    e.preventDefault(); // prevent default scroll
    targetScroll += e.deltaY; // accumulate scroll
    // limit scroll to page height
    targetScroll = Math.max(
      0,
      Math.min(targetScroll, document.body.scrollHeight - window.innerHeight)
    );
  },
  { passive: false }
);

// Smoothly animate scroll
function smoothScroll() {
  currentScroll += (targetScroll - currentScroll) * 0.1; // adjust 0.1 for speed
  window.scrollTo(0, currentScroll);
  requestAnimationFrame(smoothScroll);
}

smoothScroll();
