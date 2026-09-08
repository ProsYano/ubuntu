import { MessagesView } from "@/components/account/MessagesView";
export default function Page(props: { searchParams: Promise<{ page?: string }> }) { return <MessagesView role="client" {...props}/>; }
