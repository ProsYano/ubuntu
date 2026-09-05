"use client";

import { usePathname } from "next/navigation";
import { SITE } from "@/lib/constants";

function WhatsAppIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2a9.8 9.8 0 0 0-8.42 14.82L2 22l5.31-1.52A9.93 9.93 0 1 0 12 2Zm0 17.82a7.8 7.8 0 0 1-3.98-1.08l-.29-.17-3.15.9.92-3.06-.19-.31A7.72 7.72 0 1 1 12 19.82Zm4.25-5.77c-.23-.12-1.38-.68-1.6-.76-.21-.08-.37-.12-.52.12-.16.23-.6.76-.74.91-.14.16-.27.18-.51.06-.23-.12-.98-.36-1.87-1.15a7.02 7.02 0 0 1-1.3-1.62c-.13-.23-.01-.36.1-.48.1-.1.23-.27.35-.41.12-.14.16-.23.23-.39.08-.15.04-.29-.02-.41-.06-.12-.52-1.26-.72-1.73-.19-.45-.38-.39-.52-.4h-.45a.86.86 0 0 0-.62.29c-.21.23-.81.79-.81 1.93s.83 2.24.95 2.4c.12.15 1.63 2.49 3.95 3.49.55.24.98.38 1.32.49.56.17 1.06.15 1.46.09.45-.07 1.38-.56 1.57-1.11.2-.55.2-1.03.14-1.12-.06-.1-.22-.16-.45-.27Z"/></svg>;
}

function EmailIcon() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/></svg>;
}

export function ContactDock() {
  const pathname = usePathname();
  if (["/gestion", "/connexion", "/auth", "/compte", "/mot-de-passe-oublie"].some(path => pathname.startsWith(path))) return null;

  const whatsappNumber = `242${SITE.phones[0].replaceAll(" ", "")}`;
  const whatsappMessage = "Bonjour Ubuntu Location BTP, je souhaite obtenir des informations pour mon chantier.";
  const emailSubject = "Demande d’informations — Ubuntu Location BTP";
  const emailBody = "Bonjour Ubuntu Location BTP,\n\nJe souhaite échanger avec votre équipe au sujet de mon chantier.\n\nNature des travaux :\nÉquipement recherché :\nLieu du chantier :\nDates souhaitées :\n\nCordialement,";

  return <aside className="contact-dock" aria-label="Contacter Ubuntu Location BTP">
    <a className="contact-channel contact-channel-whatsapp" href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`} target="_blank" rel="noopener noreferrer" aria-label="Échanger avec Ubuntu Location BTP sur WhatsApp">
      <span className="contact-channel-icon"><WhatsAppIcon/></span>
      <span className="contact-channel-copy"><strong>WhatsApp</strong><small>Réponse rapide</small></span>
    </a>
    <a className="contact-channel contact-channel-email" href={`mailto:${SITE.email}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`} aria-label="Écrire un e-mail à Ubuntu Location BTP">
      <span className="contact-channel-icon"><EmailIcon/></span>
      <span className="contact-channel-copy"><strong>E-mail</strong><small>Décrire mon projet</small></span>
    </a>
  </aside>;
}
