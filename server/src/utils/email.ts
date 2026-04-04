import nodemailer from 'nodemailer'
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { join, dirname } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const TEMPLATES_DIR = join(__dirname, '..', 'Templates')
const LOGO_PATH = join(__dirname, '..', 'static', 'logo', 'logo_trans_background.png')

const LOGO_ATTACHMENT = {
  filename: 'logo.png',
  path: LOGO_PATH,
  cid: 'logo',
}

function loadTemplate(filename: string, vars: Record<string, string>): string {
  let html = readFileSync(join(TEMPLATES_DIR, filename), 'utf-8')
  for (const [key, value] of Object.entries(vars)) {
    html = html.replaceAll(`{{${key}}}`, value)
  }
  return html
}

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false, // TLS via STARTTLS on port 587
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

const FROM = `"${process.env.SMTP_FROM_NAME}" <${process.env.SMTP_FROM_EMAIL}>`
const ADMIN_EMAIL = process.env.SMTP_USER!
const YEAR = new Date().getFullYear().toString()

// ── Booking submitted ────────────────────────────────────────────────────────

export async function sendBookingAcknowledgement(booking: {
  id: string
  name: string
  email: string
  service: string
  dateTime: string
  phone: string
  address: string
  notes?: string | null
}) {
  const notesRow = booking.notes
    ? `<tr><td style="padding:10px 20px;font-size:14px;color:#777777;vertical-align:top;">Notes</td><td style="padding:10px 20px 10px 0;font-size:14px;color:#333333;">${booking.notes}</td></tr>`
    : ''

  const html = loadTemplate('BookingConfirmation.html', {
    CLIENT_NAME: booking.name,
    BOOKING_ID:  booking.id,
    SERVICE:     booking.service,
    DATE_TIME:   booking.dateTime,
    PHONE:       booking.phone,
    ADDRESS:     booking.address,
    NOTES_ROW:   notesRow,
    YEAR,
  })

  await transporter.sendMail({
    from: FROM,
    to: booking.email,
    subject: 'Booking Request Received – SES Homecare & Medical Supplies',
    html,
    attachments: [LOGO_ATTACHMENT],
  })
}

export async function sendAdminBookingNotification(booking: {
  id: string
  name: string
  email: string
  service: string
  dateTime: string
  phone: string
  address: string
  notes?: string | null
}) {
  const notesRow = booking.notes
    ? `<tr style="background-color:#e8f2ee;"><td style="padding:10px 20px;font-size:14px;color:#777777;vertical-align:top;">Notes</td><td style="padding:10px 20px 10px 0;font-size:14px;color:#333333;">${booking.notes}</td></tr>`
    : ''

  const html = loadTemplate('BookingAdminNotification.html', {
    CLIENT_NAME:  booking.name,
    CLIENT_EMAIL: booking.email,
    BOOKING_ID:   booking.id,
    SERVICE:      booking.service,
    DATE_TIME:    booking.dateTime,
    PHONE:        booking.phone,
    ADDRESS:      booking.address,
    NOTES_ROW:    notesRow,
    YEAR,
  })

  await transporter.sendMail({
    from: FROM,
    to: ADMIN_EMAIL,
    subject: `New Booking Request – ${booking.name} (${booking.service})`,
    html,
    attachments: [LOGO_ATTACHMENT],
  })
}

// ── Booking confirmed ────────────────────────────────────────────────────────

export async function sendBookingConfirmed(booking: {
  id: string
  name: string
  email: string
  service: string
  dateTime: string
}) {
  const html = loadTemplate('BookingConfirmed.html', {
    CLIENT_NAME: booking.name,
    BOOKING_ID:  booking.id,
    SERVICE:     booking.service,
    DATE_TIME:   booking.dateTime,
    YEAR,
  })

  await transporter.sendMail({
    from: FROM,
    to: booking.email,
    subject: 'Your Booking is Confirmed – SES Homecare & Medical Supplies',
    html,
    attachments: [LOGO_ATTACHMENT],
  })
}

// ── Feedback receipt ─────────────────────────────────────────────────────────

export async function sendFeedbackReceiptEmail(feedback: {
  name: string
  email: string
  rating: number
  message: string
  service?: string | null
}) {
  const stars = '★'.repeat(feedback.rating) + '☆'.repeat(5 - feedback.rating)
  const serviceSection = feedback.service ? ` with <strong>${feedback.service}</strong>` : ''

  const html = loadTemplate('FeedbackReceipt.html', {
    CLIENT_NAME:     feedback.name,
    SERVICE_SECTION: serviceSection,
    RATING_STARS:    stars,
    MESSAGE:         feedback.message,
    YEAR,
  })

  await transporter.sendMail({
    from: FROM,
    to: feedback.email,
    subject: 'Thank You for Your Feedback – SES Homecare & Medical Supplies',
    html,
    attachments: [LOGO_ATTACHMENT],
  })
}

/** @deprecated use sendBookingAcknowledgement instead */
export const sendConfirmationEmail = sendBookingAcknowledgement

