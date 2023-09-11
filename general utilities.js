/**
 * hash function
 */
function hash(item) {
  let hash = 0;
  for (let i = 0, len = item.length; i < len; i++) {
    let chr = item.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
}


/**
 * create storage file if non exists
 */
function setupStorageFile() {
  const fileName = "syncLabelsStorage";

  // get file
  const fileID = PropertiesService.getUserProperties().getProperty("fileID");

  if (fileID === null) {
    // create file if it doesn't exist
    // const storageFile = DocumentApp.openByUrl("https://docs.google.com/document/d/1TPjaa_QbEGJE6fJCN9tT7jl3Hg6lqhRKLDVRJ8lAh3Y/edit");
    // const fileID = storageFile.getUrl();
    

        // change file permission
    const files = DriveApp.getFiles();
    while (files.hasNext()) {
      var file = files.next();
      Logger.log(file.getName());
    }
  }
}






























