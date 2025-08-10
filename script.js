// Hamburger menu toggle
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });
}

// Gallery images and captions array
const images = [
  { src: "images/image1.jpg", caption: "Village Scene 1" },
  { src: "images/image2.jpg", caption: "Maa Kali Mandir" },
  { src: "images/image3.jpg", caption: "Village Festival" },
  { src: "images/image4.jpg", caption: "Harvest Season" }
];

let currentIndex = 0;

const galleryImage = document.getElementById("galleryImage");
const caption = document.getElementById("caption");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

function updateGallery(index) {
  if (galleryImage && caption) {
    galleryImage.src = images[index].src;
    caption.textContent = images[index].caption;
  }
}

if (galleryImage && caption && prevBtn && nextBtn) {
  updateGallery(currentIndex);

  prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateGallery(currentIndex);
  });

  nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % images.length;
    updateGallery(currentIndex);
  });
}

// More menu toggle
const moreBtn = document.getElementById('moreBtn');
const moreDropdown = document.getElementById('dropdownMenu') || document.getElementById('moreDropdown');

if (moreBtn && moreDropdown) {
  moreBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const isExpanded = moreBtn.getAttribute('aria-expanded') === 'true';
    moreBtn.setAttribute('aria-expanded', String(!isExpanded));
    moreDropdown.classList.toggle('show');
  });

  document.addEventListener('click', (e) => {
    if (!moreBtn.contains(e.target) && !moreDropdown.contains(e.target)) {
      moreDropdown.classList.remove('show');
      moreBtn.setAttribute('aria-expanded', 'false');
    }
  });
}

