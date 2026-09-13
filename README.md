<div align="center">
    <h1>
        Flatmate Finder 
    </h1>
    <p>
        <a href="https://skillicons.dev">
            <img src="https://skillicons.dev/icons?i=react,ts,tailwind,vite,vitest,firebase,github,vercel" /><br>
        </a>
    </p>
    <h5>
        <a href='https://flatmate-finder-devongifford.vercel.app/', target='_blank'>
            live demo ↗
        <a/>
    </h5>
</div>

<br>

<!-- -------------------------------------------------------------------------- -->

### Brief Introduction
----
Flatmate Finder is a small full-stack application for collecting and reviewing flatmate applications. <br/>
Prospective flatmates submit an application through a simple form, with responses stored in Firebase. Current tenants can then review, rank, and compare applicants through a swipe-based interface inspired by Tinder.  The project is currently hosted as a demo and uses a shared-password setup rather than production-grade authentication or privacy controls.

<br/>
<br/>


### Application Flow
---

Flatmate Finder has two primary user flows: prospective flatmates submit applications, while current tenants review and rank them. Both flows share the same React frontend and Firestore data layer.

```text
┌──────────────────────┐                  ┌──────────────────────┐
│  Prospective Tenant  │                  │   Current Tenants    │
│   Application Form   │                  │  Swipe · Rate · Rank │
└──────────┬───────────┘                  └──────────┬───────────┘
           │                                         │
           └───────────────┐         ┌───────────────┘
                           ▼         ▼
                    ┌──────────────────────┐
                    │     React / Vite     │
                    │    Flatmate Finder   │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │      Firestore       │
                    │ applicants / ratings │
                    └──────────────────────┘
```

<br/>
<br/>


<!-- -------------------------------------------------------------------------- -->

### Running Locally
----
While you can explore the [live demo](https://flatmate-finder-devongifford.vercel.app/), you also have the option to clone and run the application on your local machine.

<details>
<summary>Click here to expand</summary>

#### Prerequisites

Before getting started, make sure you have Node.js installed on your machine. You can download it from [here](https://nodejs.org/).

#### Installation Steps

1. **Clone the Repository:**
   ```bash
   git clone git@github.com:DevonGifford/FlatmateFinder.git
   ```

2. **Install Dependencies:**
   ```bash
   cd FlatmateFinder
   npm install
   ```

3. **Configure the environment:**
   ```bash
   cp .env.example .env
   ```
   Fill in the Firebase credentials and shared passwords in `.env`. The required variables are
   documented inline in [.env.example](.env.example). Never commit `.env` or real passwords.

4. **Run the Application:**
   ```bash
   npm run dev
   ```

   This command will start the development server, and you can access the application locally at [http://localhost:5173](http://localhost:5173).

#### Notes

- Firebase is the live data source for the application; the test suite uses its own in-memory fixtures and does not contact Firestore.
- Before deploying, enable Firebase Authentication's Anonymous provider and deploy the versioned
  rules with `firebase deploy --only firestore:rules`. See [docs/SECURITY.md](docs/SECURITY.md) for
  the exact security model and its limitations.
- `npm run typecheck` runs the TypeScript check independently. Lefthook installs a pre-push gate
  for lint, type-check, and the one-shot test suite; CI runs those checks plus the production build.
- If you encounter any issues during installation, please check the [Issues](link-to-your-issues-page) page for existing solutions or create a new issue if needed.

<!-- CLOSING DIV -->
</details>
<br/>
