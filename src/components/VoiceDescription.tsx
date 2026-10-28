"use client";
import { useEffect, useRef, useState } from "react";

const MAX_BYTES = 4 * 1024 * 1024;
export function VoiceDescription({ onAudioChange, onBusyChange }: { onAudioChange: (file: File | null) => void; onBusyChange: (busy: boolean) => void }) {
  const recorder = useRef<MediaRecorder | null>(null);
  const stream = useRef<MediaStream | null>(null);
  const mounted = useRef(true);
  const [status, setStatus] = useState<"idle" | "starting" | "recording">("idle");
  const [seconds, setSeconds] = useState(0);
  const [audio, setAudio] = useState<Blob | null>(null);
  const [url, setUrl] = useState("");
  const preview = useRef("");
  const [error, setError] = useState("");
  useEffect(() => { mounted.current = true; return () => { mounted.current = false; if (recorder.current?.state === "recording") recorder.current.stop(); stream.current?.getTracks().forEach(track => track.stop()); URL.revokeObjectURL(preview.current); }; }, []);

  useEffect(() => {
    if (status !== "recording") return;
    const timer = setInterval(() => setSeconds(value => value + 1), 1000);
    const limit = setTimeout(() => recorder.current?.state === "recording" && recorder.current.stop(), 120000);
    return () => { clearInterval(timer); clearTimeout(limit); };
  }, [status]);
  async function start() {
    setError("");
    if (!navigator.mediaDevices?.getUserMedia || typeof MediaRecorder === "undefined") { setError("L’enregistrement n’est pas disponible ici. Utilisez le champ texte ou un navigateur récent en HTTPS."); return; }
    setStatus("starting"); onBusyChange(true);
    try {
      const source = await navigator.mediaDevices.getUserMedia({ audio: true });
      if (!mounted.current) { source.getTracks().forEach(track => track.stop()); return; }
      stream.current = source;
      const type = ["audio/webm;codecs=opus", "audio/mp4", "audio/ogg;codecs=opus"].find(value => MediaRecorder.isTypeSupported(value));
      if (!type) throw new Error("unsupported");
      const instance = new MediaRecorder(source, { mimeType: type, audioBitsPerSecond: 64000 });
      recorder.current = instance;
      const chunks: Blob[] = []; let size = 0;
      instance.ondataavailable = event => { chunks.push(event.data); size += event.data.size; if (size > MAX_BYTES && instance.state === "recording") instance.stop(); };
      instance.onstop = () => {
        source.getTracks().forEach(track => track.stop());
        if (!mounted.current) return;
        setStatus("idle"); onBusyChange(false);
        const blob = new Blob(chunks, { type: instance.mimeType });
        if (!blob.size || blob.size > MAX_BYTES) { setError("Enregistrement vide ou trop volumineux. Merci de réessayer avec un message plus court."); return; }
        const extension = blob.type.includes("mp4") ? "mp4" : blob.type.includes("ogg") ? "ogg" : "webm";
        URL.revokeObjectURL(preview.current); preview.current = URL.createObjectURL(blob); setUrl(preview.current);
        setAudio(blob); onAudioChange(new File([blob], `message-vocal.${extension}`, { type: blob.type }));
      };
      instance.onerror = () => { setError("L’enregistrement a été interrompu. Merci de réessayer."); if (instance.state !== "inactive") instance.stop(); source.getTracks().forEach(track => track.stop()); setStatus("idle"); onBusyChange(false); };
      instance.start(1000); setSeconds(0); setStatus("recording");
    } catch {
      stream.current?.getTracks().forEach(track => track.stop()); setStatus("idle"); onBusyChange(false);
      setError("Impossible d’accéder au microphone. Autorisez-le dans votre navigateur ou décrivez votre besoin par écrit.");
    }
  }
  return <div className="voice-description">
    <div className="voice-description-heading"><span className="voice-mic" aria-hidden="true"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="9" y="2" width="6" height="12" rx="3"/><path d="M5 10v2a7 7 0 0 0 14 0v-2M12 19v3M8 22h8"/></svg></span><div><strong>Expliquez votre projet de vive voix</strong><p>Un message vocal, seul ou en complément de votre texte. 2 minutes maximum.</p></div></div>
    <div className="voice-description-actions">{status === "recording" ? <button className="button voice-stop" type="button" onClick={() => recorder.current?.stop()}>Arrêter l’enregistrement</button> : <button className="button button-neutral" type="button" disabled={status === "starting"} onClick={start}>{status === "starting" ? "Accès au microphone…" : audio ? "Réenregistrer" : "Enregistrer un message vocal"}</button>}<span role="status" aria-live="polite">{status === "recording" ? `Enregistrement en cours · ${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}` : audio ? "Message vocal prêt à être envoyé" : "Microphone activé uniquement à votre demande"}</span></div>
    {url && <div className="voice-preview"><audio controls src={url} aria-label="Écouter votre message vocal"/><button type="button" className="text-link" onClick={() => { URL.revokeObjectURL(preview.current); preview.current = ""; setUrl(""); setAudio(null); onAudioChange(null); }}>Supprimer le vocal</button></div>}
    {error && <p className="form-error" role="alert">{error}</p>}
  </div>;
}
