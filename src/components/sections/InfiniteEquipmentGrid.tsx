"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Equipment } from "@/lib/equipment-schema";
import { EquipmentCard } from "./EquipmentCard";

const PAGE_SIZE = 3;
export function InfiniteEquipmentGrid({initialItems, total}: {initialItems: Equipment[]; total: number}) {
  const [items,setItems] = useState(initialItems);
  const [loading,setLoading] = useState(false);
  const [error,setError] = useState(false);
  const sentinel = useRef<HTMLDivElement>(null);
  const hasMore = items.length < total;
  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true); setError(false);
    try {
      const response = await fetch(`/api/equipments?offset=${items.length}&limit=${PAGE_SIZE}`, {cache:"no-store"});
      if (!response.ok) throw new Error("catalogue");
      const payload = await response.json() as {items: Equipment[]};
      setItems(current => [...current, ...payload.items.filter(next => !current.some(item => item.id === next.id))]);
    } catch { setError(true); }
    finally { setLoading(false); }
  },[hasMore,items.length,loading]);
  useEffect(() => {
    const node = sentinel.current;
    if (!node || !hasMore || error) return;
    const observer = new IntersectionObserver(entries => {if(entries[0]?.isIntersecting) void loadMore();},{rootMargin:"500px 0px"});
    observer.observe(node);
    return () => observer.disconnect();
  },[error,hasMore,loadMore]);
  return <>
    <div className="equipment-grid">{items.map((item,index)=><EquipmentCard key={item.id} item={item} index={index}/>)}</div>
    <div ref={sentinel} className="infinite-status" aria-live="polite">
      {loading && <><span className="loading-wheel" aria-hidden="true"/>Chargement des engins…</>}
      {error && <><span>Le chargement a été interrompu.</span><button className="button button-neutral" onClick={() => void loadMore()}>Réessayer</button></>}
      {!hasMore && items.length > 0 && <span>Vous avez consulté tous les engins disponibles.</span>}
    </div>
  </>;
}
