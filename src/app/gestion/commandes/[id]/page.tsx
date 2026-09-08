import { OrderDetail } from "@/components/account/OrdersView";
export default function Page(props: { params: Promise<{ id: string }> }) { return <OrderDetail role="admin" {...props}/>; }
