import Resource from "../Application/Resource/ResourceDetails/ResourceDetails";

export default interface ExtraResource {
  requests?: Resource;
  limits?: Resource;
}
