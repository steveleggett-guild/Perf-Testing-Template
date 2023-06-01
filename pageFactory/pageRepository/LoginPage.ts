import { LoginPageObjects } from "../objectRepository/LoginPageObject";
import { NAVIGATIONPARAMS } from "../objectRepository/WebActionsObjects";
import { WebActions } from "../../lib/WebActions";
import { Page } from '@playwright/test';

let webActions: WebActions;

export class LoginPage extends LoginPageObjects{
    readonly page: Page;

    constructor(page: Page) {
        super();
        this.page = page;
        webActions = new WebActions(this.page);
    }

    async navigateTo(baseUrl:string|undefined): Promise<void> {
        await webActions.navigateToURL(baseUrl+'/login'), { waitUntil: 'networkidle' };
    }

    async loginUsingForm(username: string, password: string): Promise<void> {
        await webActions.enterElementText(LoginPageObjects.USERNAME, username);
        await webActions.enterElementText(LoginPageObjects.PASSWORD, password);
        await webActions.clickElement(LoginPageObjects.SIGN_IN_BUTTON);
    }

    async verifyUserIsLoggedIn(): Promise<void> {
        await webActions.waitForPageNavigation(NAVIGATIONPARAMS.load);

        try {
            const pageHeader = await webActions.getElementText('header');
            if((pageHeader.length > 0))
            {
                if(!pageHeader.includes('Verify'))
                {
                    await webActions.verifyElementContainsText(LoginPageObjects.HELLOMSG, 'Hello');
                }
            }
        } catch (error) {
            await this.page.context().tracing.stop({
                path: "./test-results/setup-trace.zip",
              });
              await this.page.close();
              console.log("Error received in verifyUserIsLoggedIn(): ", error);
              throw error;
        }      
    }
}