import { Archive } from "lucide-react";

import { Button } from "~/components/ui/button";
import { useGame } from "~/contexts/Game";

type Props = {
  disabled?: boolean;
};

export function Export({ disabled }: Props) {
  const { board } = useGame();

  const handleDownload = () => {
    // Convert the board into a JSON string
    const jsonData = JSON.stringify(board);

    // Create a blob from the JSON string
    const blob = new Blob([jsonData], { type: "application/json" });

    // Download the blob as a file
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `game-of-life-export-${new Date().toISOString()}.json`;
    document.body.appendChild(a);
    a.click();

    // Nettoyer
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <Button onClick={handleDownload} disabled={disabled}>
      <Archive />
      Export
    </Button>
  );
}
