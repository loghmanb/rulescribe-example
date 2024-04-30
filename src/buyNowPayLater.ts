import { Engine, Lexer, EngineScope } from "rulescribe";

const rule = `
Rule "Check Credit Score for Buy Now, Pay Later"
When
    customer.isCheckingOut 
    And customer.creditScore > 700
    And basket.totalValue < 1000
    And basket.numberOfItems < 10
Then

  allowBuyNowPayLater(basket, "up to 3 months")

End

Rule "Check Credit Score and Basket Value"
When
    customer.isCheckingOut
    And customer.creditScore >= 600
    And customer.creditScore <= 699
    And basket.totalValue >= 1000
    And basket.totalValue <= 2000
Then
    allowBuyNowPayLater(basket, "up to 2 months")
End

Rule "Check Number of Items"
When
    customer.isCheckingOut
    And basket.numberOfItems > 10
    And customer.creditScore > 650
Then
    allowBuyNowPayLater(basket, "up to 2 months")
End

Rule "Low Credit Score"
When
    customer.isCheckingOut
    And customer.creditScore < 600
Then
    denyBuyNowPayLater(basket)
End
`;

type Customer = {
    name: string;
    isCheckingOut: boolean;
    creditScore: number;
}

type Basket = {
    customer: Customer;
    numberOfItems: number;
    totalValue: number;
}

const denyBuyNowPayLater = async (basket: Basket) => {
    console.log(`buy now-pay later is disabled for ${basket.customer.name}`);
}
  
const allowBuyNowPayLater = async (basket: Basket, allowance: string) => {
    console.log(`allowance for customer: "${basket.customer.name}" with basket no. of items ${basket.numberOfItems} and total value ${basket.totalValue} is ${allowance}`);
}
  
const basketRulescribe = async (basket: Basket) => {
    const scope = new EngineScope();
    scope.builtinFunction.set("denyBuyNowPayLater", {
        func: denyBuyNowPayLater
    });
    scope.builtinFunction.set("allowBuyNowPayLater", {
        func: allowBuyNowPayLater
    });
    const lexer = new Lexer(rule, scope);
    const engine = new Engine(lexer);
    await engine.parse(scope);
    scope.define('basket', basket);
    scope.define('customer', basket.customer);
    await engine.fire(scope);
}

const testRulescribeForBuyNowPayLater = async () => {
    const baskets: Basket[] = [
        {
            customer: { name: 'Foo Bar', isCheckingOut: true, creditScore: 1200 },
            numberOfItems: 5,
            totalValue: 800
        },
        {
            customer: { name: 'Baz Que', isCheckingOut: true, creditScore: 200 },
            numberOfItems: 2,
            totalValue: 100
        }
    ];

    const result = baskets.map(basketRulescribe);
    await Promise.all(result);
}

export default testRulescribeForBuyNowPayLater;
