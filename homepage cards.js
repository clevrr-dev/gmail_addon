/**
 * build homepage cards
 */
function homepageCard() {
  // get section
  try {
    const labelSection = generateSection();

    // get footer widget
    const footerWidget = generateFooterWidget();

    // build final card
    const card = CardService.newCardBuilder()
      .setName('homepage')
      .addSection(labelSection)
      .setFixedFooter(footerWidget);

    return card.build();

  } catch (e) {
    Logger.log(e);
    // if error encountered
    const section = CardService.newCardSection().setHeader("Invalid File Url");
    const text = CardService.newTextParagraph()
      .setText(
        "Go to the settings page and make sure the <b>Storage ID</b> is correct " +
        "or click on <b>Create New</b> to create a new Storage File. " +
        "Then <b>Refresh</b> the add on."
      );

    section.addWidget(text);

    const footerWidget = generateFooterWidget();

    const card = CardService.newCardBuilder()
      .addSection(section)
      .setFixedFooter(footerWidget);

    return card.build();
  }
}

/**
 * reload homepage card
 */
function reloadHomepage() {
  const card = homepageCard();

  const navigation = CardService.newNavigation().updateCard(card);
  const actionResponse = CardService.newActionResponseBuilder()
    .setNavigation(navigation);

  return actionResponse.build();
}

/**
 * generate section
 */
function generateSection() {
  // get label widgets
  const LABEL_WIDGETS = generateLabelWidgets();

  // create section for labels
  const labelSection = CardService.newCardSection().setHeader("All Labels");

  // recursively add all created label widget
  for (let i = 0; i < LABEL_WIDGETS.length; i++) {
    const widget = LABEL_WIDGETS[i];
    labelSection.addWidget(widget);
  }

  return labelSection;
}

/**
 * generate label widgets
 */
function generateLabelWidgets() {
  // const userEmail = Session.getActiveUser().getEmail();
  const DETAILS = getFromStorage();
  const USER_DETAILS = getUserEmailDetails();

  // if no labels
  if (DETAILS.length == 0) {
    const LABEL_WIDGETS = [];
    const textWidget = CardService.newTextParagraph().setText(
      "<b>No labels available</b><br>" +
      "All synced labels will appear here."
    );
    LABEL_WIDGETS.push(textWidget);

    return LABEL_WIDGETS;
  }

  const LABEL_WIDGETS = new Array(DETAILS.length).fill();

  // icons
  const personIconUrl =
    "http://www.gstatic.com/images/icons/material/system/1x/verified_black_48dp.png";
  const groupIconUrl =
    "https://www.gstatic.com/images/icons/material/system/1x/groups_black_48dp.png";
  const cloudIconUrl =
    "https://www.gstatic.com/images/icons/material/system/1x/update_disabled_black_48dp.png";
  // const labelIconUrl =
  // "http://www.gstatic.com/images/icons/material/system/1x/label_black_48dp.png";
  const labelIconUrl = "https://raw.githubusercontent.com/dev-clevrr/static-files-hosting/main/product-development.png"

  const startIcon = CardService.newIconImage().setIconUrl(labelIconUrl);
  const endIcon = CardService.newIconImage().setIconUrl(cloudIconUrl);

  // console.log(DETAILS.length);

  // populate rich text widget with labels
  for (let i = 0; i < DETAILS.length; i++) {
    for (let j in DETAILS[i].labels) {
      const detail = DETAILS[i];
      const subject = DETAILS[i].messageSubject;
      // const label = DETAILS[i].labels[j];

      // create rich text widget
      const labelWidget = CardService.newDecoratedText()
        .setTopLabel(DETAILS[i].labels.join(", "))
        .setText(subject)
        .setBottomLabel("⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯")
        .setStartIcon(startIcon)
        .setEndIcon(endIcon)
        .setWrapText(false);
      // user only label widgets
      if (
        USER_DETAILS.some(
          (item) => JSON.stringify(item) === JSON.stringify(detail)
        )
      ) {
        const endIcon = CardService.newIconImage().setIconUrl(personIconUrl);
        labelWidget.setEndIcon(endIcon);
      }

      // other label widgets
      if (
        !USER_DETAILS.some(
          (item) => JSON.stringify(item) === JSON.stringify(detail)
        )
      ) {
        const downloadLabelAction = CardService.newAction()
          .setFunctionName("downloadSingleLabel")
          .setParameters({ detail: JSON.stringify(DETAILS[i]) });
        labelWidget.setOnClickAction(downloadLabelAction);
      }

      LABEL_WIDGETS[i] = labelWidget;
    }
  }

  return LABEL_WIDGETS;
}

/**
 * generate footer widget
 */
function generateFooterWidget() {
  // sync all labels
  const syncAllAction =
    CardService.newAction().setFunctionName("syncAllLabels");

  // sync all button
  const secondaryButton = CardService.newTextButton()
    .setText("Sync All")
    .setOnClickAction(syncAllAction)
    .setTextButtonStyle(CardService.TextButtonStyle.TEXT);

  // settings nav action
  const settingsNavAction = CardService.newAction().setFunctionName('settingsNav');

  // settings buton
  const primaryButton = CardService.newTextButton()
    .setText('Settings')
    .setOnClickAction(settingsNavAction);

  // generate footer
  const footerWidget = CardService.newFixedFooter()
    .setPrimaryButton(primaryButton)
    .setSecondaryButton(secondaryButton);

  return footerWidget;
}


function settingsNav() {
  const settingsNavigation = CardService.newNavigation().pushCard(settingsCard());
  const actionResponse =
    CardService.newActionResponseBuilder().setNavigation(settingsNavigation);

  return actionResponse.build();
}

/**
 * test functions
 */
function testCardFunctions() {
  for (let i = 0; i < getUserEmailDetails().length; i++) {
    const labels = getUserEmailDetails()[i].labels;
    console.log(labels);
  }
}



























