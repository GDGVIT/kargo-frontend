import ResourceDetails from "../Resource/ResourceDetails/ResourceDetails";

export default interface Resources {
  requests?: ResourceDetails;
  limits?: ResourceDetails;
}
