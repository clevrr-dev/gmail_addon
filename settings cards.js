/**
 * build settings card
 */
function settingsCard() {
  // get fileID section
  const fileFieldSection = storageFileWidget();

  // get triggers section
  const triggersSection = triggersWidget();

  // build header
  const header = CardService.newCardHeader()
    .setTitle('Settings');

  // footer
  const footer = footerWidget();

  // build final card
  const card = CardService.newCardBuilder()
    .setName('settings')
    .setHeader(header)
    .addSection(fileFieldSection)
    .addSection(triggersSection)
    .setFixedFooter(footer);

  return card.build();
}


/**
 * reload settings card
 */
function reloadSettings(message) {
  const card = settingsCard();

  const notification = CardService.newNotification().setText(message);

  const navigation = CardService.newNavigation().updateCard(card);
  const actionResponse = CardService.newActionResponseBuilder()
    .setNotification(notification)
    .setNavigation(navigation);

  return actionResponse.build();
}

/**
 * setup storage file
 */
function storageFileWidget() {
  const fileID = PropertiesService.getUserProperties().getProperty('fileID');
  let fileField;

  // create storage action
  const createStorageAction = CardService.newAction()
    .setFunctionName('createStorageFile');

  // save button action
  const saveStorageUrl = CardService.newAction()
    .setFunctionName('saveStorage');

  // delete button action
  const deleteStorageUrl = CardService.newAction()
    .setFunctionName('deleteStorage');

  // create storage file
  const createStorageButton = CardService.newTextButton()
    .setText('Create New')
    .setOnClickAction(createStorageAction)
    .setTextButtonStyle(CardService.TextButtonStyle.TEXT);

  // setup save button
  const saveButton = CardService.newTextButton()
    .setText('Save ID')
    .setOnClickAction(saveStorageUrl)
    .setTextButtonStyle(CardService.TextButtonStyle.FILLED);

  // setup delete button
  const deleteButton = CardService.newTextButton()
    .setText('<font color="#ff0000">CLEAR</font>')
    .setOnClickAction(deleteStorageUrl)
    .setTextButtonStyle(CardService.TextButtonStyle.TEXT);
  // .setBackgroundColor('#ff0000');

  // if url doesn't exists
  if (fileID === null) {
    fileField = CardService.newTextInput()
      .setFieldName('fileID')
      .setTitle('Paste File ID Here');
  } else {
    // if url already exist
    // build widget
    fileField = CardService.newDecoratedText()
      .setTopLabel('Share this ID to share labels')
      .setText(fileID)
      .setWrapText(false)
      .setButton(deleteButton);
  }

  // setup widget section
  const fileFieldSection = CardService.newCardSection().setHeader("Storage ID");

  // add widgets to section
  fileFieldSection
    .addWidget(fileField);

  // button set
  const buttons = CardService.newButtonSet()
    .addButton(saveButton)
    .addButton(createStorageButton);

  // add button
  if (fileID === null) {
    fileFieldSection.addWidget(buttons);
  }

  return fileFieldSection;
}


/**
 * setup triggers
 */
function triggersWidget() {
  const TRIGGERS = ScriptApp.getProjectTriggers();

  const triggerAction = CardService.newAction()
    .setFunctionName('manageTriggers');

  const enableTriggerSwitch = CardService.newSwitch()
    .setFieldName('trigger')
    .setOnChangeAction(triggerAction);

  // if triggers exist
  if (TRIGGERS.length) {
    enableTriggerSwitch.setSelected(true);
  } else {
    enableTriggerSwitch.setSelected(false);
  }

  const enableTriggerWidget = CardService.newDecoratedText()
    .setText("Enable Auto Update")
    .setSwitchControl(enableTriggerSwitch);

  const triggerSection = CardService.newCardSection()
    .setHeader('Auto-Update')
    .addWidget(enableTriggerWidget);

  return triggerSection;
}



/**
 * generate footer widget
 */
function footerWidget() {
  // settings nav action
  const settingsNavAction = CardService.newAction().setFunctionName('returnToHomepage');

  // settings buton
  const primaryButton = CardService.newTextButton()
    .setText('Save Settings')
    .setOnClickAction(settingsNavAction);

  // generate footer
  const footerWidget = CardService.newFixedFooter()
    .setPrimaryButton(primaryButton);
  // .setSecondaryButton(secondaryButton);

  return footerWidget;
}


/**
 * go to homepage
 */
function returnToHomepage() {
  const card = homepageCard();

  const notification = CardService.newNotification().setText("Settings Saved");
  const navigation = CardService.newNavigation().updateCard(card).popToRoot();
  const actionResponse = CardService.newActionResponseBuilder()
    .setNavigation(navigation)
    .setNotification(notification);

  return actionResponse.build();
}






















