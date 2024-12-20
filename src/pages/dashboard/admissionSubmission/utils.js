export function admissionDataJsonToCSV(data) {
  let csv = "";

  let headers = [
    "admissionType",
    "branch",
    "studentName",
    "studentNameBangla",
    "class",
    "session",
    "fatherName",
    "fatherOccupation",
    "fatherYearlyIncome",
    "fatherContactNo",
    "motherName",
    "motherOccupation",
    "motherContactNo",
    "dateOfBirth",
    "bloodGroup",
    "height",
    "weight",
    "idendificationMark",
    "presentAddress",
    "permanentAddress",
    "emergencyContactNo",
    "relationWithEmergencyContact",
    "previousInstution",
  ];
  csv += headers.join(",") + "\n";

  data.forEach(function (row) {
    let rowData = headers.map((header) => row[header]).join(",");
    csv += rowData + "\n";
  });

  return csv;
}
