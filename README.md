# TellMeo

**TellMeo** is an intelligent task planner and management tool with a voice chatbot interface. The platform integrates with Google Calendar to fetch and display events, allows users to add tasks, and provides real-time reminders. Additionally, it features an AI chat interface powered by OpenAI to assist users with their queries.

## Features

- **User Authentication and Authorization**: Secure login and registration system.
- **Task Management**: Create, Read, Update, and Delete (CRUD) operations for tasks.
- **Google Calendar Integration**: Fetch and display calendar events.
- **Real-Time Reminders**: Get notified about your tasks in real-time.
- **AI Chatbot Interface**: Powered by OpenAI to assist users with their queries.
- **Responsive and User-Friendly UI**: Accessible on various devices and screen sizes.

## Technologies and Tools

- **Frontend**: React
- **Backend**: Node.js
- **Database**: MongoDB
- **AI**: OpenAI API
- **Calendar Integration**: Google Calendar API
- **Authentication**: JWT (JSON Web Token)

## Directory Structure

```
/jarvis
├── .env
├── .gitignore
├── /jarvis-ui (React frontend)
│   ├── /public
│   │   └── index.html
│   ├── /src
│   │   ├── /components
│   │   │   ├── TaskList.js
│   │   │   ├── AddTask.js
│   │   │   ├── CustomCard.js
│   │   │   ├── Header.js
│   │   │   ├── Chat.js
│   │   ├── /pages
│   │   │   ├── Home.js
│   │   │   ├── Calendar.js
│   │   │   ├── Chat.js
│   │   │   ├── Login.js
│   │   │   ├── Register.js
│   │   ├── /context
│   │   │   ├── AuthContext.js
│   │   ├── App.js
│   │   ├── api.js
│   │   ├── index.js
├── server.js (Node.js server)
├── package.json
├── /models
│   ├── User.js
│   ├── Chat.js
├── /routes
│   ├── auth.js
│   ├── tasks.js
│   ├── events.js
│   ├── interactions.js
├── /middleware
│   └── auth.js
```


## Getting Started

### Prerequisites

- Node.js
- MongoDB
- Google Cloud account with Calendar API enabled
- OpenAI API key

### Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/EsanRAHIMI/TellMeo.git
    cd TellMeo
    ```

2. **Install dependencies for the backend:**

    ```bash
    npm install
    ```

3. **Install dependencies for the frontend:**

    ```bash
    cd jarvis-ui
    npm install
    ```

4. **Create a `.env` file in the root directory and add the following variables:**

    ```plaintext
    MONGODB_URI='your_mongodb_uri'
    OPENAI_API_KEY='your_openai_api_key'
    GOOGLE_CLIENT_ID='your_google_client_id'
    GOOGLE_CLIENT_SECRET='your_google_client_secret'
    OPENAI_ORGANIZATION_ID='your_openai_organization_id'
    OPENAI_PROJECT_ID='your_openai_project_id'
    JWT_SECRET='your_jwt_secret'
    ```

### Running the Application

1. **Start the backend server:**

    ```bash
    npm start
    ```

2. **Start the frontend development server:**

    ```bash
    cd jarvis-ui
    npm start
    ```

### Usage

1. Open your browser and navigate to `http://localhost:3000`.
2. Register a new account or log in with an existing account.
3. Add, edit, or delete tasks.
4. Integrate with Google Calendar to fetch and display events.
5. Use the AI chatbot for assistance.

## Contributing

We welcome contributions to enhance TellMeo! Follow these steps to contribute:

1. Fork the repository.
2. Create your feature branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

**Esan** - EhsanRahimi@live.com

Project Link: [https://github.com/EsanRAHIMI/TellMeo](https://github.com/EsanRAHIMI/TellMeo)

![Project Views](https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https://github.com/EsanRAHIMI/TellMeo&count_bg=%2379C83D&title_bg=%23555555&icon=&icon_color=%23E7E7E7&title=Project+Views&edge_flat=false)
