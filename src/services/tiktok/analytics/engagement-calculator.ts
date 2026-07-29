export interface EngagementRateInput {
  averageComments: number;
  averageLikes: number;
  averageShares: number;
  followers: number;
}

export interface EngagementRateEstimate {
  estimated: true;
  formula: "(Average likes + Average comments + Average shares) ÷ Followers × 100";
  officialTikTokData: false;
  rate: number;
  substitution: string;
}

function validateNumber(value: number, field: string, allowZero = true) {
  if (!Number.isFinite(value) || value < 0 || (!allowZero && value === 0)) {
    throw new RangeError(
      `${field} must be ${allowZero ? "a non-negative" : "a positive"} number.`,
    );
  }
}

export function calculateFollowerEngagementRate(
  input: EngagementRateInput,
): EngagementRateEstimate {
  validateNumber(input.followers, "followers", false);
  validateNumber(input.averageLikes, "averageLikes");
  validateNumber(input.averageComments, "averageComments");
  validateNumber(input.averageShares, "averageShares");

  const interactions = input.averageLikes + input.averageComments + input.averageShares;
  const rate =
    Math.round(((interactions / input.followers) * 100 + Number.EPSILON) * 100) / 100;

  return {
    estimated: true,
    formula: "(Average likes + Average comments + Average shares) ÷ Followers × 100",
    officialTikTokData: false,
    rate,
    substitution: `(${input.averageLikes} + ${input.averageComments} + ${input.averageShares}) ÷ ${input.followers} × 100`,
  };
}
