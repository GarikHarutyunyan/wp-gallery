type ButtonConfig = {
  label: string;
  backgroundColor: string;
  width?: string;
  onClick: (utm_medium?: string) => void;
};

export type AlertConfig = {
  image?: React.ReactNode;
  title?: string | React.ReactNode;
  description: string | React.ReactNode;
  additionalText?:
    | string
    | React.ReactNode
    | ((utm_medium?: string) => React.ReactNode);
  buttonConfig: ButtonConfig;
  errorMessage?: string;
  onClose?: () => void;
  utm_medium?: string;
};
