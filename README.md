# WINTECH PROJECT SDN. BHD. Website

A modern, professional React.js website for WINTECH PROJECT SDN. BHD., a CIDB-registered G5 contractor based in Kuala Lumpur.

## Tech Stack

- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Express.js** - Backend server with REST API
- **React Context API** - For language management

## Features

- **Bright & Professional Design**: Modern gradient-based design with clean, professional aesthetics
- **Bilingual Support**: English and Bahasa Malaysia (BM) language toggle with persistent storage
- **CIDB Credentials**: Prominently displayed registration and compliance information
- **Responsive Design**: Fully responsive, works on all devices (desktop, tablet, mobile)
- **Smooth Animations**: Subtle fade-in animations and smooth scrolling
- **Service Categories**: Showcases all four service categories (Building, Civil Engineering, M&E, Facility Management)
- **Contact Form**: Functional contact form with email integration

## Project Structure

```
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Hero.jsx
│   │   ├── Credentials.jsx
│   │   ├── About.jsx
│   │   ├── Services.jsx
│   │   ├── ServiceArea.jsx
│   │   ├── Contact.jsx
│   │   ├── ContactForm.jsx
│   │   └── Footer.jsx
│   ├── context/
│   │   └── LanguageContext.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── server/
│   ├── routes/
│   │   └── contact.js
│   ├── index.js
│   └── package.json
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── vite.config.js
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install all dependencies (frontend and backend):
```bash
npm run install:all
```

Or install separately:
```bash
# Frontend
npm install

# Backend
cd server && npm install
```

2. Set up environment variables:
```bash
# Copy the example file
cp env.example server/.env

# Edit server/.env with your email configuration
```

### Running the Application

#### Development Mode

**Option 1: Run both frontend and backend separately**

Terminal 1 (Frontend):
```bash
npm run dev
```

Terminal 2 (Backend):
```bash
npm run server:dev
```

**Option 2: Use a process manager (recommended for production)**

The frontend will run on `http://localhost:5173` and the backend API on `http://localhost:4001`.

#### Production Mode

1. Build the React app:
```bash
npm run build
```

2. Start the production server:
```bash
npm run server
```

The server will serve the built React app and handle API requests on port 4001.

### Build for Production

```bash
npm run build
```

The production build will be in the `dist` folder.

## Server Configuration

### Email Setup (for Contact Form)

1. Copy `env.example` to `server/.env`
2. Configure your SMTP settings:
   - For Gmail: Use an App Password (not your regular password)
   - Generate App Password at: https://myaccount.google.com/apppasswords
3. Update the `.env` file with your credentials

### API Endpoints

- `GET /api/health` - Server health check
- `POST /api/contact` - Submit contact form
  - Body: `{ name, email, phone?, subject, message }`
  - Returns: `{ success: boolean, message: string }`

## Components

- **Navbar**: Sticky navigation with mobile menu and language toggle
- **Hero**: Eye-catching introduction with company tagline and stats
- **Credentials**: CIDB registration details and compliance badges
- **About**: Company description and key features
- **Services**: Four service categories with descriptions
- **ServiceArea**: Geographic coverage information
- **Contact**: Company information and contact form
- **Footer**: Copyright and company information

## Language Support

The website supports both English and Bahasa Malaysia. The language preference is saved in localStorage and persists across sessions.

## Customization

### Colors

Edit the color scheme in `tailwind.config.js`:

```js
colors: {
  primary: {
    DEFAULT: '#0066CC',
    dark: '#0052A3',
  },
  secondary: '#00A651',
  accent: '#FFD700',
}
```

### Content

Update translations in `src/context/LanguageContext.jsx` in the `translations` object.

### Styling

All styling uses Tailwind CSS utility classes. Modify component files to change styles.

## Deployment

### Option 1: Deploy Frontend and Backend Separately

- **Frontend**: Deploy the `dist` folder to services like Vercel, Netlify, or GitHub Pages
- **Backend**: Deploy the `server` folder to services like Heroku, Railway, or DigitalOcean

### Option 2: Deploy as Full-Stack Application

The production server serves both the React app and API. Deploy the entire project to:
- Heroku
- Railway
- DigitalOcean App Platform
- AWS Elastic Beanstalk

Make sure to set environment variables in your hosting platform.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Notes

- All CIDB information is displayed as provided
- Language toggle switches between English and Bahasa Malaysia
- Mobile menu activates automatically on smaller screens
- Smooth scrolling navigation between sections
- Active section highlighting in navigation
- Contact form requires email configuration to send emails

## License

© 2024 WINTECH PROJECT SDN. BHD. All rights reserved.
