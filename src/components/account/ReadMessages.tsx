"use client";
import { useEffect } from "react";
import { markRead } from "@/app/compte/actions";
export function ReadMessages({ id, through, from }: { id: string; through: number; from: number }) {
  useEffect(() => {
    if (!through) return;
    const data = new FormData(); data.set("id", id); data.set("through", String(through)); data.set("from", String(from));
    void markRead(data).catch(() => {});
  }, [id, through, from]);
  return null;
}
