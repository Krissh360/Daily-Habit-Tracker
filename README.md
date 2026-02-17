# Daily-Habit-Tracker

Project Title:
Daily Habit Tracker with Gamification 


Problem Statement:

In today’s fast-paced digital lifestyle, many individuals struggle to build and maintain positive daily habits such as regular exercise, studying, meditation, or healthy routines. Existing habit-tracking methods are often monotonous and fail to keep users motivated over long periods. 
There is a need for an interactive and engaging system that not only tracks daily habits but also motivates users through gamification elements such as points, streaks, levels, and rewards. A centralized habit tracker with game-like feedback can significantly improve consistency, self-discipline, and long-term habit formation. 


Module Breakdown:

1. User Authentication Module 

Handles user registration and login, ensuring secure access to personal habit data. 

2. Habit Management Module 

Allows users to create, update, delete, and manage daily habits with customizable frequency and goals. 

3. Daily Tracking Module 

Enables users to mark habits as completed or missed on a daily basis. 

4. Gamification Module 

Implements points, streaks, levels, badges, and rewards to motivate users and encourage consistency. 

5. Progress Analytics Module 

Displays habit completion statistics, streak history, and progress summaries using visual indicators. 

6. Database Management Module 

Stores user data, habits, completion records, and gamification metrics in a structured manner. 

 

Requirements:

Functional Requirements 

    User registration and login system 
    Create, edit, and delete daily habits 
    Daily habit completion tracking 
    Automatic streak calculation 
    Points and rewards system 
    Level progression based on consistency 
    Progress dashboard for users 
    Secure storage of user and habit data 

Non-Functional Requirements 

    Simple and intuitive user interface 
    Fast response time 
    Secure authentication and data handling 
    Scalable system design 
    Cross-platform browser compatibility 

 

Design:

High Level Design 

The system follows a client–server architecture. 

    Users interact with the application through a web-based interface 
    The frontend sends requests to the backend server 
    The backend processes logic related to habits, tracking, and gamification 
    The backend communicates with the database to store and retrieve data 
    Gamification rules are applied dynamically based on user actions 
    All user progress is stored in a centralized database 
 

Low Level Design 

    The User Module manages authentication and profile data 
    The Habit Module handles habit creation, updates, and deletion 
    The Tracking Module records daily habit completion 
    The Gamification Engine calculates points, streaks, and levels 
    The Dashboard Module displays progress and achievements 
    The Database Layer stores users, habits, logs, and rewards 
    The Backend Server validates requests and manages data flow 

 

Gamification Logic:

    Each completed habit gives reward points 
    Consecutive completions increase streak count 
    Breaking a streak resets the counter 
    Points contribute to level upgrades 
    Badges are awarded for milestones such as: 
    7-day streak 
    30-day consistency 
    Multiple habits maintained 

 

Technology Stack:

Frontend 

    HTML 
    CSS 
    JavaScript 

Backend 

    Node.js 
    Express.js 

Database 

    MongoDB 

Tools & Environment 

    Visual Studio Code 
    Web Browser
    Git & GitHub 

 

Future Enhancements:

    Mobile application version 
    Reminder notifications 
    Social leaderboard system 
    AI-based habit suggestions 
    Cloud-based data backup 
