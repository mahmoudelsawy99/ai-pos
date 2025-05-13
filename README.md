# POS System

A modern Point of Sale (POS) system built with Angular, Tailwind CSS, and JSON Server.

## Features

- 🛍️ Product Management
- 👥 Customer Management
- 💰 POS/Cart System
- 📊 Inventory Management
- 📈 Sales Reports
- 🌐 Multi-language Support (English/Arabic)
- 🌓 Dark/Light Theme
- 🎨 Modern UI with Tailwind CSS

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- Angular CLI
- JSON Server

## Installation

1. Clone the repository:
```bash
git clone [your-repository-url]
cd pos-system
```

2. Install dependencies:
```bash
npm install
```

3. Start the JSON Server (in the server directory):
```bash
cd server
npm install -g json-server
json-server --watch db.json
```

4. Start the Angular application (in a new terminal):
```bash
ng serve
```

5. Open your browser and navigate to `http://localhost:4200`

## Development

- Run `ng serve` for a dev server
- Run `ng build` to build the project
- Run `ng test` to execute unit tests

## Deployment

The application can be deployed to various platforms:

1. **GitHub Pages**:
```bash
ng deploy --base-href=/pos-system/
```

2. **Netlify**:
- Connect your GitHub repository to Netlify
- Set build command: `ng build`
- Set publish directory: `dist/pos-system`

3. **Vercel**:
- Connect your GitHub repository to Vercel
- Set build command: `ng build`
- Set output directory: `dist/pos-system`

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
