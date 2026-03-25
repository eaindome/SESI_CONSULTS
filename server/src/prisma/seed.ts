import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Create default admin user
  const hashedPassword = await bcrypt.hash('admin123', 10)

  const admin = await prisma.admin.upsert({
    where: { email: 'admin@sesi.com' },
    update: {},
    create: {
      email: 'admin@sesi.com',
      password: hashedPassword,
      name: 'Admin User',
    },
  })

  console.log('✅ Created admin user:', admin.email)

  // Create initial services
  const services = [
    {
      name: 'General Nursing Care',
      description: 'Comprehensive nursing care including wound dressing, medication administration, and vital signs monitoring.',
      price: 'Contact for pricing',
      features: ['Wound Care', 'Medication Management', 'Health Monitoring', '24/7 Support'],
      displayOrder: 1,
    },
    {
      name: 'Injection Services',
      description: 'Professional injection services administered by qualified nurses at your home.',
      price: 'GHS 50-100',
      features: ['IV Injections', 'IM Injections', 'Subcutaneous Injections', 'Sterile Technique'],
      displayOrder: 2,
    },
    {
      name: 'Post-Operative Care',
      description: 'Specialized post-surgical care to ensure smooth recovery at home.',
      price: 'Contact for pricing',
      features: ['Surgical Site Care', 'Pain Management', 'Mobility Assistance', 'Recovery Monitoring'],
      displayOrder: 3,
    },
    {
      name: 'Chronic Disease Management',
      description: 'Ongoing care and support for patients with chronic conditions.',
      price: 'Monthly plans available',
      features: ['Diabetes Management', 'Hypertension Care', 'Regular Check-ups', 'Lifestyle Guidance'],
      displayOrder: 4,
    },
    {
      name: 'Elderly Care',
      description: 'Compassionate care for seniors, ensuring comfort and dignity.',
      price: 'Contact for pricing',
      features: ['Daily Living Assistance', 'Companionship', 'Medication Reminders', 'Nutrition Support'],
      displayOrder: 5,
    },
    {
      name: 'Maternal & Child Care',
      description: 'Specialized care for mothers and children during critical periods.',
      price: 'Contact for pricing',
      features: ['Postnatal Care', 'Newborn Care', 'Breastfeeding Support', 'Child Health Monitoring'],
      displayOrder: 6,
    },
  ]

  for (const service of services) {
    await prisma.service.upsert({
      where: { name: service.name },
      update: {},
      create: service,
    })
  }

  console.log('✅ Created', services.length, 'services')

  console.log('🎉 Seeding completed!')
  console.log('\n📝 Default Admin Credentials:')
  console.log('   Email: admin@sesi.com')
  console.log('   Password: admin123')
  console.log('\n⚠️  Please change the password after first login!\n')
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
