# Portfolio Frontend

This is the frontend website for my portfolio, including a contact form that integrates with EmailJS and connects to a Spring Boot backend for storing messages.

---

## Features

- Responsive portfolio website with smooth scrolling and dark mode toggle
- Contact form with validation
- Sends emails using [EmailJS](https://www.emailjs.com/) service
- Stores submitted messages in backend database via REST API

---

## Technologies Used

- HTML5
- CSS3 (including animations and responsive design)
- JavaScript (Vanilla JS)
- EmailJS for email service
- Fetch API to connect with backend REST endpoint

---

## Usage

1. Open `index.html` in your browser to view the site.

2. Fill out the contact form and submit.

3. The form sends the data to:
    - EmailJS to send an email notification
    - Your backend API endpoint `/api/contact` to save the data in the database

---

## Configuration

- Replace the EmailJS service ID, template ID, and user ID in the JavaScript file with your own EmailJS account credentials.  
  Example:
  ```js
  emailjs.sendForm("your_service_id", "your_template_id", e.target)
