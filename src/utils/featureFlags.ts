import 'dotenv/config';
import { FEATURE_FLAGS_CONFIG } from '~/features';

export function isFeatureEnabled(featureName: string): boolean {
  if (process.env[`FEAT_${featureName}`] === 'true') {
    return true;
  }

  return FEATURE_FLAGS_CONFIG[featureName] ?? false;
}

export default {
  isFeatureEnabled,
};
