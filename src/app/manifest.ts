import type { MetadataRoute } from "next";
import { SITE } from "@/lib/constants";
export default function manifest(): MetadataRoute.Manifest {return {name:SITE.name,short_name:"Ubuntu BTP",description:SITE.description,lang:"fr",start_url:"/",display:"standalone",background_color:"#ffffff",theme_color:"#e9ad16"};}
