/**
 * get the labels of a given thread
 */
function getThreadLabels(thread) {
  const LABELS = [];
  const threadLabels = thread.getLabels();

  for (let i = 0; i < threadLabels.length; i++) {
    const label = threadLabels[i].getName();
    LABELS.push(label);
  }

  return LABELS;
}

/**
 * get the details an email message
 */
function getUserEmailDetails() {
  const threads = GmailApp.getInboxThreads(0, 100); // get first 100
  const messages = GmailApp.getMessagesForThreads(threads);
  const ITEMS = [];

  for (let i = 0; i < messages.length; i++) {
    const ITEM = {};
    const message = messages[i][0];

    ITEM.messageSubject = message.getSubject();
    ITEM.messageSender = message.getFrom();
    ITEM.messageDate = message.getDate();
    ITEM.ID = hash(ITEM.messageSender + ITEM.messageSubject + ITEM.messageDate);
    ITEM.labels = getThreadLabels(threads[i]);

    ITEMS.push(ITEM);
    // console.log("" + message.getId() + " " + message.getSubject());
  }

  // console.log(ITEMS);
  return ITEMS;
}
































