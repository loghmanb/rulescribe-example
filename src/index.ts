import testRulescribeForBuyNowPayLater from "./buyNowPayLater";
import testRulescribeForMortgageEligibility from "./mortgageEligibility";

(async () => {
    await testRulescribeForBuyNowPayLater();

    await testRulescribeForMortgageEligibility();
})();
