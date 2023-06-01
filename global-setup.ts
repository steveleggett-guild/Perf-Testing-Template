import { chromium, FullConfig } from "@playwright/test";
import { LoginPage } from "./pageFactory/pageRepository/LoginPage";
import { WebActions } from "./lib/WebActions";
import { retrieveSecret } from "./lib/Helpers";

async function globalSetup(config: FullConfig) {
  const { baseURL } = config.projects[0].use;
  const browser = await chromium.launch();
  const secrets = JSON.parse(await retrieveSecret());

  // Create reusable login for admin role.
  // When creating a new test, add the following to the test file in test.describe section: 
  // test.use({ storageState: "guildSuperUserStorageState.json" }); 

  const adminPage = await browser.newPage();
  const webActions = new WebActions(adminPage);
  const password = await webActions.decipherPassword(secrets.MASTER_PASSWORD);
  const adminAuth = new LoginPage(adminPage);
  try {
    await adminPage
      .context()
      .tracing.start({ screenshots: true, snapshots: true });
    await adminAuth.navigateTo(baseURL);
    await adminAuth.loginUsingForm(
      secrets.GUILD_SUPER_USER,
      password);
    await adminAuth.verifyUserIsLoggedIn();
    // Save signed-in state to 'storageState.json'.
    await adminPage.context().storageState({ path: "guildSuperUserStorageState.json" });
    await adminPage.context().tracing.stop({
      path: "./test-results/setup-trace.zip",
    });
  } catch (error) {
    await adminPage.context().tracing.stop({
      path: "./test-results/setup-trace.zip",
    });
    await adminPage.close();
    throw error;
  }
}

export default globalSetup;
