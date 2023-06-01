// import test from "../../lib/BaseTest";
// import { allure, LabelName } from "allure-playwright";
// import { IStudentProgressDetails } from "../../pageFactory/objectRepository/StudentsPageObjects";
// import { expect } from "@playwright/test";

// test.afterAll(async ({ studentsPage }) => {
//   studentsPage.deleteStudentsCsvFile();
// });

// test.describe("Download Student Progress data file @slyfe", () => {
//   test.use({ storageState: "memberStorageState.json" });
//   test("Verify that user is able to download accurate student progress from filtered criteria", async ({
//     studentsPage,
//   }) => {
//     let studentProgressTableObject: Array<IStudentProgressDetails> = [];
//     let downloadedStudentProgressData: Array<IStudentProgressDetails> = [];
//     allure.label({ name: LabelName.EPIC, value: "Academic Pillar Automation" });
//     allure.owner("Academic QE Team");
//     allure.link({
//       url: "https://app.shortcut.com/guild/story/322687/playwright-research-and-add-reporting",
//       name: "Jira story link",
//     });
//     await test.step("Navigate to Students page", async () => {
//       await studentsPage.navigateTo();
//       await studentsPage.verifyUserIsOnStudentsPage();
//       await studentsPage.verifyUserIsOnProgressSubHeader();
//     });

//     await test.step("Download student csv file for a specific employer", async () => {
//       await studentsPage.selectEmployerFromList("Walmart");
//       await studentsPage.verifyStudentsTableDataIsReturned();
//       await studentsPage.verifyFilteredEmployeeIsReturned();
//       studentProgressTableObject = await studentsPage.getStudentProgressTableDetails();
//       expect(studentProgressTableObject.length, 'Student records are displayed in the table').toBeGreaterThan(0);
//       await studentsPage.downloadStudentsFilteredRecords();
//     });

//     await test.step("Verify that downloaded csv file has user filtered records", async () => {
//       downloadedStudentProgressData = await studentsPage.parseDownloadedCSVFileToStudentProgressDetails();
//       expect(downloadedStudentProgressData.length, 'Student records exist in CSV table').toBeGreaterThan(0);
//       expect(downloadedStudentProgressData.length, 'The number of expected student records match').toEqual(studentProgressTableObject.length);
//       expect(downloadedStudentProgressData, 'Downloaded student CSV data matches the UI table data').toEqual(studentProgressTableObject);
//     });
// })
// })
