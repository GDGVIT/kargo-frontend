import Resource from "./Resource";

// ExtraResource type for additional user resources
export default interface ExtraResource {
  requests?: Resource;
  limits?: Resource;
}
