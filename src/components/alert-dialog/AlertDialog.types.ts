type ButtonConfig = {
  label: string;
  backgroundColor: string;
  onClick: () => void;
};

export type AlertConfig = {
  image: React.ReactNode;
  description: string;
  buttonConfig: ButtonConfig;
  errorMessage?: string;
  onClose?: () => void;
};
