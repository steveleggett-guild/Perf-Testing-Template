## GUI test automation project using Playwright

This is the mono-repo for academic GUI automation testing.

---

### Ownership & Contact

<table>
  <tr>
    <th>Squad</th>
    <td>Academic QE Pillar </td>
  </tr>
  <tr>
    <th>Slack Channel</th>
    <td>#academic-pillar-qe</td>
  </tr>
  <tr>
    <th>Confluence</th>
    <td><a href="https://guild-education.atlassian.net/wiki/spaces/QE/overview">Guild QE Space</a></td>
  </tr>
</table>

---

### Requirements:
- [Yarn](https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable)
- [Docker](https://docs.docker.com/desktop/install/mac-install/)
- [Homebrew](https://brew.sh/) 

---

### Setup

- Install dependencies: `yarn install`
- Install AWS CLI: `brew install awscli`
- [Configure AWS](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-quickstart.html) by running the following command: `aws configure sso`, use individual values in your AWS service client, can be found in [here](https://guild-identity.awsapps.com/start#/)
- Login to AWS using SSO `aws sso login`

---

### [Playwright documentation](https://playwright.dev/docs/intro)

---

### Reporting
  Allure/HTML Reports to capture test results, more info [here](https://github.com/allure-framework/allure-js/blob/master/packages/allure-playwright/README.md)
  
 --- 

### Terminal commands:

  `yarn aws-staging`
  **Login to AWS using SSO**

  `yarn test`
  **Runs an end-to-end tests in staging.**

  `yarn test --grep @tag`
  **Runs tests only with a specific tag [@afo, @afs, @slyfe, @aas]**

  `yarn test --ui`
  **Runs tests in UI mode. New UI Mode lets you explore, run and debug tests. Comes with a built-in watch mode.**

  `yarn test --project=chromium`
  **Runs tests only on Desktop Chrome.**

  `yarn test example`
  **Runs tests in a specific file.**

  `yarn test --debug`
  **Runs tests in debug mode.**

  `yarn playwright codegen`
  **Auto generate tests with Codegen.**

  `yarn allureReport`
  **Generate and open allure report**
  
  `yarn playwright show-report`
  **Open successful report in Browser**

  `yarn pretest`
  **Compile tests before run**

---

### Running tests via [VS](https://playwright.dev/docs/getting-started-vscode)

---

### Running tests in Docker: 

`docker build -t academic-playwright-testing .`            

`docker run -it academic-playwright-testing yarn playwright test`

---

### Notes about adding new tests:

Testing solution is written in page object pattern. When adding a new test, the following should be kept in mind:

**Object repository** is used to describe selectors and types.
**Page repository** is used to either set the state of the page or get a value to perform an assertion on it, that being said, having an assertion in test file spec.ts. is preferred approach unless it's a complex assertion.

Lib folder contains:
 - **Base test** is used to inject the page under the test in test file spec.ts. 
 - **Helpers** is used for global methods, such as fetching credentials. 
 - **WebActions** is used to abstract common interactions with a web ui, unless newly added method can be applied to any page repository, keep it at the level of the page repository under test. 

 
