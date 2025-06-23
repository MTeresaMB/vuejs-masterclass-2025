import { faker } from '@faker-js/faker';
import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SERVICE_ROLE_KEY
)

const seedProjects = async(numEntries) => {
  try {
    const projects = Array.from({ length: numEntries }, () => createProject());
    const { data, error } = await supabase
      .from('projects')
      .insert(projects)

    if (error) {
      throw error;
    }
    console.log(`Inserted ${data?.length} projects successfully.`);
    return true;
  } catch (error) {
    console.error('Error seeding projects:', error);
    return false;
  }
};

const createProject = () => {
  const name = faker.lorem.words(3);

  return {
    name: name,
    slug: name.toLowerCase().replace(/\s+/g, '-'),
    status: faker.helpers.arrayElement(['in_progress', 'completed']),
    collaborators: faker.helpers.arrayElements(
      ['user1', 'user2', 'user3', 'user4', 'user5'],
      { min: 1, max: 3 }
    ),
  };
};

const runSeed = async () => {
  const success = await seedProjects(10);
  if (success) {
    console.log('Seeding completed successfully.');
  } else {
    console.error('Seeding failed.');
    process.exit(1);
  }
};

runSeed().catch((error) => {
  console.error('Error running seed script:', error);
  process.exit(1);
});
//Insert Bulk Entries Into Supabase Database
