function toggleMenu() {
    const menu = document.querySelector(".menu-links");
    const icon = document.querySelector(".hamburger-icon");
    menu.classList.toggle("open");
    icon.classList.toggle("open");
}

function scrollToNextSection(currentSection) {
  const sections = [...document.querySelectorAll("section")];
  const currentSectionIndex = sections.indexOf(currentSection);

  const nextSection = sections[currentSectionIndex + 1];
  if (nextSection) {
    nextSection.scrollIntoView({ behavior: "smooth" });
  }
}

document.querySelectorAll(".arrow").forEach(arrow => {
  arrow.addEventListener("click", () => {
    scrollToNextSection(arrow.closest("section"));
  });
});

