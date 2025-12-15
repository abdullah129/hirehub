import { PrismaClient, JobStatus, JobType, LocationType, Priority, InterviewType, InterviewStatus, ActivityType } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

// Pakistani tech companies data
const companies = [
  { name: 'Systems Limited', logo: 'https://logo.clearbit.com/systemsltd.com' },
  { name: '10Pearls', logo: 'https://logo.clearbit.com/10pearls.com' },
  { name: 'VentureDive', logo: 'https://logo.clearbit.com/venturedive.com' },
  { name: 'Arbisoft', logo: 'https://logo.clearbit.com/arbisoft.com' },
  { name: 'Folio3', logo: 'https://logo.clearbit.com/folio3.com' },
  { name: 'NetSol Technologies', logo: 'https://logo.clearbit.com/netsoltech.com' },
  { name: 'Techlogix', logo: 'https://logo.clearbit.com/techlogix.com' },
  { name: 'i2c Inc', logo: 'https://logo.clearbit.com/i2cinc.com' },
  { name: 'Contour Software', logo: 'https://logo.clearbit.com/contoursoftware.com' },
  { name: 'Nextbridge', logo: 'https://logo.clearbit.com/nextbridge.com' },
  { name: 'Tkxel', logo: 'https://logo.clearbit.com/tkxel.com' },
  { name: 'Dubizzle Labs', logo: 'https://logo.clearbit.com/dubizzle.com' },
  { name: 'Careem', logo: 'https://logo.clearbit.com/careem.com' },
  { name: 'Daraz', logo: 'https://logo.clearbit.com/daraz.pk' },
  { name: 'Easypaisa', logo: 'https://logo.clearbit.com/easypaisa.com.pk' },
  { name: 'Jazz', logo: 'https://logo.clearbit.com/jazz.com.pk' },
  { name: 'Educative.io', logo: 'https://logo.clearbit.com/educative.io' },
];

const positions = [
  { title: 'Senior Full Stack Developer', skills: ['React', 'Node.js', 'TypeScript', 'MongoDB'] },
  { title: 'Backend Engineer', skills: ['Node.js', 'Express', 'PostgreSQL', 'Redis'] },
  { title: 'Frontend Developer', skills: ['React', 'Next.js', 'TailwindCSS', 'TypeScript'] },
  { title: 'DevOps Engineer', skills: ['AWS', 'Docker', 'Kubernetes', 'CI/CD'] },
  { title: 'Mobile App Developer', skills: ['React Native', 'iOS', 'Android', 'Firebase'] },
  { title: 'Software Engineer', skills: ['JavaScript', 'Python', 'SQL', 'Git'] },
  { title: 'UI/UX Designer', skills: ['Figma', 'Adobe XD', 'Sketch', 'Prototyping'] },
  { title: 'QA Engineer', skills: ['Selenium', 'Jest', 'Test Automation', 'API Testing'] },
];

const locations = [
  'Karachi, Pakistan',
  'Lahore, Pakistan',
  'Islamabad, Pakistan',
  'Rawalpindi, Pakistan',
  'Faisalabad, Pakistan',
];

