const AdminBro = require('admin-bro')
const AdminBroExpressjs = require('admin-bro-expressjs')
const AdminBroMongoose = require('admin-bro-mongoose')

const Faculty = require('./models/faculty')
const Machine = require('./models/machine')
const Student = require('./models/student')
const Admin = require('./models/admin')

AdminBro.registerAdapter(AdminBroMongoose)
const adminBro = new AdminBro({
  rootPath: '/admin',
  loginPath: '/admin/login',
  branding: {
    logo: 'https://cdn.dribbble.com/users/79654/screenshots/1917211/vr.jpg',
    companyName: 'VR LAB',
    softwareBrothers: false   // if Software Brothers logos should be shown in the sidebar footer
  },
  resources: [
    {
        resource: Admin,
        options: {
          // We'll add this later
        }
      },
    {
      resource: Faculty,
      options: {
        // We'll add this later
      }
    },
    {
        resource: Student,
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
      const admin = await Admin.findOne({ email })
      if (admin) {
        if (password == admin.password) {
          return admin
        }
      }
      return false
    },
    cookiePassword: 'some-secret-password-used-to-secure-cookie',
  })

module.exports = adminRouter = router