# SESI Consults API Documentation

## Overview

SESI Consults API is a RESTful service built with Fastify and TypeScript that manages booking consultations and services. The API provides endpoints for creating bookings, retrieving booking information, and managing services.

## Technology Stack

- **Runtime**: Node.js
- **Framework**: Fastify 5.x
- **Language**: TypeScript
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Validation**: Fastify JSON Schema

## Base URL

- **Production**: `https://your-app.onrender.com`
- **Development**: `http://localhost:3000`

---

## Authentication

Currently, the API does not require authentication. All endpoints are publicly accessible.

---

## Endpoints

### Root

**GET /**
Welcome endpoint providing API information and available routes.

**Response:**

```json
{
  "message": "Welcome to SESI Consults API",
  "version": "1.0.0",
  "endpoints": {
    "health": "/health",
    "bookings": "/bookings",
    "services": "/services"
  }
}
```

---

### Health Check

**GET /health**
Check if the API is running.

**Response:**

```json
{
  "status": "ok"
}
```

---

### Bookings

#### Create Booking

**POST /bookings**
Create a new booking for a consultation service.

**Request Body:**

```json
{
  "name": "John Doe",
  "phone": "+1234567890",
  "email": "john@example.com",
  "serviceId": "uuid-of-service",
  "date": "2026-02-15",
  "time": "14:30",
  "notes": "Optional notes"
}
```

**Required Fields:**

- `name` (string): Client's full name
- `phone` (string): Contact phone number
- `serviceId` (string): UUID of the service being booked
- `date` (string): Booking date in YYYY-MM-DD format
- `time` (string): Booking time in HH:mm format

**Optional Fields:**

- `email` (string): Client's email address
- `notes` (string): Additional information or requests

**Response:** `201 Created`

```json
{
  "id": "booking-uuid",
  "name": "John Doe",
  "phone": "+1234567890",
  "email": "john@example.com",
  "serviceId": "service-uuid",
  "date": "2026-02-15",
  "time": "14:30",
  "notes": "Optional notes",
  "status": "PENDING",
  "createdAt": "2026-01-28T10:30:00.000Z"
}
```

**Status Values:**

- `PENDING`: Booking created, awaiting confirmation
- `CONFIRMED`: Booking confirmed by admin
- `COMPLETED`: Service has been completed

**Error Responses:**

- `400 Bad Request`: Invalid input data
- `404 Not Found`: Service ID does not exist
- `500 Internal Server Error`: Server error

---

#### Get All Bookings

**GET /bookings**
Retrieve all bookings ordered by creation date (newest first).

**Response:** `200 OK`

```json
[
  {
    "id": "booking-uuid-1",
    "name": "John Doe",
    "phone": "+1234567890",
    "email": "john@example.com",
    "serviceId": "service-uuid",
    "date": "2026-02-15",
    "time": "14:30",
    "notes": "Optional notes",
    "status": "PENDING",
    "createdAt": "2026-01-28T10:30:00.000Z"
  },
  {
    "id": "booking-uuid-2",
    "name": "Jane Smith",
    "phone": "+0987654321",
    "email": null,
    "serviceId": "service-uuid-2",
    "date": "2026-02-16",
    "time": "09:00",
    "notes": null,
    "status": "CONFIRMED",
    "createdAt": "2026-01-27T15:20:00.000Z"
  }
]
```

---

### Services

#### Get All Services

**GET /services**
Retrieve all available consultation services.

**Response:** `200 OK`

```json
[
  {
    "id": "service-uuid-1",
    "name": "Business Consultation",
    "createdAt": "2026-01-20T08:00:00.000Z"
  },
  {
    "id": "service-uuid-2",
    "name": "Legal Consultation",
    "createdAt": "2026-01-20T08:00:00.000Z"
  }
]
```

---

## Data Models

### Booking

```typescript
{
  id: string          // UUID
  name: string        // Client name
  phone: string       // Contact number
  email?: string      // Optional email
  date: string        // Booking date
  time: string        // Booking time
  notes?: string      // Optional notes
  status: 'PENDING' | 'CONFIRMED' | 'COMPLETED'
  serviceId: string   // Foreign key to Service
  createdAt: Date     // Timestamp
}
```

### Service

```typescript
{
  id: string          // UUID
  name: string        // Service name
  createdAt: Date     // Timestamp
}
```

---

## Error Handling

All errors follow a standard format:

```json
{
  "statusCode": 400,
  "error": "Bad Request",
  "message": "Detailed error message"
}
```

**Common Status Codes:**

- `200` - Success
- `201` - Created
- `400` - Bad Request (validation error)
- `404` - Not Found
- `500` - Internal Server Error

---

## Rate Limiting

Currently, no rate limiting is implemented.

---

## CORS

CORS is enabled for all origins in development. Configure appropriately for production.

---

## Email Notifications

When a booking is created, a confirmation email is sent to the client (if email is provided). Email functionality is currently logged to console and needs integration with an email service provider (Resend, SendGrid, etc.).

---

## Environment Variables

Required environment variables:

```env
PORT=3000                    # Server port
DATABASE_URL=postgresql://... # PostgreSQL connection string
NODE_ENV=development         # Environment (development/production)
```

---

## Development

### Running Locally

```bash
# Install dependencies
npm install

# Run database migrations
npx prisma migrate deploy

# Start development server
npm run dev
```

### Building for Production

```bash
# Compile TypeScript
npm run build

# Start production server
npm start
```

---

## Support

For questions or issues, please contact the development team.

---

**Last Updated:** January 28, 2026
**API Version:** 1.0.0
