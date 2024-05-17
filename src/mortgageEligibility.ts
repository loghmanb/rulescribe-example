import { Engine, Lexer, EngineScope } from "rulescribe";

const rule = `
Rule "Prime Mortgage Eligibility"
When
    applicant.creditScore >= 700
    And applicant.debtToIncomeRatio <= 0.4
    And property.appraisalValue >= 200000
Then
    eligible(application, "prime mortgage")
End

Rule "Standard Mortgage Eligibility"
When
    applicant.creditScore >= 600
    And applicant.debtToIncomeRatio <= 0.5
    And property.appraisalValue >= 150000
    And application.eligibility != "prime mortgage"
Then
    eligible(application, "standard mortgage")
End

Rule "Subprime Mortgage Eligibility"
When
    applicant.creditScore >= 500
    And applicant.debtToIncomeRatio <= 0.6
    And property.appraisalValue >= 100000
    And application.eligibility != "prime mortgage"
    And application.eligibility != "standard mortgage"
Then
    eligible(application, "subprime mortgage")
End
`;

type Applicant = {
    creditScore: number;
    debtToIncomeRatio: number;
}

type Property = {
    appraisalValue: number;
}

type Application = {
    applicant: Applicant;
    property: Property;
    eligibility: string | boolean;
}

const eligible = async (application: Application, eligibility: string) => {
    if (application.eligibility === false)
        application.eligibility = eligibility;
}
  
const mortgageEligibilityRulescribe = async (application: Application) => {
    const scope = new EngineScope();
    scope.builtinFunction.set("eligible", {
        func: eligible
    });
    const lexer = new Lexer(rule, scope);
    const engine = new Engine(lexer);
    await engine.parse(scope);
    scope.define('application', application);
    scope.define('applicant', application.applicant);
    scope.define('property', application.property);
    await engine.fire(scope);
}

const testRulescribeForMortgageEligibility = async () => {
    const applications: Application[] = [
        {
            applicant: { creditScore: 800, debtToIncomeRatio: .2 },
            property: { appraisalValue: 220000 },
            eligibility: false
        },
        {
            applicant: { creditScore: 800, debtToIncomeRatio: .55 },
            property: { appraisalValue: 182000 },
            eligibility: false
        },
    ];

    for (let i=0; i<applications.length; i+=1) {
        await mortgageEligibilityRulescribe(applications[i]);
    }
    console.log(applications);
}

export default testRulescribeForMortgageEligibility;
