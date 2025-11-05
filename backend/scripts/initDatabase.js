const sequelize = require('../config/database');
const { User, Therapist, ChatRoom, Message, Appointment } = require('../models');

const initDatabase = async () => {
  try {
    console.log('🔄 Initializing database...');

    await sequelize.sync({ force: true });
    console.log('✅ Database tables created');

    const therapistUser = await User.create({
      email: 'therapist@mindconnect.com',
      password: 'password123',
      name: 'Dr. Sarah Johnson',
      userType: 'therapist',
      profileData: { phone: '+250788123456', location: 'Kigali, Rwanda' }
    });

    const therapist = await Therapist.create({
      userId: therapistUser.id,
      licenseNumber: 'RW-PSY-2024-001',
      specializations: ['Anxiety', 'Depression', 'PTSD'],
      bio: 'Licensed clinical psychologist with 10+ years of experience',
      hourlyRate: 50,
      verificationStatus: 'verified',
      yearsExperience: 10
    });

    console.log('✅ Sample therapist created');

    await User.create({
      email: 'user@mindconnect.com',
      password: 'password123',
      name: 'John Doe',
      userType: 'therapy_seeker',
      profileData: { age: 28, concerns: ['anxiety', 'stress'] }
    });

    console.log('✅ Sample user created');

    const rooms = [
      { roomName: 'Depression Support', topic: 'depression', description: 'Safe space for discussing depression and recovery', moderatorId: therapist.id },
      { roomName: 'Anxiety Management', topic: 'anxiety', description: 'Share anxiety coping strategies and support', moderatorId: therapist.id },
      { roomName: 'General Wellness', topic: 'wellness', description: 'Overall mental health and wellness discussions', moderatorId: therapist.id }
    ];

    for (const room of rooms) {
      await ChatRoom.create(room);
    }

    console.log('✅ Sample chat rooms created');
    console.log('\n🎉 Database initialization complete!');
    console.log('\nSample Credentials:');
    console.log('Therapist: therapist@mindconnect.com / password123');
    console.log('User: user@mindconnect.com / password123');

    process.exit(0);
  } catch (error) {
    console.error('❌ Database initialization failed:', error);
    process.exit(1);
  }
};

initDatabase();
