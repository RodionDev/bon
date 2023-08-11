module.exports = {
  Error: err => {
    return {}
  },
  Error: err => {
    return {}
  },
  getError: err => {
    return {
      actionStatus: "FailedActionStatus",
      disambiguatingDescription: err.message,
      error: err.name,
      name: 500,
    }
  },
  updateSuccess: thingType => {
    return {
      actionStatus: "CompletedActionStatus",
      disambiguatingDescription: `${thingType} has been updated.`,
      name: 206,
    }
  },
  updateError: err => {
    return {
      actionStatus: "FailedActionStatus",
      disambiguatingDescription: err.message,
      error: err.name,
      name: 500,
    }
  },
  deleteSuccess: thingType => {
    return {
      actionStatus: "CompletedActionStatus",
      disambiguatingDescription: `${thingType} has been deleted.`,
      name: 206,
    }
  },
  deleteError: err => {
    return {
      actionStatus: "FailedActionStatus",
      disambiguatingDescription: err.message,
      error: err.name,
      name: 500,
    }
  },
  thingTypeError: (action, thingType) => {
    return {
      actionStatus: "FailedActionStatus",
      disambiguatingDescription: `Cannot ${action} ${thingType}.`,
      error: "Type Conflict Error",
      name: 409,
    }
  },
  notFoundError: thingType => {
    return {
      actionStatus: "FailedActionStatus",
      disambiguatingDescription: `${thingType} matching query was not found.`,
      error: "Not Found",
      name: 404,
    }
  },
  permissionError: (action, thingType) => {
    return {
      actionStatus: "FailedActionStatus",
      disambiguatingDescription: `You are not permitted to ${action} this ${thingType}.`,
      error: "Forbidden",
      name: 403,
    }
  },
  createError: err => {
    return {
      actionStatus: "FailedActionStatus",
      disambiguatingDescription: err.message,
      error: err.name,
      name: 400,
    }
  },
  credentialsMissingError: () => {
    return {
      actionStatus: "FailedActionStatus",
      disambiguatingDescription: "Requires username and password.",
      error: "Invalid",
      name: 400,
    }
  },
  signUpError: err => {
    return {
      actionStatus: "FailedActionStatus",
      disambiguatingDescription: err.message,
      error: err.name,
      name: 500,
    }
  },
  credentialsError: () => {
    return {
      actionStatus: "FailedActionStatus",
      disambiguatingDescription:
        "The username or password was not correct. Please try again.",
      error: "Unauthorized",
      name: 401,
    }
  },
  loginMissingDataError: () => {
    return {
      actionStatus: "FailedActionStatus",
      disambiguatingDescription: "Requires username and password.",
      error: "Invalid",
      name: 400,
    }
  },
  loginTokenError: err => {
    return {
      actionStatus: "FailedActionStatus",
      disambiguatingDescription: err.message,
      error: err.name,
      name: 500,
    }
  },
  logoutSuccess: () => {
    return {
      actionStatus: "CompletedActionStatus",
      disambiguatingDescription: "The session has been expired.",
      name: 206,
    }
  },
}
