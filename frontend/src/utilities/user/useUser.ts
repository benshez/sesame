import Session from "supertokens-web-js/recipe/session";

export const useUser = () => {

  const hasClaim = async (claimId: string) => {
    const claims = await Session.validateClaims();
    let verified = claims.length === 0;

    claims.forEach(claim => {
      if (claim.id === claimId) verified = false;
    })

    return verified;
  }

  return {
    hasClaim
  }
}