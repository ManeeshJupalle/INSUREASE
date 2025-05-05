// components/EmailModal.tsx
"use client";

import { useState } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  chatTranscript: string;
}

export default function EmailModal({ isOpen, onClose, chatTranscript }: Props) {
  const [toEmail, setToEmail] = useState("");
  const [sending, setSending] = useState(false);

  // Use your Public Key env var here:
  const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!;
  const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!;
  const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!;

  const handleSend = async () => {
    if (!/\S+@\S+\.\S+/.test(toEmail)) {
      alert("Please enter a valid email address.");
      return;
    }
    setSending(true);

    try {
      const res = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service_id: SERVICE_ID,
          template_id: TEMPLATE_ID,
          user_id: PUBLIC_KEY,       // <<< use PUBLIC_KEY here
          template_params: {
            to_email: toEmail,
            subject: "Your Medicare Chat Transcript",
            message: chatTranscript,
          },
        }),
      });

      const text = await res.text();
      if (!res.ok) {
        console.error("EmailJS REST error:", res.status, text);
        throw new Error(`Status ${res.status}: ${text}`);
      }

      console.log("EmailJS REST success:", text);
      alert("Email sent successfully!");
      onClose();
    } catch (err: any) {
      console.error("EmailJS REST failed:", err);
      alert(`Failed to send email: ${err.message}`);
    } finally {
      setSending(false);
    }
  };

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative m-auto w-96 bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-lg font-semibold mb-4">Email This Chat</h2>
        <label className="block mb-1">Recipient Email</label>
        <input
          type="email"
          value={toEmail}
          onChange={(e) => setToEmail(e.target.value)}
          placeholder="you@example.com"
          className="w-full border px-3 py-2 rounded mb-4"
          disabled={sending}
        />
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded"
            disabled={sending}
          >
            Cancel
          </button>
          <button
            onClick={handleSend}
            className={`px-4 py-2 rounded ${
              sending ? "bg-gray-300 text-gray-600" : "bg-gray-900 text-white"
            }`}
            disabled={sending}
          >
            {sending ? "Sending…" : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
}
