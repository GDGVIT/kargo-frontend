import Resource from '../../types/Application/Resource/Resource';

export default interface Plan {
  _id: string;
  name: string;
  description?: string;
  resources: {
    requests?: Resource;
    limits?: Resource;
  };
  isDefault?: boolean;
  isActive?: boolean;
}
