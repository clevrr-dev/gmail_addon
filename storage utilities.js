/**
 * open storage file and return list of JSON objects
 */
function getFromStorage(getParagraph = false) {
  const fileID =
    PropertiesService.getUserProperties().getProperty("fileID");
  const ITEMS = [];
  const PARAGRAPHS = [];

  const file = DocumentApp.openById(fileID);
  const paragraphs = file.getBody().getParagraphs();

  for (let i = 0; i < paragraphs.length; i++) {
    const paragraph = paragraphs[i].getText();
    // if paragraph is not empty
    if (!(paragraph === "")) {
      // convert to json
      const jsonItem = JSON.parse(paragraph);
      ITEMS.push(jsonItem);
      // if paragraph requested for
      PARAGRAPHS.push(paragraphs[i]);
    }
  }

  if (getParagraph) {
    return PARAGRAPHS;
  }

  return ITEMS;

  // console.log(ITEMS);
}

/**
 * update storage file with items
 */
function updateStorageFile() {
  const fileID =
    PropertiesService.getUserProperties().getProperty("fileID");

  const file = DocumentApp.openById(fileID);
  const body = file.getBody();
  const paragraphs = getFromStorage((getParagraph = true));

  const storageItems = getFromStorage();
  const userEmailDetails = getUserEmailDetails();

  // add new items to top of list
  for (let i = 0; i < userEmailDetails.length; i++) {
    const detail = userEmailDetails[i];

    // check if detail ID already exists
    if (storageItems.some((item) => item.ID === detail.ID)) {
      // check if labels are the same
      // if not then there's a new label to be added
      if (
        !storageItems.some(
          (item) =>
            JSON.stringify(item.labels.sort()) ===
            JSON.stringify(detail.labels.sort())
        )
      ) {
        // update with new labels
        updateDetailLabels(detail);
      }
    } else {
      // if item doesn't exist in storage
      // console.log(detail);

      // check if detail has any labels
      if (detail.labels.length) {
        body.insertParagraph(0, JSON.stringify(detail));
      }
    }
  }
}

/**
 * update detail with new labels
 */
function updateDetailLabels(detail) {
  const paragraphs = getFromStorage((getParagraph = true));
  const storageDetails = getFromStorage();
  const newLabels = detail.labels;

  for (let i = 0; i < paragraphs.length; i++) {
    const storageDetail = storageDetails[i];
    // if the same
    if (storageDetail.ID === detail.ID) {
      // overwrite old labels with new labels
      storageDetail.labels = newLabels;

      // update paragraph
      const paragraph = paragraphs[i];
      paragraph.clear(); // clear paragraph
      paragraph.appendText(JSON.stringify(storageDetail));
    }
  }
}


/**
 * create storage file
 */
function createStorageFile() {
  // create document file with random numbers for name
  let fileNo = Math.random(10000);
  let fileNo2 = Math.random(10000);
  const file = DocumentApp.create(fileNo + "label-storage" + fileNo2);
  const fileId = file.getId();

  // change permission
  const driveFile = DriveApp.getFileById(fileId);
  driveFile.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.EDIT);

  // change name
  driveFile.setName("labels-storage-" + fileId);

  const properties = PropertiesService.getUserProperties();
  properties.setProperty('fileID', fileId);

  return reloadSettings('Storage File Created');
}


/**
 * test functions
 */
function testUpdateStorage() {
  const firebaseUrl = "https://share-gmail-labels-382714-default-rtdb.firebaseio.com/storages/ID1.json";
  const data = JSON.parse(UrlFetchApp.fetch(firebaseUrl));

  console.log(data);
}


























