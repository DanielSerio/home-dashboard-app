import { type Component } from "solid-js";

export interface IconProps {
  name: string;
}

const Icon: Component<IconProps> = (props) => {
  //@ts-ignore;
  return <ion-icon name={props.name} />;
};

export default Icon;

