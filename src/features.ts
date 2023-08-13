export enum FeatureFlag {
  map = 'MAP',
}

export const FEATURE_FLAGS_CONFIG: Record<FeatureFlag, boolean> = {
  [FeatureFlag.map]: false,
};
