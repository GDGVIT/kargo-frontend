import Resource from "./Resource";

export default interface ExtraResource {
  requests?: Resource;
  limits?: Resource;
}
