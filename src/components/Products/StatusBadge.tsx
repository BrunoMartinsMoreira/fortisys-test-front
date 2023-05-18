import { Badge } from "@chakra-ui/react";

type BadgeProps = {
  quantity: number;
};
export const StatusBadge = ({ quantity }: BadgeProps) => {
  let status = { color: "red", label: "Crítico" };

  if (quantity > 11 && quantity < 31)
    status = {
      color: "orange",
      label: "Alerta",
    };

  if (quantity > 31)
    status = {
      color: "green",
      label: "OK",
    };

  return (
    <Badge
      variant="solid"
      minW="16"
      textAlign="center"
      fontSize="0.9em"
      p="1"
      colorScheme={status.color}
    >
      {status.label}
    </Badge>
  );
};
