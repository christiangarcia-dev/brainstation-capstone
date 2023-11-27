# Project Title
EchoLingo

## Overview

EchoLingo is a cutting-edge multilingual virtual assistant designed to facilitate seamless communication and information access across multiple languages. By leveraging advanced speech-to-text and conversational AI technologies, EchoLingo aims to break down language barriers, offering users an intuitive and responsive platform for cross-lingual interactions.

### Problem

In our increasingly interconnected world, the need for effective multilingual communication tools is paramount. Traditional text-based translators or assistants often struggle with the nuances of spoken language, leading to miscommunication. EchoLingo addresses this by providing real-time, accurate voice translation and responses, enhancing understanding and engagement in diverse linguistic contexts. Moreover, EchoLingo is able to translate text documents as well as transcribe and translate voice recordings. 

### User Profile

EchoLingo targets a broad user base, including international travelers, expatriates, multilingual families, and businesses with a global clientele. Users can interact with EchoLingo to translate documents, audio recordings, their own speech, or their own text on the fly. All in their preferred language.

### Features

Transcribe: Able to convert speech recordings into properly formatted text. 
Real-Time Translation: Instant translation of spoken language into the user's chosen language by inputting their own voice, their own text, or a video / audio file with human speech. 
Speech Projection: After transcribing or translating, the users are able to listen to the content in a language of their choice. 
Multilingual Support: Support for multiple languages, with easy switching between them.

## Implementation

### Tech Stack

Frontend: React for building a dynamic, user-friendly interface.
Backend: Node.js with Express for robust server-side functionality.
Database: Firebase Firestore to simplify database operations.
Authentication: Firebase Authentication for secure user authentication and session management.
Libraries & Imports: Axios, Sass, React Router DOM, Nodemon, Cors, Dotenv, Firebase, Multer, OpenAI, Form Data. 

### APIs

Whisper API: For accurate speech-to-text conversion.
ChatGPT API: To generate intelligent and contextually appropriate text responses.
TTS API: To convert translated text to speech. 

### Sitemap

Sign In Page: Initial page upon launch for authorization and authentication. 
Sign Up Page: Page to be routed to for initial authorization and authentication. 
Translation Page: Main page where the user can input what he/she want to be translated. 
Saved Page: Final page where the user can view all of his/her saved transcriptions or translations.


### Mockups

https://www.figma.com/file/GsiVg56TIXkLaN7up4XZ3h/Christian-Garcia's-team-library?node-id=0%3A1&mode=dev

### Data

User Profiles: Basic information about users upon sign up.
Transcript Logs: Records of saved transcriptions or translations specific to the user.

### Endpoints

/api/whisper: speech-to-text (POST).
/api/chatgpt: translation (POST).
/api/tts: text-to-speech (POST).

### Auth

Using Firebase Authentication EchoLingo will implement secure authentication for user accounts. This includes login, logout, and session management, ensuring user data privacy and security.

## Roadmap

# November 16-17: Project Setup
Initialize the project structure.
Set up the React frontend and Node.js backend with Express.
Configure Passport.js for authentication.

# November 18-20: Basic Functionality
Develop basic frontend interface with React.
Implement simple backend logic for user registration and login.
Set up MySQL database with Knex.js and create basic schemas (e.g., users, interactions).

# November 21-22: API Integration
Integrate Whisper API for speech-to-text functionality.
Integrate ChatGPT API for generating responses.
Integrate TTS API for text-to-speech functionality. 

# November 23-24: Core Features Development
Implement the core features like real-time translation and voice-activated commands.
Enhance user dashboard for language settings and interaction history.

# November 25-26: Testing and Refinement
Conduct thorough testing of all functionalities.
Refine the user interface based on test feedback.
Debug and fix any identified issues.

# November 27-28: Finalization and Documentation
Make final adjustments based on testing.
Prepare comprehensive documentation for the application.
Deploy the application to a suitable hosting platform.

## Nice-to-haves

Voice Customization: Options for different voice types and accents for the assistant.
Offline Functionality: Basic offline capabilities for essential functions.
Advanced Analytics: Detailed analytics of user interactions for enhanced personalization.
Community Forum: A platform for users to share tips and language learning resources.