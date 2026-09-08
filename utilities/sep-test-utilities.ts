import { Page, test as base, expect } from "@playwright/test";
import dotenv from "dotenv";
import { BasePage } from "../pages/BasePage";
import { StartApplicationPage } from "../pages/StartApplicationPage";
import { PaymentPlanPage } from "../pages/PaymentPlanPage";
import { ReviewPaymentPage } from "../pages/ReviewPaymentPage";

dotenv.config();

//Extends the base test with custom UI setup for SEP application.
export const test = base.extend( {page: async ({ page }, use: Function) => {

    const targetUrl = process.env.SEP_QA_URL;
    if (!targetUrl) {
      throw new Error(
        "SEP_QA_URL environment variable is not defined. Please ensure SEP_QA_URL is set in your .env file or environment variables."
      );
    }

    const authToken = Buffer.from(`${process.env.SEP_USERNAME}:${process.env.SEP_PASSWORD}`).toString("base64");
    await page.setExtraHTTPHeaders({ Authorization: `Basic ${authToken}` });
    await page.goto(targetUrl);
    await page.waitForLoadState("networkidle");
    expect(await page.title()).toBe("Checkout | Cydeo");


    BasePage.setPage(page); // Set the page in BasePage for global access
    await use(page); // Use the page in the test functions
  },

});


export { expect, test as describe }; // Export commonly used Playwright test functions


export class CommonUI {

  private static starteAppPage: StartApplicationPage;
  private static paymentPlanPage: PaymentPlanPage;
  private static reviewPaymentPage: ReviewPaymentPage;

  // Completes the start application form with provided or default user information.
  static async completeStartApplicationForm(page: Page, firstName: string = "John", lastName: string = "Doe",
    email: string = "John.Doe@example.com", phoneNumber: string = "123456790") {
    this.starteAppPage = new StartApplicationPage(page);
    await this.starteAppPage.enterFirstName(firstName);
    await this.starteAppPage.enterLastName(lastName);
    await this.starteAppPage.enterEmail(email);
    await this.starteAppPage.enterPhoneNumber(phoneNumber);
    await this.starteAppPage.selectHowDidYouHearAboutUs("Email");
    await this.starteAppPage.clickNextButton();
  }

  // Selects a payment with provided or default payment plan after completing the start application form.
  static async completeSelectingPaymentPlan(page: Page, paymentPlanType: string = "upfront") {
    this.paymentPlanPage = new PaymentPlanPage(page);
    await this.paymentPlanPage.selectPaymentPlan(paymentPlanType);
    await this.paymentPlanPage.clickNextButton();
  }

  // Enters credit card info with provided or default card information on the payment review page.
  static async completeEnteringCardInformation(page: Page,
    cardNumber: string = process.env.CARD_NUMBER ?? "",
    expirationDate: string = process.env.CARD_EXPIRATION_DATE ?? "",
    cvc: string = process.env.CARD_SECURITY_CODE ?? "",
    zipCode: string = process.env.ZIP_CODE ?? ""
  ) {
    this.reviewPaymentPage = new ReviewPaymentPage(page);
    await this.reviewPaymentPage.enterCardNumber(cardNumber);
    await this.reviewPaymentPage.enterExpiryDate(expirationDate);
    await this.reviewPaymentPage.enterCVC(cvc);
    await this.reviewPaymentPage.enterZipCode(zipCode);
  }

}
