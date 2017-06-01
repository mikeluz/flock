'use strict'

const db = require('APP/db')
    , {User, Pub, Promise} = db
    , {mapValues} = require('lodash')

const csvFilePath = __dirname + '/pubs.csv'
const csv = require('csvtojson')

const pubsData = () => {
  
  let pubsData = [];

  csv()
  .fromFile(csvFilePath)
  .on('json',(jsonObj)=>{
    console.log("row", jsonObj);
    pubsData.push(jsonObj);
  })
  .on('done',(error)=>{
    console.log('end')
  })
  console.log("pubsData", pubsData);
  return pubsData;
}

function seedEverything() {
  const seeded = {
    users: users(),
    // things: things(),
    pubs: pubs()
  }

  // seeded.favorites = favorites(seeded)

  return Promise.props(seeded)
}

const users = seed(User, {
  jess: {
    name: 'Jess Feldman',
    address: '91 Luquer St, Apt. 2R, Brooklyn, NY 11231',
    bio: "Jess Feldman's poetry has appeared or is forthcoming in Sixth Finch, Vinyl, Paperbag and elsewhere. Her manuscript “Call It a Premonition” was chosen by Zachary Schomburg as winner of the 2015 BOAAT Winter Chapbook Competition. Jess lives in Brooklyn, NY.",
    isAdmin: true,
    email: 'jessica.feldman211@gmail.com',
    password: 'jfeldman211',
  },
  mike: {
    name: 'Mike Luz',
    address: '91 Luquer St, Apt. 2R, Brooklyn, NY 11231',
    bio: "Mike Luz is a poet and musician living in Brooklyn, NY. Mike has published an experimental volume of poems, 'Ages of Suits by Sam Casino,' and has work forthcoming in Outlook Springs. In early 2016, he released an album recorded with Martin Bisi at BC Studios under the name Mercy Wizard.",
    isAdmin: true,
    email: 'onlymikeluz@gmail.com',
    password: 'onlymikeluz',
  },
  meg: {
    name: 'Megan Leonard',
    address: '284 Cabot St, Portsmouth, NH 03801',
    bio: "Megan Leonard’s poetry has appeared most recently in HOUSEGUEST, Reservoir, and Tupelo Quarterly. Her chapbook is forthcoming from Platypus Press. Meg lives and works on the New Hampshire seacoast.",
    isAdmin: false,
    email: 'megglism@gmail.com',
    password: 'megglism',
  },
  kathleen: {
    name: 'Kathleen Maris Paltrineri',
    address: '3727 Cottage Reserve Road, Solon, IA 52333',
    bio: "Kathleen Maris is a poet and photographer living in Iowa. In early 2016, Kathleen was the writer-in-residence at Crosshatch Center for Art and Ecology in northern Michigan. She earned her MFA in Poetry from the University of New Hampshire and is the Fall Residency coordinator for the University of Iowa's International Writing Program. You can find more of her poetry in decomP magazinE, HOUSEGUEST, The Atlas Review, and elsewhere.",
    isAdmin: false,
    email: 'kathleenmaris99@gmail.com',
    password: 'kathleenmaris99',
  },
  hannah: {
    name: 'Hannah Larrabee',
    address: '18 Wisteria St, Unit 2, Salem, MA 01970',
    bio: "Hannah Larrabee is the author of 'Virgo' (Finishing Line Press, 2009), and 'Sufjan' (forthcoming from Finishing Line Press). She’s had poems appear in HOUSEGUEST, Entropy, Rock & Sling, Printer’s Devil Review, Best Indie Lit in New England, and others. Hannah teaches writing at Northern Essex Community College and works for a software technology company in Boston. She has a Master of Fine Arts degree in Creative Writing from The University of New Hampshire. She’ll occasionally write a TinyLetter, but you can also find her @HanonymusBosch.",
    isAdmin: false,
    email: 'hannlarrabee@gmail.com',
    password: 'hannlarrabee',
  }
})

const pubs = seed(Pub, pubsData());

// const things = seed(Thing, {
//   surfing: {name: 'surfing'},
//   smiting: {name: 'smiting'},
//   puppies: {name: 'puppies'},
// })

// const favorites = seed(Favorite,
//   // We're specifying a function here, rather than just a rows object.
//   // Using a function lets us receive the previously-seeded rows (the seed
//   // function does this wiring for us).
//   //
//   // This lets us reference previously-created rows in order to create the join
//   // rows. We can reference them by the names we used above (which is why we used
//   // Objects above, rather than just arrays).
//   ({users, things}) => ({
//     // The easiest way to seed associations seems to be to just create rows
//     // in the join table.
//     'obama loves surfing': {
//       user_id: users.barack.id,    // users.barack is an instance of the User model
//                                    // that we created in the user seed above.
//                                    // The seed function wires the promises so that it'll
//                                    // have been created already.
//       thing_id: things.surfing.id  // Same thing for things.
//     },
//     'god is into smiting': {
//       user_id: users.god.id,
//       thing_id: things.smiting.id
//     },
//     'obama loves puppies': {
//       user_id: users.barack.id,
//       thing_id: things.puppies.id
//     },
//     'god loves puppies': {
//       user_id: users.god.id,
//       thing_id: things.puppies.id
//     },
//   })
// )

if (module === require.main) {
  db.didSync
    .then(() => db.sync({force: true}))
    .then(seedEverything)
    .finally(() => process.exit(0))
}

class BadRow extends Error {
  constructor(key, row, error) {
    super(error)
    this.cause = error
    this.row = row
    this.key = key
  }

  toString() {
    return `[${this.key}] ${this.cause} while creating ${JSON.stringify(this.row, 0, 2)}`
  }
}

// seed(Model: Sequelize.Model, rows: Function|Object) ->
//   (others?: {...Function|Object}) -> Promise<Seeded>
//
// Takes a model and either an Object describing rows to insert,
// or a function that when called, returns rows to insert. returns
// a function that will seed the DB when called and resolve with
// a Promise of the object of all seeded rows.
//
// The function form can be used to initialize rows that reference
// other models.
function seed(Model, rows) {
  return (others={}) => {
    if (typeof rows === 'function') {
      rows = Promise.props(
        mapValues(others,
          other =>
            // Is other a function? If so, call it. Otherwise, leave it alone.
            typeof other === 'function' ? other() : other)
      ).then(rows)
    }

    return Promise.resolve(rows)
      .then(rows => Promise.props(
        Object.keys(rows)
          .map(key => {
            const row = rows[key]
            return {
              key,
              value: Promise.props(row)
                .then(row => Model.create(row)
                  .catch(error => { throw new BadRow(key, row, error) })
                )
            }
          }).reduce(
            (all, one) => Object.assign({}, all, {[one.key]: one.value}),
            {}
          )
        )
      )
      .then(seeded => {
        console.log(`Seeded ${Object.keys(seeded).length} ${Model.name} OK`)
        return seeded
      }).catch(error => {
        console.error(`Error seeding ${Model.name}: ${error} \n${error.stack}`)
      })
  }
}

module.exports = Object.assign(seed, {users})
