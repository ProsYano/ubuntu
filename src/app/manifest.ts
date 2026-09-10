import type { MetadataRoute } from "next";
import { SITE } from "@/lib/constants";
export default function manifest(): MetadataRoute.Manifest {return {name:SITE.name,short_name:"Ubuntu BTP",description:SITE.description,lang:"fr",start_url:"/",display:"standalone",icons:[{src:"/branding/ubuntu-location-btp.jpg",sizes:"1254x1254",type:"image/jpeg",purpose:"any"}],background_color:"#ffffff",theme_color:"#e9ad16"};}
