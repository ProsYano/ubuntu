import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
export const alt = "Ubuntu Location BTP — Location d’engins à Brazzaville";
export const size = {width:1200,height:630};
export const contentType = "image/png";
export default async function Image() {
  const logo = await readFile(join(process.cwd(), "public/branding/ubuntu-location-btp.jpg"));
  const logoSrc = `data:image/jpeg;base64,${logo.toString("base64")}`;
  return new ImageResponse(<div style={{display:"flex",flexDirection:"column",justifyContent:"space-between",width:"100%",height:"100%",background:"#28231d",color:"white",padding:"65px",borderBottom:"18px solid #edb522"}}><div style={{display:"flex",alignItems:"center",gap:24,fontSize:26,letterSpacing:5,color:"#edb522"}}><img src={logoSrc} width={128} height={128} alt="Ubuntu Location BTP" />UBUNTU LOCATION BTP</div><div style={{display:"flex",flexDirection:"column",fontSize:68,fontWeight:700,lineHeight:1.12}}><div style={{display:"flex"}}>La force de vos chantiers,</div><div style={{display:"flex",color:"#edb522"}}>notre engagement.</div></div><div style={{display:"flex",justifyContent:"space-between",fontSize:23,color:"#e2d9ca"}}><span>Location d’engins · Brazzaville</span><span>066 962 397</span></div></div>,size);
}
