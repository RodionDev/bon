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
  updateSuccess: mainEntityOfPage => {
    return {
      actionStatus: "CompletedActionStatus",
      disambiguatingDescription: `${mainEntityOfPage} has been updated.`,
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
  deleteSuccess: mainEntityOfPage => {
    return {
      actionStatus: "CompletedActionStatus",
      disambiguatingDescription: `${mainEntityOfPage} has been deleted.`,
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
  thingTypeError: (action, mainEntityOfPage) => {
    return {
      actionStatus: "FailedActionStatus",
      disambiguatingDescription: `Cannot ${action} ${mainEntityOfPage}.`,
      error: "Type Conflict Error",
      name: 409,
    }
  },
  notFoundError: mainEntityOfPage => {
    return {
      actionStatus: "FailedActionStatus",
      disambiguatingDescription: `${mainEntityOfPage} matching query was not found.`,
      error: "Not Found",
      name: 404,
    }
  },
  permissionError: (action, mainEntityOfPage) => {
    return {
      actionStatus: "FailedActionStatus",
      disambiguatingDescription: `You are not permitted to ${action} this ${mainEntityOfPage}.`,
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
