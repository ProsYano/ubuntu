import { MessageDetail } from "@/components/account/MessagesView";
export default function Page(props: { params: Promise<{ id: string }>; searchParams: Promise<{ page?: string }> }) { return <MessageDetail role="client" {...props}/>; }
