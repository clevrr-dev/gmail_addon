/**
 * TODO: handle nested labels
 * get labels and email from storage
 * [label, useremail]
 */
function getLabelsFromStorage() {
  const STORAGE_LABELS = getFromStorage();
  const ITEMS = [];

  for (let i = 0; i < STORAGE_LABELS.length; i++) {
    const labelEmailSet = STORAGE_LABELS[i];
    const splitted = labelEmailSet.split(",");
    const label = splitted[0];
    const email = splitted[1];

    // remove if email is undefined
    if (!(email == undefined)) {
      ITEMS.push([label, email]);
    }
  }

  return ITEMS;
}

/**
 * TODO: handle nested labels
 * upload labels to storage if it doesn't exit
 */
function uploadLabelsToStorage() {
  const USER_LABELS = [];
  const STORAGE_LABELS = [];
  const LABELS = [];

  for (let i = 0; i < getUserLabels().length; i++) {
    const label = getUserLabels()[i][0];
    USER_LABELS.push(label);
  }

  for (let i = 0; i < getLabelsFromStorage().length; i++) {
    const label = getLabelsFromStorage()[i][0];
    STORAGE_LABELS.push(label);
  }

  for (let i = 0; i < USER_LABELS.length; i++) {
    const label = USER_LABELS[i];

    // check if user label doesn't exist in storage already
    if (!STORAGE_LABELS.includes(label)) {
      LABELS.push(label);
    }
  }
  // console.log(LABELS);
  updateStorageFile(LABELS);
}

function footer() {
  // foot button actions
  // const primaryButtonAction =
  //   CardService.newAction().setFunctionName("uploadAllLabels");
  // const secondaryButtonAction =
  //   CardService.newAction().setFunctionName("downloadAllLabels");

  // //generate footer buttons
  // const primaryButton = CardService.newTextButton()
  //   .setText("Upload All")
  //   .setOnClickAction(primaryButtonAction)
  //   .setTextButtonStyle(CardService.TextButtonStyle.FILLED);

  // const secondaryButton = CardService.newTextButton()
  //   .setText("Download All")
  //   .setOnClickAction(secondaryButtonAction)
  //   .setTextButtonStyle(CardService.TextButtonStyle.TEXT);
}
