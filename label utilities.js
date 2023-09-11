/**
 * sync all labels
 */
// function syncAllLabels() {
//   updateStorageFile();
//   downloadLabels();

//   return reloadHomepage();
// }

/**
 * create and add labels to messages
 */
function downloadLabels() {
  const userEmailDetails = getUserEmailDetails();
  const storageEmailDetails = getFromStorage();
  // console.log(storageEmailDetails);

  for (let i = 0; i < userEmailDetails.length; i++) {
    const userEmailDetail = userEmailDetails[i];
    const userEmailID = userEmailDetail.ID;

    for (let i = 0; i < storageEmailDetails.length; i++) {
      const storageEmailDetail = storageEmailDetails[i];
      const storageID = storageEmailDetail.ID;

      // if message is same
      if (userEmailID === storageID) {
        // get storage labels
        const storageEmailLabels = storageEmailDetail.labels;
        // create labels and add to message
        createUserLabels(storageEmailLabels, storageEmailDetail);
        // console.log(storageEmailDetail);
      }
    }
  }
}

/**
 * TODO: handle nested labels
 * create labels for current user
 * add label to message
 */
function createUserLabels(LABELS, emailDetail) {
  // create labels
  const subject = emailDetail.messageSubject;
  const sender = emailDetail.messageSender;
  Logger.log(subject);
  Logger.log(sender);

  // get message thread
  const threads = GmailApp.search("subject:" + subject + " from:" + sender);

  // get labels
  for (let i = 0; i < LABELS.length; i++) {
    // create label in case it doesn't exist
    const label = GmailApp.createLabel(LABELS[i]);
    // don't include nested labels
    Logger.log(label);
    // add label to thread
    for (let j in threads) {
      if (!(threads[j] === undefined)) {
        const thread = threads[j];
        Logger.log(thread);
        thread.addLabel(label);
        // console.log(j);
      }
    }
  }
}

/**
 * get and return a list of user labels
 */
function getUserLabels() {
  const USER_LABELS = [];

  const labels = GmailApp.getUserLabels();

  for (let i = 0; i < labels.length; i++) {
    const label = labels[i].getName();
    USER_LABELS.push(label);
  }

  return USER_LABELS;
  // console.log(USER_LABELS);
}

/**
 * test functions
 */
function testLabelFunctions() {
  // createLabels();
  const storageEmailDetails = getFromStorage();

  createUserLabels(['Another'], storageEmailDetails[0]);
}
