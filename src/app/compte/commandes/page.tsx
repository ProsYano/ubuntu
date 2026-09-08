import { OrdersView } from "@/components/account/OrdersView";
export default function Page(props: { searchParams: Promise<{ page?: string; statut?: string }> }) { return <OrdersView role="client" {...props}/>; }
