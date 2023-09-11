/**
 * upload all labels
 */
function uploadAllLabels() {
  updateStorageFile();
  // return reloadHomepage();
}

/**
 * download all labels
 */
function downloadAllLabels() {
  downloadLabels();
  // return reloadHomepage();
}

/**
 * download single label
 */
function downloadSingleLabel(event) {
  const detail = JSON.parse(event.parameters.detail);
  const LABELS = detail.labels;

  // create
  createUserLabels(LABELS, detail);

  return reloadHomepage();
}

/**
 * sync all labels
 */
function syncAllLabels() {
  Logger.log("Syncing Labels");
  
  // download labels
  downloadAllLabels();

  // upload labels
  uploadAllLabels();

  return reloadHomepage();
}


























