# 🎓 UniConnect

**UniConnect** is a MERN-based web platform designed to connect **students and alumni** of a university. It enables real-time interactions, collaborative coding, and mentoring. The platform supports **Google Authentication**, features a powerful **browser-based code editor** using Monaco, and uses the **Piston API** to execute code in multiple languages right from the browser.

---

## 🚀 Features

- 🔐 **Google OAuth Authentication** for secure login
- 🧑‍🎓 🧑‍🏫 Connect students with alumni for mentorship and collaboration
- 💬 Real-time chat and discussions
- 💻 **Monaco Editor** integration for coding in the browser
- ⚙️ **Piston API** integration to compile & run code in various languages
- 🗂️ Role-based dashboards (student/alumni)
- 🏆 Coding competitions & leaderboards
- 📨 Contact alumni or schedule mentoring sessions
- 🌐 Responsive UI with intuitive UX

---

## 🛠️ Tech Stack

| Layer         | Technology                         |
|---------------|------------------------------------|
| **Frontend**  | React, Tailwind CSS, Monaco Editor |
| **Backend**   | Node.js, Express.js, MongoDB       |
| **Auth**      | Google OAuth (with JWT)            |
| **Code Exec** | Piston API                         |
| **Editor**    | Monaco Editor                      |
| **DB**        | MongoDB with Mongoose              |

---

## 🖥️ Setup & Installation

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/UniConnect.git
cd UniConnect




# For both client and server folders
cd backend && npm install
cd ../frontend && npm install




.env make it yourself in /backend


PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret



Start the development servers

bash
Copy
Edit
# In one terminal
cd backend
npm run dev

# In another terminal
cd frontend
npm start
