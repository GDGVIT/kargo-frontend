import type Resource from "../Resource";

export default interface ResourceLimits {
  allowed: {
    requests: Resource;
    limits: Resource;
  };
  usage: {
    requests: Resource;
    limits: Resource;
  };
}
