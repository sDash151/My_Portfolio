# Contact Form Backend

This is the backend service for the contact form project.  
It is built with Spring Boot and connects to a MySQL database to store contact messages.  
Additionally, the frontend integrates with EmailJS to send emails directly.

---

## Features

- Save contact messages to MySQL database (`portfolio_data` schema)
- REST API endpoint to receive contact form submissions
- CORS enabled for frontend integration
- EmailJS integration on frontend for email notifications

---

## Technologies Used

- Java 17+
- Spring Boot
- Spring Data JPA / Hibernate
- MySQL
- Maven

---

## Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd <your-project-folder>
