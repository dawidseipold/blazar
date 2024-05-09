import AccountDetailsForm from "@/components/onboarding/account-details-form";
import { checkIfStepCompleted } from "@/utils/onboarding";

interface OnboardingAccountDetailsPageProps {}

const OnboardingAccountDetailsPage =
  async ({}: OnboardingAccountDetailsPageProps) => {
    await checkIfStepCompleted("account-details");

    return (
      <div>
        <h1>Account Details</h1>

        <AccountDetailsForm />
      </div>
    );
  };

export default OnboardingAccountDetailsPage;
