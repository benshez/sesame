
export interface IMenuOption {
  icon?: string;
  text: string;
  link: string;
  children?: Array<IMenuOption>;
  visible: boolean;
  isActive?: boolean | undefined | unknown;  
  isOpen?: boolean;
}