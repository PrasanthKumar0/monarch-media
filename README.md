# EduPath Global — Education Consultancy Platform

Original education consultancy management platform with a React 19 frontend and Node.js/Express/MongoDB backend.

## Stack

- **Frontend:** React 19, Vite, React Router, Tailwind CSS v4, Framer Motion, Redux Toolkit, Axios, React Hook Form
- **Backend:** Express 5, MongoDB, Mongoose, JWT, bcrypt, Multer, Nodemailer, Cloudinary

## Quick start (local)

### Prerequisites

- Node.js 20+
- MongoDB running locally (or use Docker Compose)

### Backend

```bash
cd server
cp .env.example .env
npm install
npm run dev
```

Seed demo data:

```bash
npm run seed
```

**Demo accounts**

| Role    | Email                 | Password     |
|---------|-----------------------|--------------|
| Admin   | admin@edupath.global  | Admin@12345  |
| Student | demo@student.com      | Student@123  |

### Frontend

```bash
cd client
cp .env.example .env
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173). The Vite dev server proxies `/api` to port 5000.

## Docker

From the repository root:

```bash
docker compose up --build
```

- App: [http://localhost:8080](http://localhost:8080)
- API: [http://localhost:5000/api/health](http://localhost:5000/api/health)

Run seed inside the server container after first boot:

```bash
docker compose exec server node src/scripts/seed.js
```

## Project structure

```
client/          React SPA (public site + dashboards)
server/          REST API, models, auth, uploads
docker-compose.yml
```

## API overview

| Area           | Base path              |
|----------------|------------------------|
| Auth           | `/api/auth`            |
| Universities   | `/api/universities`    |
| Countries      | `/api/countries`       |
| Courses        | `/api/courses`         |
| Blogs          | `/api/blogs`           |
| Applications   | `/api/applications`    |
| Students       | `/api/students`        |
| Contact        | `/api/contact`         |
| Reviews/Settings | `/api/reviews`, `/api/settings` |

Admin-only routes require `Authorization: Bearer <token>` with an `admin` role.

## Production notes

- Set strong `JWT_SECRET` and configure `MONGODB_URI`
- Configure SMTP variables for contact email delivery
- Configure Cloudinary for cloud media uploads (otherwise files are served from `/uploads`)
- Build client: `npm run build` and serve `dist/` behind nginx or the provided Dockerfile

## License

Proprietary — created as an original implementation for education consultancy workflows.
