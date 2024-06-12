# Timesync Backend

![Timesync](https://i.ibb.co/qswXNMb/timesync.png)

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Architecture](#architecture)
- [Technologies Used](#technologies-used)
- [System Requirements](#system-requirements)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Limitations](#limitations)
- [Future Scope](#future-scope)
- [Author](#author)

## Introduction {#link-sf .btn-read-more}

The backend of the Timesync project is built using NestJS and MongoDB. It provides RESTful API endpoints for managing classes, subjects, students, teachers, timetables, attendance, attendance reports, and event schedules.

## Features

- **User Management:** Register and authenticate users (students, teachers, administrators).
- **Class Management:** CRUD operations for classes.
- **Subject Management:** CRUD operations for subjects.
- **Student Management:** CRUD operations for students.
- **Teacher Management:** CRUD operations for teachers.
- **Timetable Management:** Generate and manage timetables.
- **Attendance Management:** Record and manage attendance.
- **Attendance Reports:** Generate and fetch attendance reports.
- **Event Scheduling:** Manage event schedules and calendars.

## Architecture

- **Controllers:** Handle incoming HTTP requests and return responses.
- **Services:** Contain business logic and interact with the database.
- **Repositories:** Manage data persistence and retrieval using MongoDB.
- **DTOs (Data Transfer Objects):** Define the shape of data sent and received.
- **Guards & Middleware:** Implement authentication and authorization.

## Technologies Used

- **NestJS:** A progressive Node.js framework for building efficient, reliable, and scalable server-side applications.
- **MongoDB:** A NoSQL database for storing application data.
- **Mongoose:** An ODM (Object Data Modeling) library for MongoDB and Node.js.

## System Requirements

- **Node.js:** v14.x or later
- **MongoDB:** v4.x or later
- **npm:** v6.x or later

## Installation

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/himanshuk09/TimeSync-be.git
   cd timesync-backend

   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

## Configuration

- Create a .env file in the root directory and add your necessary environment variables.
  ```bash
   MONGODB_URL=mongodb://127.0.0.1:27017/TimeSync
   JWT_SECRET=ABCDEFGHIJKLMNOPQRSTUVWXYZ
   JWT_EXPIRES=1d
   PORT=3000
  ```

## Running the Application

1. **Start MongoDB:**
   Ensure MongoDB is running on your local machine or a remote server.

2. **Start the Application:**
   ```bash
   npm run start

   ```

## API Documentation

API documentation is generated using Swagger and can be accessed at http://localhost:3000/api.

## Limitations

- Limited offline capabilities.
- Basic user interface in initial implementation.
- Scalability issues with very large datasets.
- Real-time data updates not fully supported.
- Security measures need enhancement for sensitive data protection.

## Future Scope

- Enhance scalability and performance.
- Implement real-time data synchronization and notifications.
- Develop offline capabilities and native mobile apps.
- Improve UI/UX design for a better user experience.
- Offer extensive customization options for different schools.
- Integrate with third-party educational tools and platforms.

## Author

- Name: Himanshu Khade
- Email: 20013himanshu@gmail.com
- Portfolio : https://himanshu-khade-portfolio.vercel.app/
- LinkedIn: https://www.linkedin.com/in/himanshu-khade-3a64a2197/
