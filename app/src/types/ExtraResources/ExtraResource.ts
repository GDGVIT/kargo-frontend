import Resource from "../Resource/Resource";

export default interface ExtraResource {
  requests?: Resource;
  limits?: Resource;
}
