//################### Navbar Toggler ##########################
// Get the menu and hamburger elements
const menu = document.querySelector(".menu");
const hamburgerMenu = document.querySelector(".hamburger-menu");

// Toggle the 'active' class on menu when hamburger icon is clicked
hamburgerMenu.addEventListener("click", () => {
  menu.classList.toggle("active");
});







document.addEventListener("DOMContentLoaded", function () {
  var menuItems = document.querySelectorAll(
    ".header-bottom .menu > li.menu-item-has-children"
  );
  var siteURL = window.location.origin;
  menuItems.forEach(function (item) {
    if (item) {
      var customHTML = document.createElement("div");
      customHTML.className = "submenu-toggler";
      var imgElement = document.createElement("img");
      imgElement.src =
        siteURL +
        "/wp-content/themes/nursing-assignment/assets/img/icons/arrow-down.svg";
      imgElement.alt = "icon";
      imgElement.width = 13;
      imgElement.height = 7;
      customHTML.appendChild(imgElement);
      item.appendChild(customHTML);
    }
  });

  var menuToggler = document.querySelectorAll(
    ".header-bottom .menu > li.menu-item-has-children .submenu-toggler"
  );
  menuToggler.forEach(function (item) {
    item.addEventListener("click", function () {
      console.log(4);
      item.parentElement.querySelector(".sub-menu").classList.toggle("active");
    });
  });
});


document.addEventListener("DOMContentLoaded", function () {
  var items = document.querySelectorAll('.student-list li');
  var index = 0;

  function toggleActive() {
    items.forEach(function (item) {
      item.classList.remove('active');
    });
    items[index].classList.add('active');
    index = (index + 1) % items.length;
  }

  setInterval(toggleActive, 1500); // Change interval as needed
});


document.addEventListener("DOMContentLoaded", function () {
  var accordionItems = document.querySelectorAll('.accordion-item');

  accordionItems.forEach(function (item) {
    var header = item.querySelector('.accordion-header');
    var content = item.querySelector('.accordion-content');

    header.addEventListener('click', function () {
      var isActive = item.classList.contains('active');

      // Close all content sections
      accordionItems.forEach(function (accItem) {
        accItem.classList.remove('active');
        accItem.querySelector('.accordion-content').classList.remove('show');
      });

      // Toggle active class and show content
      if (!isActive) {
        item.classList.add('active');
        content.classList.add('show');
      }
    });
  });
});




let animationStarted = false; // Flag to track if animation has started

function isElementInViewport(el) {
  const rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

function animateValue(element, start, end, duration) {
  const range = end - start;
  let current = start;
  const increment = 10; // Increase by 10 each time
  const stepTime = Math.abs(Math.floor(duration / (range / increment))); // Adjust step time accordingly
  const timer = setInterval(function () {
    current += increment;
    if (current >= end) {
      current = end; // Ensure current value doesn't exceed the target
      clearInterval(timer);
    }
    if (current % 1000 === 0) {
      element.textContent = (current / 1000) + 'k';
    } else {
      element.textContent = current + '+';
    }
  }, stepTime);
}

function startCounterAnimation() {
  if (!animationStarted) {
    document.querySelectorAll('.counter').forEach(function (element) {
      const target = parseInt(element.getAttribute('data-target'));
      animateValue(element, 0, target, 2000); // Reduce the duration to 1000 milliseconds
    });
    animationStarted = true; // Set flag to true to indicate animation has started
  }
}

// Check on scroll
window.addEventListener('scroll', function () {
  document.querySelectorAll('.counter').forEach(function (element) {
    if (isElementInViewport(element)) {
      startCounterAnimation();
    }
  });
});


