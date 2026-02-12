type ButtonConfig = {
  label: string;
  backgroundColor: string;
  onClick: (utm_medium?: string) => void;
};

export type AlertConfig = {
  image: React.ReactNode;
  description: string | React.ReactNode;
  additionalText?: string | React.ReactNode;
  buttonConfig: ButtonConfig;
  errorMessage?: string;
  onClose?: () => void;
  utm_medium?: string;
};