async function main() {
  console.log('🌱 Starting seed...');

  // Create demo user
  const hashedPassword = await bcrypt.hash('demo123456', 10);
  const user = await prisma.user.upsert({
    where: { email: 'abdullah.demo@gmail.com' },
    update: {},
    create: {
      email: 'abdullah.demo@gmail.com',
      name: 'Abdullah Demo',
      password: hashedPassword,
      preferences: {
        theme: 'system',
        emailNotifications: true,
        defaultCurrency: 'PKR',
        defaultView: 'table',
        reminderLeadTime: 24,
      },
    },
  });

  console.log('✅ Created demo user:', user.email);

  // Delete existing jobs for the user to avoid duplicates
  await prisma.job.deleteMany({
    where: { userId: user.id },
  });

  console.log('🗑️  Cleaned up existing data');

  // Create job applications
  const jobStatuses = [
    JobStatus.WISHLIST,
    JobStatus.APPLIED,
    JobStatus.SCREENING,
    JobStatus.INTERVIEW,
    JobStatus.OFFER,
    JobStatus.REJECTED,
  ];

  const jobs = [];

  for (let i = 0; i < 25; i++) {
    const company = companies[i % companies.length];
    const position = positions[i % positions.length];
    const status = jobStatuses[Math.floor(i / 4) % jobStatuses.length];
    const location = locations[i % locations.length];
    const locationType = [LocationType.REMOTE, LocationType.HYBRID, LocationType.ONSITE][i % 3];
    const priority = [Priority.LOW, Priority.MEDIUM, Priority.HIGH][i % 3];

    const appliedAt = status !== JobStatus.WISHLIST
      ? new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000)
      : undefined;

    const job = await prisma.job.create({
      data: {
        userId: user.id,
        company: company.name,
        companyLogo: company.logo,
        position: position.title,
        description: `Exciting opportunity to join ${company.name} as a ${position.title}. We are looking for talented individuals to work on cutting-edge projects.`,
        status,
        jobType: JobType.FULL_TIME,
        locationType,
        location,
        salaryMin: 150000 + i * 10000,
        salaryMax: 250000 + i * 15000,
        currency: 'PKR',
        priority,
        tags: ['tech', 'pakistan', locationType.toLowerCase()],
        skills: position.skills,
        appliedAt,
        applicationUrl: `https://${company.name.toLowerCase().replace(/\s+/g, '')}.com/careers`,
      },
    });

    jobs.push(job);

    // Create activity log
    await prisma.activity.create({
      data: {
        jobId: job.id,
        type: status === JobStatus.WISHLIST ? ActivityType.APPLICATION_SUBMITTED : ActivityType.STATUS_CHANGED,
        description: status === JobStatus.WISHLIST
          ? `Added ${job.position} at ${job.company} to wishlist`
          : `Application status changed to ${status}`,
        metadata: { status, company: job.company },
      },
    });

    // Add contacts for applied jobs
    if (status !== JobStatus.WISHLIST && i % 3 === 0) {
      await prisma.contact.create({
        data: {
          jobId: job.id,
          name: ['Ahmed Khan', 'Sara Ali', 'Hassan Ahmed', 'Fatima Shah'][i % 4],
          email: `recruiter${i}@${company.name.toLowerCase().replace(/\s+/g, '')}.com`,
          phone: `+92-300-${1000000 + i}`,
          role: 'HR Manager',
        },
      });
    }

    // Add interviews for interview stage jobs
    if (status === JobStatus.INTERVIEW || status === JobStatus.OFFER) {
      const interviewDate = new Date(Date.now() + Math.floor(Math.random() * 7) * 24 * 60 * 60 * 1000);
      
      await prisma.interview.create({
        data: {
          jobId: job.id,
          title: 'Technical Interview',
          type: InterviewType.TECHNICAL,
          status: InterviewStatus.SCHEDULED,
          scheduledAt: interviewDate,
          duration: 60,
          meetingLink: `https://meet.google.com/${Math.random().toString(36).substring(7)}`,
          interviewers: 'Tech Lead, Senior Engineer',
        },
      });
    }

    // Add notes for some jobs
    if (i % 4 === 0) {
      await prisma.note.create({
        data: {
          jobId: job.id,
          content: 'Great company culture. Competitive salary. Flexible work hours.',
        },
      });
    }
  }

  console.log(`✅ Created ${jobs.length} job applications`);

  // Add some activities
  console.log('✅ Created activities, contacts, interviews, and notes');

  console.log('🎉 Seed completed successfully!');
  console.log('\n📧 Demo User Credentials:');
  console.log('   Email: abdullah.demo@gmail.com');
  console.log('   Password: demo123456');
}

main()
  .catch((e) => {
    console.error('❌ Error during seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
