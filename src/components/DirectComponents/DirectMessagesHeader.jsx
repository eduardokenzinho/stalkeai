import "./DirectMessagesHeader.css";

export default function DirectMessagesHeader() {
  return (
    <div className="direct-messages-header">
      <h2 className="direct-messages-title">Mensagens</h2>
      <span className="direct-messages-requests" id="pedidos-link">
        Pedidos (4)
      </span>
    </div>
  );
}
