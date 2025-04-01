'use strict';

// Theme toggle functionality
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Check for saved theme preference or use preferred color scheme
const savedTheme = localStorage.getItem('theme') || 
                   (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
body.setAttribute('data-theme', savedTheme);

themeToggle.addEventListener('click', () => {
  const currentTheme = body.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  body.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
});

// Custom cursor
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

document.addEventListener('mousemove', (e) => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
  
  setTimeout(() => {
    cursorFollower.style.left = e.clientX + 'px';
    cursorFollower.style.top = e.clientY + 'px';
  }, 100);
});

document.addEventListener('mouseenter', () => {
  cursor.style.opacity = '1';
  cursorFollower.style.opacity = '1';
});

document.addEventListener('mouseleave', () => {
  cursor.style.opacity = '0';
  cursorFollower.style.opacity = '0';
});

// Cursor effects on interactive elements
const interactiveElements = document.querySelectorAll('a, button, .project-item, .service-item, .content-card, .form-input, .filter-item button, .select-item button');

interactiveElements.forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
    cursorFollower.style.transform = 'translate(-50%, -50%) scale(1.2)';
    cursorFollower.style.borderColor = 'var(--primary-color)';
  });
  
  el.addEventListener('mouseleave', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(1)';
    cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
    cursorFollower.style.borderColor = 'var(--primary-color)';
  });
});

// Page load animation
window.addEventListener('load', () => {
  document.body.classList.add('loaded');
  
  // Animate elements sequentially
  const animateElements = document.querySelectorAll('.animate__animated');
  animateElements.forEach((el, index) => {
    setTimeout(() => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, index * 200);
  });
});

// Navigation functionality
document.addEventListener('DOMContentLoaded', () => {
  const navigationLinks = document.querySelectorAll('[data-nav-link]');
  const pages = document.querySelectorAll('[data-page]');

  // Initialize first page as active if none are active
  const activePages = document.querySelectorAll('[data-page].active');
  if (activePages.length === 0) {
    const defaultPage = document.querySelector('[data-page="about"]');
    const defaultNavLink = document.querySelector('[data-nav-link].active');
    if (defaultPage) defaultPage.classList.add('active');
    if (defaultNavLink) defaultNavLink.classList.add('active');
  }

  navigationLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetPage = this.dataset.navLink;
      
      // Update active states
      pages.forEach(page => {
        page.classList.toggle('active', page.dataset.page === targetPage);
      });
      
      navigationLinks.forEach(navLink => {
        navLink.classList.toggle('active', navLink.dataset.navLink === targetPage);
      });
      
      window.scrollTo(0, 0);
    });
  });
});

// Sidebar toggle functionality
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

sidebarBtn.addEventListener("click", function () {
  sidebar.classList.toggle("active");
});

// Portfolio filter functionality
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");
const filterItems = document.querySelectorAll("[data-filter-item]");

select.addEventListener("click", function () {
  this.classList.toggle("active");
});

selectItems.forEach(item => {
  item.addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    select.classList.remove("active");
    filterFunc(selectedValue);
  });
});

const filterFunc = function (selectedValue) {
  filterItems.forEach(item => {
    if (selectedValue === "all" || selectedValue === item.dataset.category) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });
}

let lastClickedBtn = filterBtn[0];

filterBtn.forEach(btn => {
  btn.addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);
    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;
  });
});

// Contact form validation
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

formInputs.forEach(input => {
  input.addEventListener("input", function () {
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }
  });
});