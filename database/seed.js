import { faker } from '@faker-js/faker'
import { createClient } from '@supabase/supabase-js'
import { fileURLToPath } from 'url'
import path from 'path'

export const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.SERVICE_ROLE_KEY)

const config = {
  projects_count: 10,
  tasks_per_project: { min: 5, max: 15 },
  collaborators: ['user1', 'user2', 'user3', 'user4', 'user5'],
  status_options: ['in_progress', 'completed'],
  batch_size: 100,
}

const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min

const generateRandomSlug = (name) => {
  return name.toLowerCase().replace(/\s+/g, '-')
}

const selectRandomCollaborators = (min, max) => {
  return faker.helpers.arrayElements(config.collaborators, { min, max })
}

const selectRandomStatus = () => {
  return faker.helpers.arrayElement(config.status_options)
}

const createProject = () => {
  const name = faker.lorem.words({ min: 2, max: 5 })
  return {
    name,
    slug: generateRandomSlug(name),
    description: faker.lorem.paragraph({ min: 1, max: 3 }),
    status: selectRandomStatus(),
    collaborators: selectRandomCollaborators(1, 3),
  }
}

const createTask = (projectId) => ({
  project_id: projectId,
  name: faker.lorem.words({ min: 2, max: 5 }),
  description: faker.lorem.paragraph({ min: 1, max: 3 }),
  status: selectRandomStatus(),
  due_date: faker.date.between({
    from: new Date(),
    to: faker.date.future(),
  }),
  collaborators: selectRandomCollaborators(1, 2),
})

const seedProjects = async (count) => {
  const projects = Array.from({ length: count }, createProject)
  const { data, error } = await supabase.from('projects').insert(projects).select()

  if (error) {
    console.error('Error inserting projects:', error)
    console.error('Error details:', JSON.stringify(error, null, 2))
    process.exit(1)
  } else {
    console.log(`Inserted ${data.length} projects`)
  }
  return data || []
}

const seedTasksForProject = async (projectId, taskCount) => {
  const tasks = Array.from({ length: taskCount }, () => createTask(projectId))
  const { data, error } = await supabase.from('tasks').insert(tasks).select('id')

  if (error) {
    console.error(`Error inserting tasks for project ${projectId}:`, error)
    console.error('Error details:', JSON.stringify(error, null, 2))
    process.exit(1)
  } else {
    console.log(`Inserted ${data.length} tasks for project ${projectId}`)
  }
  return data?.length || 0
}

const seedAllTasks = async (projectIds) => {
  const taskPromises = projectIds.map(({ id, name }) => {
    const taskCount = randomInt(config.tasks_per_project.min, config.tasks_per_project.max)
    return seedTasksForProject(id, taskCount).then((count) => {
      console.log(`${count} tasks created for "${name}"`)
      return count
    })
  })

  const results = await Promise.all(taskPromises)
  const totalTasks = results.reduce((sum, count) => sum + count, 0)

  console.log(`Total tasks created: ${totalTasks}`)
  return totalTasks
}

const runSeeding = async () => {
  const startTime = Date.now()

  try {
    console.log('Starting seeding process...')
    const projects = await seedProjects(config.projects_count)
    if (!projects || projects.length === 0) {
      console.log('No projects created, exiting.')
      return
    }
    await seedAllTasks(projects)

    const duration = ((Date.now() - startTime) / 1000).toFixed(2)
    console.log(`Seeding completed successfully in ${duration} seconds.`)
  } catch (error) {
    console.error('Error during seeding process:', error)
    process.exit(1)
  } finally {
    const endTime = Date.now()
    console.log(`Seeding process completed in ${endTime - startTime}ms`)
  }
}

const __filename = fileURLToPath(import.meta.url)

const isDirectExecution = () => {
  const currentFile = path.resolve(__filename)
  const executedFile = path.resolve(process.argv[1])

  return currentFile === executedFile
}

if (isDirectExecution()) {
  runSeeding()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error('Seeding failed:', error)
      process.exit(1)
    })
}

export { runSeeding, seedProjects, seedAllTasks }
