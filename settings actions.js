/**
 * save storage url
 */
function saveStorage(e) {
  // Logger.log(e);
  if (e.formInput.fileID) {
    const ID = e.formInput.fileID;
    const fileID = PropertiesService.getUserProperties()
    fileID.setProperty('fileID', ID);
    
    return reloadSettings("Storage File Updated");
  }

  return reloadSettings("Please enter a storage ID");

}


/**
 * delete storage url
 */
function deleteStorage(e) {
  const fileID = PropertiesService.getUserProperties();
  fileID.deleteProperty('fileID');

  return reloadSettings("Storage File Deleted");
}
