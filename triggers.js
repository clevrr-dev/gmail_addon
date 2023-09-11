function manageTriggers() {
  const TRIGGERS = ScriptApp.getProjectTriggers();
  let notification = CardService.newNotification().setText("An Error Occured... Try again later");

  // if triggers exist
  // delete all
  if (TRIGGERS.length) {
    for (let i = 0; i < TRIGGERS.length; i++) {
      const trigger = TRIGGERS[i];
      ScriptApp.deleteTrigger(trigger);
    }
  notification = CardService.newNotification().setText("Auto Update Disabled");

  } else {
    // create triggers if none exist
    const uploadTrigger = setUploadTrigger();
    const downloadTrigger = setDownloadTrigger();

    uploadTrigger.create();
    downloadTrigger.create();

  notification = CardService.newNotification().setText("Auto Update Enabled");
  }

  const response = CardService.newActionResponseBuilder().setNotification(notification);

  return response.build();
}


function setUploadTrigger() {
  // Trigger every 10 mins
  const uploadTrigger = ScriptApp.newTrigger('updateStorageFile')
    .timeBased()
    .everyHours(1);

  return uploadTrigger;
}


function setDownloadTrigger() {
  // Trigger every 10 mins
  const downloadTrigger = ScriptApp.newTrigger('downloadLabels')
    .timeBased()
    .everyHours(1);

  return downloadTrigger;
}















