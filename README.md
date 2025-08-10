# Budgify — Personal Finance Dashboard with Plaid

Live App: https://budgify-blue.vercel.app  
API: https://budgify-hjq2.vercel.app

Budgify is a modern, responsive personal finance web app that helps you connect your bank (Plaid), visualize spending, and review transactions. It features email/password and Google authentication, a rich dashboard with charts, and an expenses table — all wrapped in a fast Vite + React front end and a secure Node/Express API.


## Features
- Secure authentication
  - Email/password (passport-local + bcrypt)
  - Google OAuth 2.0 (passport-google-oauth2)
  - Session-based auth with secure cookies
- Plaid integration
  - Link your (sandbox) bank account via Plaid Link
  - Exchange public token for access token (server)
  - Fetch latest transactions (last 90 days)
- Rich analytics dashboard
  - Donut, bar, radial, and area charts (Recharts)
  - Animated loading states (Lottie)
- Expenses view
  - Filterable table of transactions
- Polished UI/UX
  - React 19 + Vite 6 + Tailwind CSS v4
  - Radix UI primitives, Lucide icons
  - Subtle animations (GSAP)


## Tech Stack
- Client
  - React 19, Vite 6, Tailwind CSS v4
  - Recharts, Radix UI, Lucide, Lottie, GSAP
  - React Router 7, Axios
  - Plaid Link (react-plaid-link)
- Server
  - Node.js + Express 5
  - MongoDB (official driver)
  - Passport (local + Google), express-session, helmet, cors
  - Plaid SDK


## Monorepo Structure
```
Budgify/
├─ Client/          # React app (Vite)
│  ├─ index.html
│  └─ src/
│     ├─ App.jsx
│     ├─ Pages/    # Home, Dashboard, Expenses, About, MyAccount, SignUp
│     ├─ components/ (charts, Navbar, Footer, LinkPlaid, auth cards, etc.)
│     └─ context/AuthContext.jsx
└─ Server/          # Express API
   └─ server.js     # Auth, Plaid, sessions, transactions endpoints
```


## Screenshots
- Landing/Dashboard (hero):
  - https://service.firecrawl.dev/storage/v1/object/public/media/screenshot-4dba87e4-1789-4fbb-a3b0-d53abe655297.png


## Getting Started (Local)
### Prerequisites
- Node.js 18+ and npm
- MongoDB connection string (Atlas or local)
- Plaid Sandbox account (client ID/secret)
- Google OAuth 2.0 credentials (Web app)

> Note for local development: the server is configured for secure cookies. For localhost you may need to temporarily set `cookie.secure: false` and `sameSite: "lax"` in `Server/server.js` (session config), or run behind https.

### 1) Clone the repo
```
git clone https://github.com/Shuvamdt/Budgify.git
cd Budgify
```

### 2) Server setup
```
cd Server
npm i
```
Create a `.env` in `Server/` with:
```
PORT=3000
SESSION_SECRET=your_strong_secret
MONGO_DB_CONN_STR=mongodb+srv://<user>:<pass>@<cluster>/<db>?retryWrites=true&w=majority

# Plaid (Sandbox)
PLAID_ENV=sandbox
PLAID_CLIENT_ID=your_plaid_client_id
PLAID_SECRET=your_plaid_secret
# Products used by Link token creation (comma-separated)
PLAID_PRODUCTS=transactions

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```
Start the API:
```
npm start
```
The API will run at http://localhost:3000 (adjust CORS allowlist if needed in `server.js`).

### 3) Client setup
```
cd ../Client
npm i
```
Point the client to your local API. In these files, switch the `API_URL` to `http://localhost:3000` (uncomment local and comment production):
- `src/context/AuthContext.jsx`
- `src/Pages/Dashboard.jsx`
- `src/Pages/Expenses.jsx`
- `src/Pages/MyAccount.jsx`
- `src/components/LinkPlaid.jsx`
- `src/components/CardSignIn.jsx`
- `src/components/CardSignUp.jsx`

Run the dev server:
```
npm run dev
```
The app will be available at http://localhost:5173.


## Using Plaid Sandbox
1. Go to My Account and click “Connect Bank (Plaid Sandbox)”.
2. When Plaid Link opens, use standard Sandbox credentials:
   - Username: `user_good`
   - Password: `pass_good`
   - MFA (if prompted): any valid test code (e.g., `1234`)
3. After success, you can visit Dashboard/Expenses to view charts and transactions.


## API Endpoints (Server)
Base URL (local): `http://localhost:3000`

- Auth
  - `POST /register` — body: `{ username, password, confirmPassword }` → registers and logs in
  - `POST /login` — body: `{ username, password }` → logs in
  - `GET /auth/google` — redirects to Google OAuth
  - `GET /auth/google/dashboard` — Google callback → redirects to `/dashboard`
  - `POST /logout` — destroys session
  - `GET /get-account-info` — returns `{ email, picture }` for authenticated user
- Plaid
  - `POST /create_link_token` — returns `{ link_token }` (requires authenticated session)
  - `POST /exchange_public_token` — body: `{ public_token }` → stores Plaid access token for the user
  - `GET /transactions` — returns latest transactions (last 90 days)

All endpoints that return user or financial data require an authenticated session (cookies with credentials).


## Deployment (Vercel)
- Client
  - Framework preset: Vite
  - Build: `npm run build`
  - Output: `dist`
  - ENV: none required (API base URL is hardcoded; update to your API URL in code or via env replacement before build)
- Server
  - Create a new Vercel project from `Server/`
  - Add all server `.env` variables in Vercel → Settings → Environment Variables
  - Ensure CORS allowlist in `server.js` includes your deployed client origin
  - Start command: `npm start`


## Security Notes
- Never commit credentials or secrets.
- Use long, random `SESSION_SECRET`.
- Restrict CORS to known origins only.
- Rotate Plaid and Google credentials as needed.


## Roadmap
- Categories and budgets with monthly targets
- Import/export (CSV) and smart search
- Recurring expenses detection
- Notifications (large spend, unusual activity)
- PWA/mobile optimizations


## Acknowledgments
- Plaid (Link + API)
- Recharts, Radix UI, Lucide
- Lottie, GSAP
- Tailwind CSS + Vite


## License
ISC — see `package.json` in `Server/`. If you plan to publish, consider adding a top-level `LICENSE` file.