// ================================
// Amavasya Events Calendar Code
(function() {
  const eventsTableBody = document.getElementById('eventsTableBody');
  const eventsTable = document.getElementById('eventsTable');
  const eventDateInput = document.getElementById('eventDate');
  const eventDetails = document.getElementById('eventDetails');

  if (!eventsTableBody || !eventsTable || !eventDateInput || !eventDetails) return;

  const amavasyaEvents = [
    { date: '2025-01-29', day: 'Wednesday', name: 'Magha Amavasya', aartiTime: 'Evening' },
    { date: '2025-02-27', day: 'Thursday', name: 'Phalguna Amavasya', aartiTime: 'Evening' },
    { date: '2025-03-29', day: 'Saturday', name: 'Chaitra Amavasya', aartiTime: 'Evening' },
    { date: '2025-04-27', day: 'Sunday', name: 'Vaishakha Amavasya', aartiTime: 'Evening' },
    { date: '2025-05-26', day: 'Monday', name: 'Jyeshtha Amavasya', aartiTime: 'Evening' },
    { date: '2025-06-25', day: 'Wednesday', name: 'Ashadha Amavasya', aartiTime: 'Evening' },
    { date: '2025-07-24', day: 'Thursday', name: 'Shravana Amavasya', aartiTime: 'Evening' },
    { date: '2025-08-23', day: 'Saturday', name: 'Bhadrapada Amavasya', aartiTime: 'Evening' },
    { date: '2025-09-21', day: 'Sunday', name: 'Ashwin Amavasya', aartiTime: 'Evening' },
    { date: '2025-10-21', day: 'Tuesday', name: 'Kartik Amavasya', aartiTime: 'Evening' },
    { date: '2025-11-20', day: 'Thursday', name: 'Margashirsha Amavasya', aartiTime: 'Evening' },
    { date: '2025-12-20', day: 'Saturday', name: 'Pausha Amavasya', aartiTime: 'Evening' },
  ];

  function formatDateDDMMYYYY(dateStr) {
    const d = new Date(dateStr);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}-${month}-${year}`;
  }

  function populateEventsTable() {
    eventsTableBody.innerHTML = '';
    amavasyaEvents.forEach(event => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${formatDateDDMMYYYY(event.date)}</td>
        <td>${event.day}</td>
        <td>${event.name}</td>
        <td>${event.aartiTime}</td>
      `;
      eventsTableBody.appendChild(tr);
    });
    eventsTable.style.display = 'table';
  }

  function showSingleEvent(event) {
    eventsTableBody.innerHTML = '';
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${formatDateDDMMYYYY(event.date)}</td>
      <td>${event.day}</td>
      <td>${event.name}</td>
      <td>${event.aartiTime}</td>
    `;
    eventsTableBody.appendChild(tr);
    eventsTable.style.display = 'table';
  }

  function onDateChange(selectedDate) {
    const matchedEvent = amavasyaEvents.find(ev => ev.date === selectedDate);
    if (matchedEvent) {
      eventDetails.textContent = `${matchedEvent.name} on ${formatDateDDMMYYYY(matchedEvent.date)} (${matchedEvent.day}) - Aarti Time: ${matchedEvent.aartiTime}`;
      showSingleEvent(matchedEvent);
    } else {
      eventDetails.textContent = 'No events on this date.';
      eventsTable.style.display = 'none';
    }
  }

  window.addEventListener('load', () => {
    populateEventsTable();
    eventDateInput.addEventListener('change', () => {
      onDateChange(eventDateInput.value);
    });
  });

})();

// Suggestion form handling
const suggestionForm = document.getElementById('suggestionForm');
const formMessage = document.getElementById('formMessage');

if (suggestionForm && formMessage) {
  suggestionForm.addEventListener('submit', function(event) {
    event.preventDefault();
    formMessage.textContent = '';
    formMessage.style.color = 'red';

    const name = this.name.value.trim();
    const email = this.email.value.trim();
    const suggestion = this.suggestion.value.trim();

    if (!name || !email || !suggestion) {
      formMessage.textContent = 'Please fill in all required fields.';
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      formMessage.textContent = 'Please enter a valid email address.';
      return;
    }

    formMessage.style.color = 'green';
    formMessage.textContent = 'Thank you for your suggestion!';
    this.reset();
  });
}

// Courses data
const courses = [
  { id: 1, title: "Mathematics Basics", mentor: "D.K Singh", mentorPhoto: "images/mentor1.jpg", syllabus: ["Till 10th Standard", "Number Systems", "Arithmetic Operations"], duration: 20, contact: "yeslistenplease@gmail.com" },
  { id: 2, title: "Advanced Mathematics", mentor: "R.K Kumar", mentorPhoto: "images/mentor2.jpg", syllabus: ["Algebra", "Calculus", "Functions"], duration: 15, contact: "yeslistenplease@gmail.com" },
  { id: 3, title: "Basic Computer Skills", mentor: "P.K Singh", mentorPhoto: "images/mentor3.jpg", syllabus: ["Computer Basics", "MS Office"], duration: 25, contact: "yeslistenplease@gmail.com" }
];

const courseDropdown = document.getElementById("courseDropdown");
const courseList = document.getElementById("courseList");
const courseDetails = document.getElementById("courseDetails");

const notification = document.getElementById('notification');
const notificationText = document.getElementById('notification-text');
const closeNotification = document.getElementById('close-notification');

function createCourseCard(course) {
  const card = document.createElement("div");
  card.className = "course-card";
  card.innerHTML = `
    <h3>${course.title}</h3>
    <img src="${course.mentorPhoto}" alt="${course.mentor}" class="mentor-photo">
    <p><strong>Mentor:</strong> ${course.mentor}</p>
    <p><strong>Duration:</strong> ${course.duration} hours</p>
    <p><strong>Syllabus:</strong></p>
    <ul>${course.syllabus.map(item => `<li>${item}</li>`).join("")}</ul>
    <button class="enroll-btn" data-mentor="${course.mentor}">Enroll</button>
    <p class="contact-number">Contact: ${course.contact}</p>
  `;
  return card;
}

function showFamousCourses() {
  courseList.innerHTML = "";
  courses.forEach(course => {
    const card = createCourseCard(course);
    courseList.appendChild(card);
  });
}

function handleEnrollButtons() {
  const enrollButtons = document.querySelectorAll('.enroll-btn');
  enrollButtons.forEach(button => {
    button.addEventListener('click', () => {
      const mentorName = button.getAttribute('data-mentor');
      const course = courses.find(c => c.mentor === mentorName);
      const contactNumber = course ? course.contact : "Contact not available";

      // Notification now includes contact number
      notificationText.textContent = `You have enrolled successfully! Mentor Contact: ${contactNumber}`;

      // Contact number section changes to success message
      const contactDisplay = button.parentElement.querySelector('.contact-number');
      if (contactDisplay) {
        contactDisplay.textContent = "Enrolled successfully";
      }

      notification.classList.add('show');
      setTimeout(() => {
        notification.classList.remove('show');
      }, 4000);
    });
  });
}

if (closeNotification) {
  closeNotification.addEventListener('click', () => {
    notification.classList.remove('show');
  });
}

courses.forEach(course => {
  const opt = document.createElement("option");
  opt.value = course.id;
  opt.textContent = course.title;
  courseDropdown.appendChild(opt);
});

courseDropdown.addEventListener("change", function () {
  if (this.value) {
    courseList.innerHTML = "";
    const course = courses.find(c => c.id === Number(this.value));
    if (course) {
      const card = createCourseCard(course);
      courseList.appendChild(card);
    }
    courseList.style.display = "grid";
    courseDetails.style.display = "none";
    handleEnrollButtons();
  } else {
    courseList.style.display = "grid";
    showFamousCourses();
    courseDetails.style.display = "none";
    handleEnrollButtons();
  }
});

showFamousCourses();
courseDetails.style.display = "none";
handleEnrollButtons();
