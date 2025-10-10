import ResourceDetails from '../Resource/Resource';

export default interface Resources {
  requests?: ResourceDetails;
  limits?: ResourceDetails;
}
