const AdminBro = require('admin-bro')
const AdminBroExpressjs = require('admin-bro-expressjs')
const AdminBroMongoose = require('admin-bro-mongoose')

const Faculty = require('./models/faculty')
const Student = require('./models/student')
const Machine = require('./models/machine')
const Lab = require('./models/lab')
const Experiment = require('./models/experiment')

AdminBro.registerAdapter(AdminBroMongoose)
const adminBro = new AdminBro({
  rootPath: '/faculty',
  loginPath: '/faculty/login',
  branding: {
    logo: 'https://cdn.dribbble.com/users/79654/screenshots/1917211/vr.jpg',
    companyName: 'VR LAB',
    softwareBrothers: false   // if Software Brothers logos should be shown in the sidebar footer
  },
  resources: [
    {
        resource: Student,
        options: {
          // We'll add this later
        }
      },
      {
        resource: Lab,
        options: {
          // We'll add this later
        }
      },
      {
        resource: Experiment,
        options: {
          // We'll add this later
        }
      },
      {
        resource: Machine,
        options: {
          // We'll add this later
        }
      }
  ],
})

const router = AdminBroExpressjs.buildAuthenticatedRouter(adminBro, {
    authenticate: async (email, password) => {
      const faculty = await Faculty.findOne({ email })
      if (faculty) {
        if (password == faculty.password) {
          return faculty
        }
      }
      return false
    },
    cookiePassword: 'some-secret-password-used-to-secure-cookie',
  })

module.exports = facultyRouter = router