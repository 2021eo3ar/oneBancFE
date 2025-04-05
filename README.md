# Bank Statement Processor Frontend

This is the frontend of the Bank Statement Processor built with **Vite**, **React**, and **Tailwind CSS**.

## Features

- Upload bank statement files
- Process CSVs via backend
- Download processed output
- Supports: IDFC, Axis, HDFC, ICICI & generic CSVs

## Folder Structure

```
frontend/
 ├ 📂node_modules/
 ├ 📂public/
 ├ 📂src/
 ┃ └ 📜App.jsx
 ├ 📜.gitignore
 ├ 📜index.html
 ├ 📜package.json
 ├ 📜postcss.config.js
 ├ 📜tailwind.config.js
 ├ 📜vite.config.js
 └ 📜README.md
```

## Setup Instructions

### Prerequisites
- Node.js and npm installed

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/bank-statement-processor-frontend.git
   ```

2. Install dependencies:
   ```bash
   cd frontend
   npm install
   ```

3. Create a `.env` file in the root and set:
   ```bash
   VITE_BACKEND_URL=http://localhost:5000
   ```
   *(Replace with your actual backend URL in production)*

4. Start the development server:
   ```bash
   npm run dev
   ```

## Live Link

You can access the live frontend deployment here:
[Live Frontend URL](https://one-banc-fe.vercel.app/)

## Tech Stack

- **React** (with hooks)
- **Vite** for fast development
- **Tailwind CSS** for styling
- **Axios** for API calls

## License
MIT License

