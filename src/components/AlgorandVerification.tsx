import React, { useState } from "react";

export function AlgorandVerification({ email }: { email: string }) {
  const [txId, setTxId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleVerify = async () => {
    setLoading(true);
    setError(null);
    setTxId(null);
    try {
      const res = await fetch("/api/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (data.txId) {
        setTxId(data.txId);
      } else {
        setError(data.error || "Unknown error");
      }
    } catch (e: any) {
      setError(e.message || "Network error");
    }
    setLoading(false);
  };

  return (
    <div className="bg-white/10 rounded-xl p-4 my-4">
      <div className="font-semibold mb-2">Blockchain Verification (Algorand Demo)</div>
      <button
        onClick={handleVerify}
        disabled={loading}
        className="bg-green-500/80 hover:bg-green-600/90 text-white px-4 py-2 rounded shadow"
      >
        {loading ? "Verifying..." : "Verify on Algorand"}
      </button>
      {txId && (
        <div className="mt-2 text-green-300">
          Verified!{" "}
          <a
            href={`https://testnet.explorer.perawallet.app/tx/${txId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            View on Pera Explorer
          </a>
        </div>
      )}
      {error && <div className="mt-2 text-red-400">{error}</div>}
    </div>
  );
}
