module.exports = {
  Person: {
    signup: {
      name: "Wizard",
      username: "wizard",
      password: "letmein",
    },
    create: {
      name: "Wizard",
      alternateName: "mage",
      disambiguatingDescription: "Wizard1",
      engage: {
        Person: { birthDate: "1967-03-06", email: "wizard1@eliomail.com" },
      },
    },
    update: {
      name: "Sorcerer",
      username: "sorcerer",
      password: "letmeout",
      alternateName: "sorcerer1",
      disambiguatingDescription: "Sorcerer1",
      engage: { Person: { email: "sorcerer1@eliomail.com" } },
    },
  },
  Action: {
    signup: {
      name: "Apprentices",
      disambiguatingDescription: "Hire an apprentice.",
      username: "wizard",
      password: "letmein",
    },
    create: {
      thing: "Action",
      name: "Apprentices",
      disambiguatingDescription: "Hire an apprentice.",
      engage: {
        Action: {
          actionStatus: "ActiveActionStatus",
          startTime: "2030-10-10T01:02:03.000Z",
        },
      },
    },
    update: { engage: { Action: { actionStatus: "CompletedActionStatus" } } },
  },
  ConsumeAction: {
    create: {
      name: "Victuals",
      disambiguatingDescription: "Eat victuals.",
      engage: {
        Action: {
          actionStatus: "ActiveActionStatus",
          startTime: "2030-10-10T01:02:03.000Z",
        },
        ConsumeAction: {
          expectsAcceptanceOf: "Taste",
        },
      },
    },
    update: {
      disambiguatingDescription: "Eat more victuals.",
      engage: {
        Action: {
          actionStatus: "CompletedActionStatus",
        },
        ConsumeAction: {
          expectsAcceptanceOf: "Bill",
        },
      },
    },
  },
}
