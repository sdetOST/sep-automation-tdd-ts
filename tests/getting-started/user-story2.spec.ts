import { PaymentPlanPage } from "../../pages/PaymentPlanPage";
import { StartApplicationPage } from "../../pages/StartApplicationPage";
import { test, expect } from "../../utilities/sep-test-utilities";

test.describe('User story 2', () => {

    let startApplicationPage: StartApplicationPage;
    let paymentPlanPage: PaymentPlanPage;

    test.beforeEach(async ({ page }) => {
        startApplicationPage = new StartApplicationPage(page);
        paymentPlanPage = new PaymentPlanPage(page);
    })
    


    test('01', async ({ page }) => {
        
    });

    test('02', async ({ page }) => {
        
    });

    test('03', async ({ page }) => {
        
    });

    test('04', async ({ page }) => {
        
    });

    test('05', async ({ page }) => {
        
    });
    
    
})

