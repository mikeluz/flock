'use strict'

const db = require('APP/db')
    , {User, Pub, Poem, Call, Sub, Promise} = db
    , {mapValues} = require('lodash')

// module for importing csv data as json
const csvFilePath = __dirname + '/pubs.csv'
const csv = require('csvtojson')

function seedEverything() {
  const seeded = {
    users: users(),
    pubs: pubs(),
    calls: calls(),
  }
  seeded.subs = subs(seeded)
  seeded.poems = poems(seeded)
  return Promise.props(seeded)
}

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

const poems = seed(Poem, ({ users }) => ({
  testOne: {
    name: 'The Furthest Peak',
    user_id: users.jess.id
  },
  testTwo: {
    name: 'Sharpness',
    user_id: users.mike.id
  },
  testThree: {
    name: 'Pencils Breaking',
    user_id: users.jess.id
  },
  testFour: {
    name: 'Worse Things',
    user_id: users.mike.id
  },
  testFive: {
    name: 'A Mess',
    user_id: users.meg.id
  },
  testSix: {
    name: 'You',
    user_id: users.kathleen.id
  },
  testSeven: {
    name: 'Standards',
    user_id: users.meg.id
  },
  testEight: {
    name: 'Colorblind',
    user_id: users.kathleen.id
  },
}))

const calls = seed(Call, {
  testOne: {
    call_name: 'Backlash Summer Submissions',
    call_start: '2017-05-09',
    call_end: '2017-09-09',
    call_type: 'basic',
    call_judge: 'George Oppen',
    call_detail: 'A call for summer submissions. 2 poems per submission.',
    open_or_closed: 'open',
    pages_or_poems: 'poems',
    req_length: '2',
    fee_amt: 3,
    mail_only: false,
    req_sase: false,
    mailing_address: "none",
    pub_id: 5
  },
  testTwo: {
    call_name: '2017 Gulf Coast Manuscript Contest',
    call_start: '2017-05-28',
    call_end: '2017-12-12',
    call_type: 'manuscript',
    call_judge: 'Robert Frost',
    call_detail: 'Gulf Coast yearly manuscript contest. 50 to 80 pages.',
    open_or_closed: 'open',
    pages_or_poems: 'pages',
    req_length: '50-80',
    fee_amt: 30,
    mail_only: true,
    req_sase: true,
    mailing_address: "45 Florida Drive, Tallahasee, FL, 12345",
    pub_id: 10
  },
})

const subs = seed(Sub, ({ users, calls }) => ({
  testOne: {
    sub_date: '2017-06-01',
    sub_status: 'accepted',
    sub_notes: 'This is the first time these poems have been submitted',
    user_id: users.jess.id,
    call_id: calls.testOne.id,
    pub_id: 5
  },
}))

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
