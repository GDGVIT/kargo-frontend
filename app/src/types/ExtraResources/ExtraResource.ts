import Resource from "../Application/Resource/Resource";

export default interface ExtraResource {
  requests?: Resource;
  limits?: Resource;
}
