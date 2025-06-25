# React + Vite + Tailwind CSS Project

This project was set up with the latest versions of React, Vite, and Tailwind CSS following 2025 best practices.

## 🛠️ Tech Stack

- **React** 19.1.0 - Latest stable React version with modern features
- **Vite** 7.0.0 - Ultra-fast build tool and dev server
- **Tailwind CSS** 3.4.0 - Utility-first CSS framework
- **PostCSS** & **Autoprefixer** - CSS processing tools

## 🚀 Getting Started

### Prerequisites
- Node.js 20.19+ or 22.12+ (required for Vite 7)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

## 📦 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎨 Tailwind CSS Setup

Tailwind CSS is configured with:
- Content paths for all React components (`./src/**/*.{js,ts,jsx,tsx}`)
- PostCSS integration for processing
- Full utility classes available

### Example Usage

```jsx
// Button with Tailwind classes
<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
  Click me
</button>

// Responsive card
<div className="max-w-md mx-auto bg-white rounded-xl shadow-md p-6">
  <h1 className="text-2xl font-bold text-gray-800">Card Title</h1>
  <p className="text-gray-600">Card content goes here</p>
</div>
```

## 🔧 Configuration Files

- `tailwind.config.js` - Tailwind configuration
- `postcss.config.js` - PostCSS configuration
- `vite.config.js` - Vite configuration

## 📁 Project Structure

```
my-react-app/
├── public/
├── src/
│   ├── assets/
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── vite.config.js
```

## 🌟 Features

- ⚡ Lightning-fast HMR (Hot Module Replacement)
- 🎨 Full Tailwind CSS utility classes
- 📱 Responsive design ready
- 🚀 Optimized production builds
- 🛠️ Modern development experience

## 🚀 Building for Production

```bash
npm run build
```

The build files will be generated in the `dist/` directory.

## 📚 Learn More

- [Vite Documentation](https://vite.dev/)
- [React Documentation](https://react.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)

---

**Happy coding! 🎉**
