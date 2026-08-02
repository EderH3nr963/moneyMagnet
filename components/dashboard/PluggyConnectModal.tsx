"use client";

import dynamic from "next/dynamic";
import type { Item as PluggyItem } from "pluggy-js";

const PluggyConnect = dynamic(
  () =>
    import("react-pluggy-connect").then((module) => module.PluggyConnect),
  { ssr: false },
);

interface PluggyConnectModalProps {
  connectToken: string | null;
  onSuccess: () => void;
  onClose: () => void;
  onError: (message?: string) => void;
  onLoadError: () => void;
}

export default function PluggyConnectModal({
  connectToken,
  onSuccess,
  onClose,
  onError,
  onLoadError,
}: PluggyConnectModalProps) {
  if (!connectToken) return null;

  return (
    <PluggyConnect
      connectToken={connectToken}
      language="pt"
      theme="dark"
      includeSandbox={process.env.NODE_ENV !== "production"}
      products={["ACCOUNTS", "TRANSACTIONS"]}
      onSuccess={onSuccess}
      onClose={onClose}
      onError={({ message }) => onError(message)}
      onLoadError={onLoadError}
    />
  );
}
