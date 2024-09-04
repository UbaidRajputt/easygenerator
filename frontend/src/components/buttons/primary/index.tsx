import { Button } from "rsuite";

type PrimaryButtonProps = {
  type: `button` | `submit` | `reset`;
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  isLoading?: boolean;
};

export const PrimaryButton = ({
  type = `button`,
  onClick,
  children,
  disabled = false,
  isLoading = false,
}: PrimaryButtonProps) => {
  return (
    <Button
      color="orange"
      appearance="primary"
      type={type}
      onClick={onClick}
      disabled={disabled}
      loading={isLoading}
    >
      {children}
    </Button>
  );
};
