# Rulescribe examples

In this repository, you'll find example use cases that demonstrate how to integrate RuleScribe into your project. These examples are designed to illustrate real-world scenarios where RuleScribe can be applied effectively.

### Use Cases

#### 1. Pay Now, Buy Later (buyNowPayLater.ts)

This example showcases how RuleScribe can be used in an e-commerce context to implement a "Buy Now, Pay Later" feature. In this scenario, customers have the option to purchase items immediately and defer payment for a specified period. The rules defined in `buyNowPayLater.ts` govern when customers are eligible for this payment option based on various criteria such as:

- Total order value
- Number of items in the cart
- Customer's credit score
- Payment history
- Other relevant factors

By leveraging RuleScribe, you can dynamically determine whether to offer the "Buy Now, Pay Later" option to customers during checkout, providing them with flexibility and convenience while ensuring responsible credit management.

#### 2. Mortgage Eligibility (mortgageEligibility.ts)

This example showcases how RuleScribe can revolutionize mortgage eligibility assessment in the banking sector. By leveraging RuleScribe, financial institutions can efficiently evaluate applicants' eligibility for different mortgage types based on predefined criteria. Let's explore the rules outlined in `mortgageEligibility.rs`:

**Rule "Prime Mortgage Eligibility"**
- **Conditions**:
    - Applicant's credit score is greater than or equal to 700.
    - Applicant's debt-to-income ratio is less than or equal to 0.4.
    - Property appraisal value is greater than or equal to $200,000.
- **Action**:
    - Eligible applicants are granted access to prime mortgage options.

**Rule "Standard Mortgage Eligibility"**
- **Conditions**:
    - Applicant's credit score is greater than or equal to 600.
    - Applicant's debt-to-income ratio is less than or equal to 0.5.
    - Property appraisal value is greater than or equal to $150,000.
    - Applicants are not eligible for prime mortgages.
- **Action**:
    - Eligible applicants qualify for standard mortgage offerings.

**Rule "Subprime Mortgage Eligibility"**
- **Conditions**:
    - Applicant's credit score is greater than or equal to 500.
    - Applicant's debt-to-income ratio is less than or equal to 0.6.
    - Property appraisal value is greater than or equal to $100,000.
    - Applicants are not eligible for prime or standard mortgages.
- **Action**:
    - Eligible applicants are offered subprime mortgage solutions.

### Real-World Integration

In practice, rules managed by RuleScribe are often stored in databases, file systems, or other storage solutions. Additionally, APIs may be implemented to facilitate communication between the application and RuleScribe, allowing for synchronous or asynchronous rule execution.

For example, RuleScribe could be triggered to evaluate rules in response to specific events within the e-commerce platform, such as:

- User registration
- Adding items to the shopping cart
- Initiating the checkout process
- Completing a purchase

By integrating RuleScribe with event-driven architecture, you can automate decision-making processes and enhance the user experience across various touchpoints within your application.

These examples provide a glimpse into the versatility and utility of RuleScribe in real-world applications, empowering developers to implement complex business logic with ease and efficiency.
