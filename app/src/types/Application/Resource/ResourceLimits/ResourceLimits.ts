import type ResourceLimitDetails from "../ResourceLimitDetails/ResourceLimitDetails";

export default interface ResourceLimits {
  allowed: {
    requests: ResourceLimitDetails;
    limits: ResourceLimitDetails;
  };
  usage: {
    requests: ResourceLimitDetails;
    limits: ResourceLimitDetails;
  };
}
