# SESI Consults Server

A robust and scalable RESTful API for managing consultation bookings and services, built with Fastify, TypeScript, and PostgreSQL.

## 🚀 Features

- **Fast & Efficient**: Built on Fastify, one of the fastest Node.js frameworks
- **Type-Safe**: Full TypeScript implementation for enhanced developer experience
- **Database**: PostgreSQL with Prisma ORM for type-safe database access
- **Validation**: Automatic request validation using JSON Schema
- **Email Notifications**: Automated confirmation emails for bookings
- **Production Ready**: Deployed on Render with CI/CD pipeline

## 📋 Prerequisites

- Node.js 18+
- PostgreSQL database
- npm or yarn

## 🛠️ Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/eaindome/SESI_CONSULTS.git
   cd SESI_CONSULTS/server
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:

   ```env
   PORT=3000
   DATABASE_URL=postgresql://user:password@localhost:5432/database_name
   NODE_ENV=development
   ```

4. **Run database migrations**

   ```bash
   npx prisma migrate deploy
   ```

5. **Generate Prisma Client**

   ```bash
   npx prisma generate
   ```

## 🏃 Running the Application

### Development Mode

```bash
npm run dev
```

The server will start at `http://localhost:3000` with hot-reloading enabled.

### Production Build

```bash
# Build TypeScript
npm run build

# Start production server
npm start
```

## 📚 API Documentation

### Quick Start

**Base URL**: `http://localhost:3000` (development) or your production URL

### Available Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | API welcome and information |
| GET | `/health` | Health check |
| GET | `/docs` | API documentation |
| POST | `/bookings` | Create a new booking |
| GET | `/bookings` | Get all bookings |
| GET | `/services` | Get all services |

### Example: Create a Booking

```bash
curl -X POST http://localhost:3000/bookings \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "phone": "+1234567890",
    "email": "john@example.com",
    "serviceId": "your-service-id",
    "date": "2026-02-15",
    "time": "14:30",
    "notes": "First consultation"
  }'
```

**For complete API documentation, visit `/docs` endpoint or see [API_DOCUMENTATION.md](docs/API_DOCUMENTATION.md)**

## 🗄️ Database Schema

### Booking

- `id`: UUID (Primary Key)
- `name`: String - Client name
- `phone`: String - Contact number
- `email`: String (Optional) - Email address
- `date`: String - Booking date
- `time`: String - Booking time
- `notes`: String (Optional) - Additional notes
- `status`: Enum - PENDING | CONFIRMED | COMPLETED
- `serviceId`: UUID (Foreign Key)
- `createdAt`: DateTime

### Service

- `id`: UUID (Primary Key)
- `name`: String - Service name
- `createdAt`: DateTime

## 🧪 Testing

```bash
npm test
```

## 📁 Project Structure

```bash
server/
├── prisma/
│   ├── schema.prisma       # Database schema
│   └── migrations/         # Database migrations
├── src/
│   ├── controllers/        # Request handlers
│   ├── plugins/            # Fastify plugins
│   ├── routes/             # Route definitions
│   ├── schemas/            # Validation schemas
│   ├── services/           # Business logic
│   ├── utils/              # Utility functions
│   ├── app.ts              # App configuration
│   └── server.ts           # Server entry point
├── docs/                   # Documentation
├── dist/                   # Compiled JavaScript (generated)
├── package.json
└── tsconfig.json
```

## 🚢 Deployment

### Deploy to Render

1. **Create a PostgreSQL database** on Render

2. **Create a Web Service** with the following settings:
   - **Root Directory**: `server`
   - **Build Command**: `npm install && npm run build && npx prisma migrate deploy`
   - **Start Command**: `npm start`

3. **Set Environment Variables**:
   - `DATABASE_URL`: Your PostgreSQL connection string
   - `NODE_ENV`: `production`

4. **Enable Auto-Deploy** from your main branch

The application will automatically deploy on every push to the main branch.

## 🔧 Development Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server with hot-reload |
| `npm run build` | Compile TypeScript to JavaScript |
| `npm start` | Start production server |
| `npm test` | Run tests |

## 🌐 Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `PORT` | Server port | No | 3000 |
| `DATABASE_URL` | PostgreSQL connection string | Yes | - |
| `NODE_ENV` | Environment mode | No | development |

## 🔐 Security Considerations

- CORS is currently enabled for all origins (configure for production)
- No authentication implemented yet (add for production)
- Rate limiting not configured (recommended for production)
- Input validation via JSON Schema

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

ISC

## 👥 Authors

SESI Consults Development Team

## 📧 Support

For support, email your-email@example.com or open an issue in the repository.

---

**Built with ❤️ using Fastify and TypeScript**
