/* Mythreyi Information Technology: menu, gentle scroll effects and the contact form.
   No libraries. Everything on the page still works and shows if this file does not run. */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* Footer year */
  var year = document.querySelector("[data-year]");
  if (year) year.textContent = String(new Date().getFullYear());

  /* Header: a quiet line appears once the page scrolls */
  var header = document.querySelector("[data-header]");
  function onScroll() { if (header) header.classList.toggle("is-scrolled", window.scrollY > 8); }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* Menu on phones and tablets */
  var toggle = document.querySelector("[data-nav-toggle]");
  var menu = document.querySelector("[data-nav-menu]");
  var wide = window.matchMedia("(min-width: 960px)");

  function setMenu(open, returnFocus) {
    if (!toggle || !menu) return;
    toggle.setAttribute("aria-expanded", String(open));
    menu.classList.toggle("is-open", open);
    document.body.classList.toggle("menu-open", open && !wide.matches);
    if (open) {
      var first = menu.querySelector("a");
      if (first) first.focus();
    } else if (returnFocus) {
      toggle.focus();
    }
  }
  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      setMenu(toggle.getAttribute("aria-expanded") !== "true", false);
    });
    menu.addEventListener("click", function (event) {
      if (event.target.closest("a") && !wide.matches) setMenu(false, false);
    });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") setMenu(false, true);
    });
    wide.addEventListener("change", function () { setMenu(false, false); });
  }

  /* Highlight the menu link of the section on screen */
  var links = Array.prototype.slice.call(document.querySelectorAll(".nav-link"));
  if ("IntersectionObserver" in window && links.length) {
    var byId = {};
    links.forEach(function (link) { byId[link.getAttribute("href").slice(1)] = link; });
    var sectionWatch = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        links.forEach(function (link) { link.classList.remove("is-current"); link.removeAttribute("aria-current"); });
        var current = byId[entry.target.id];
        if (current) { current.classList.add("is-current"); current.setAttribute("aria-current", "true"); }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    Object.keys(byId).forEach(function (id) {
      var section = document.getElementById(id);
      if (section) sectionWatch.observe(section);
    });
  }

  /* Sections fade in as they scroll into view (only those that start below the screen) */
  if (!reduceMotion && "IntersectionObserver" in window) {
    var revealWatch = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.remove("reveal-pending");
          revealWatch.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px" });
    document.querySelectorAll("[data-reveal]").forEach(function (el) {
      if (el.getBoundingClientRect().top > window.innerHeight) {
        el.classList.add("reveal-pending");
        revealWatch.observe(el);
      }
    });
  }

  /* Contact form */
  var form = document.querySelector("[data-contact-form]");
  if (!form) return;
  var status = form.querySelector("[data-status]");
  var submit = form.querySelector("[data-submit]");
  var openedAt = Date.now();
  var EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  function showError(field, message) {
    var error = document.getElementById(field.id + "-error");
    field.setAttribute("aria-invalid", message ? "true" : "false");
    if (error) { error.textContent = message; error.hidden = !message; }
  }

  function check() {
    var problems = [];
    var name = form.elements.name, email = form.elements.email, message = form.elements.message, consent = form.elements.consent;
    var tests = [
      [name, name.value.trim().length >= 2, "Please enter your name."],
      [email, EMAIL.test(email.value.trim()), "Please enter an email address like name@example.com."],
      [message, message.value.trim().length >= 10, "Please write a few words (at least 10 characters)."],
      [consent, consent.checked, "Please tick the box so that we may reply to you."]
    ];
    tests.forEach(function (t) {
      showError(t[0], t[1] ? "" : t[2]);
      if (!t[1]) problems.push(t[0]);
    });
    return problems;
  }

  function say(text, kind) {
    status.textContent = text;
    status.className = "form-status" + (kind ? " is-" + kind : "");
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    var problems = check();
    if (problems.length) {
      problems[0].focus();
      say("Please check the " + (problems.length === 1 ? "highlighted field." : problems.length + " highlighted fields."), "error");
      return;
    }
    /* Robots fill the hidden field or send within seconds; pretend it worked and send nothing */
    if (form.elements.website.value || Date.now() - openedAt < 3000) {
      form.reset();
      say("Thank you. Your message has been sent.", "ok");
      return;
    }

    var endpoint = (form.getAttribute("data-endpoint") || "").trim();
    var address = (form.getAttribute("data-email") || "").trim();
    var data = {
      name: form.elements.name.value.trim(),
      email: form.elements.email.value.trim(),
      organisation: form.elements.organisation.value.trim(),
      message: form.elements.message.value.trim()
    };

    if (endpoint) {
      submit.disabled = true;
      say("Sending…");
      var body = new FormData();
      Object.keys(data).forEach(function (key) { body.append(key, data[key]); });
      body.append("_subject", "Website message from " + data.name);
      fetch(endpoint, { method: "POST", body: body, headers: { Accept: "application/json" } })
        .then(function (response) {
          if (!response.ok) throw new Error(String(response.status));
          form.reset();
          say("Thank you. Your message has been sent, and we will reply by email.", "ok");
        })
        .catch(function () {
          say("Sorry, the message could not be sent. Please try again in a few minutes.", "error");
        })
        .then(function () { submit.disabled = false; });
      return;
    }

    if (address) {
      var text = "Name: " + data.name + "\nEmail: " + data.email +
        (data.organisation ? "\nOrganisation: " + data.organisation : "") + "\n\n" + data.message;
      window.location.href = "mailto:" + encodeURIComponent(address) +
        "?subject=" + encodeURIComponent("Website message from " + data.name) +
        "&body=" + encodeURIComponent(text);
      say("Your email app should open with the message ready to send.", "ok");
      return;
    }

    say("The form is not connected yet. Set data-endpoint or data-email on the form (see README.md).", "error");
  });

  /* Clear a field's message as soon as it is corrected */
  form.addEventListener("input", function (event) {
    if (event.target.getAttribute("aria-invalid") === "true") showError(event.target, "");
  });
})();
