# TaleHub 📖

A modern, full-stack MERN blogging platform designed to empower readers, writers, and thinkers. Complete with complex state interactions, micro-animations, real-time feedback, and secure author dashboards.



## 🌟 Key Features

* **Secure Authentication Flow**: Fully encrypted JSON Web Token (JWT) session generation, login, signup, and logout.
* **Author Dashboard**: Navigate to **My Stories** to exclusively map out, measure, and interact with the blogs you've specifically created.
* **Interactive Timeline Experience**: Instantly like blogs with UI-scaled animations powered by native generic transition properties. 
* **Conversational Interaction**: Deeply nested comment & reply architectures beneath every post allowing the community to safely participate.
* **Streamlined UI & Global Toasters**: An aesthetically stunning tailwind layout complemented by instantaneous `react-hot-toast` notifications indicating exact background responses without disruptive reload events.

## 🛠️ Technology Stack

* **Frontend**: React, Tailwind CSS, Headless UI, React Router Dom, Axios, React Hot Toast
* **Backend**: Node.js, Express.js
* **Database**: MongoDB (Mongoose ORM)
* **Auth**: JSON Web Tokens (JWT)

## 🚀 Getting Started

### Prerequisites
Make sure you have Node.js and MongoDB installed on your local machine.

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/RajDanish03/TaleHub-.git
   cd TaleHub-
   ```

2. **Setup the Server**
   ```bash
   cd Server
   npm install
   # Create a .env file and add your MongoDB connection string
   npm run dev 
   ```

3. **Setup the Client**
   ```bash
   cd ../Client
   npm install
   npm run dev
   ```

The application will be running seamlessly between port `5000` (Backend) and the fast development Vite server!

## 🤝 Contributing
Contributions, issues, and feature requests are always welcome! Feel free to check the issues page.
