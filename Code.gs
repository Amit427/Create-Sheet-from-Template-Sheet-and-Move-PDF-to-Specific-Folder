var ss = SpreadsheetApp.getActiveSpreadsheet()
var temp = ss.getSheetByName('Template')
var setting = ss.getSheetByName('Setting')

var emp = temp.getRange('C3').getValue()
var month = temp.getRange('E2').getValue()


var wMSG = setting.getRange('E3').getValue()
var number = setting.getRange('E1').getValue()
var api = setting.getRange('E2').getValue()
var mailInputs = setting.getRange('B1:B3').getValues().flat()

var activeTracker = SpreadsheetApp.openById('1bmhhjV-Lu7ZoXIbpBJmJjQ19D9fNQ2s6R5crWkxc1qw')
var settingSheet  = activeTracker.getSheetByName('Setting')
var folderId = settingSheet.getRange('I1').getValue()
var masterSheet = activeTracker.getSheetByName('Master of Expense Request')



function sendMailwithPDF(){

var ss = SpreadsheetApp.getActive();

var sheetName = ss.getSheetName();

if(sheetName != "Setting" && sheetName != "Template"){

Logger.log(mailInputs)

var pdfURL = getPDF(sheetName ,49)

Logger.log(pdfURL)

   DriveApp.createFile(DriveApp.getFileById(pdfURL[1])).moveTo(DriveApp.getFolderById(folderId))

var file = DriveApp.getFileById(pdfURL[1]);


  var folder = DriveApp.getFolderById(folderId);
  var newFile = file.moveTo(folder);
  var newFileUrl = newFile.getUrl();

Logger.log(newFileUrl)

var msg = mailInputs[2].replace("<<PDF>>", newFileUrl)

// GmailApp.sendEmail(mailInputs[0] ,mailInputs[1],msg)

WhatsappAutomation.sendMessage(number,wMSG,newFileUrl,[api])

masterSheet.getRange(masterSheet.getLastRow()+1,1,1,3).setValues([[emp,month,newFileUrl]])

}
else{
  SpreadsheetApp.getUi().alert('This is Not a Correct Sheet')
}

}











