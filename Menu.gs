function onOpen(){
  const ui = SpreadsheetApp.getUi()
      ui.createMenu('Automation')
  .addItem('Create Sheet', "createSheet")
  .addItem('Send Expense Report', "sendMailwithPDF")
  .addToUi()
}


function createSheet() {
// Logger.log(month)
temp.activate()
if(sheets.indexOf(month) == -1 ){
var newSheet =  ss.duplicateActiveSheet()
  newSheet.setName(month);
}
else {
SpreadsheetApp.getUi().alert("Error ", "Sheet Already Present",SpreadsheetApp.getUi().ButtonSet.OK)
}
}


function getAllSheetNames() {
  const spreadsheet = SpreadsheetApp.getActive();
  const sheets = spreadsheet.getSheets();
  const sheetNames = [];

  for (let i = 0; i < sheets.length; i++) {
    const sheetName = sheets[i].getName();
    sheetNames.push(sheetName);
  }
// Logger.log(sheetNames);
return sheetNames
}

var sheets = getAllSheetNames();



function getPDF(sheetName,lastRow){
var ss = SpreadsheetApp.getActive();
sheet = ss.getSheetByName(sheetName); 
const url = `https://docs.google.com/spreadsheets/d/${ss.getId()}/export?format=pdf&landscape=true&range=A1:P${lastRow}&gid=${sheet.getSheetId()}`;
const pdfBlob = UrlFetchApp.fetch(url, { headers: { authorization: "Bearer " + ScriptApp.getOAuthToken() } }).getBlob().setName(month+".pdf");
var file = DriveApp.createFile(pdfBlob);
var fileUrl = file.getUrl();
var fileId = file.getId()
// Logger.log(fileUrl);
return [fileUrl,fileId];
}


