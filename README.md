# MatchPulse

MatchPulse is a frontend web application built with Vite. It tells the Soccer upcoming match updates.It connects to a backend service to provide its core functionality.

## Features

- Fast and modern frontend powered by Vite
- Configurable backend API URL via environment variables
- Production-ready optimized build

## Setup

### Prerequisites

- Node.js (v16 or later recommended)
- npm (comes with Node.js)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/matchpulse.git
   cd matchpulse
````

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and set your backend API URL:

   ```env
   VITE_API_BASE_URL=https://your-backend-service.onrender.com
   ```

## Development

Start the development server with hot reload:

```bash
npm run dev
```

Open your browser at `http://localhost:5173` (or the URL printed in your terminal).

## Build

Build the production optimized app:

```bash
npm run build
```

The build output will be in the `dist` directory.

## Deployment

Make sure your deployment platform is set to:

* **Build command:** `npm install && npm run build`
* **Publish directory:** `dist`
