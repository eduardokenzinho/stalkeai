import styles from "./Chat3.module.css";

import ChatHeader from "../components/ChatComponents/ChatHeader";
import ChatBody from "../components/ChatComponents/ChatBody";
import ChatInput from "../components/ChatComponents/ChatInput";
import OldMessage from "../components/ChatComponents/OldMessage";

import ChatMessageTime from "../components/ChatComponents/ChatMessageTime";
import ChatMessageMe from "../components/ChatComponents/ChatMessageMe";
import ChatMessageOther from "../components/ChatComponents/ChatMessageOther";
import ChatAudioOther from "../components/ChatComponents/ChatAudioOther";
import ChatAudioMe from "../components/ChatComponents/ChatAudioMe";

export default function Chat3() {
  return (
    <div className={styles.chatPageChat3}>
      <ChatHeader />

      <ChatBody>
        {/* ===== MENSAGENS ANTIGAS (COM BLUR) ===== */}
        <OldMessage>
          <ChatMessageTime time="1 MÊS ATRÁS" />
          <ChatMessageOther text="Oi" />
          <ChatMessageMe text="Oi" />
          <ChatMessageOther text="Tudo bem?" showAvatar={false} />
          <ChatMessageMe text="Tudo" />
        </OldMessage>

        <OldMessage>
          <ChatMessageTime time="3 SEMANAS ATRÁS" />
          <ChatMessageOther text="Bom dia" />
          <ChatMessageMe text="Bom dia" />
          <ChatMessageOther text="Como foi seu dia?" showAvatar={false} />
          <ChatMessageMe text="Foi bom" />
        </OldMessage>

        <OldMessage>
          <ChatMessageTime time="2 SEMANAS ATRÁS" />
          <ChatMessageOther text="E aí" />
          <ChatMessageMe text="Oi" />
          <ChatMessageOther text="Que faz?" showAvatar={false} />
          <ChatMessageMe text="Nada" />
        </OldMessage>

        <OldMessage>
          <ChatMessageTime time="10 DIAS ATRÁS" />
          <ChatMessageOther text="Boa noite" />
          <ChatMessageMe text="Boa noite" />
        </OldMessage>

        <OldMessage>
          <ChatMessageTime time="1 SEMANA ATRÁS" />
          <ChatMessageOther text="Oi amor" />
          <ChatMessageMe text="Oi bb" />
          <ChatMessageOther text="Saudades" showAvatar={false} />
          <ChatMessageMe text="Tbm" />
        </OldMessage>

        <OldMessage>
          <ChatMessageTime time="6 DIAS ATRÁS" />
          <ChatMessageOther text="Bom dia" />
          <ChatMessageMe text="Bom dia" />
        </OldMessage>

        <OldMessage>
          <ChatMessageTime time="5 DIAS ATRÁS" />
          <ChatMessageOther text="Oi" />
          <ChatMessageMe text="Oi" />
          <ChatMessageOther text="Tá fazendo o que?" showAvatar={false} />
          <ChatMessageMe text="Nada" />
        </OldMessage>

        {/* ===== CONVERSA REAL (SEM BLUR) ===== */}
        
        {/* Áudios enviados */}
        <ChatAudioMe duration="0:13" />
        <ChatAudioMe duration="0:05" />

        {/* Áudio recebido */}
        <ChatAudioOther duration="0:20" />

        {/* Mensagem enviada */}
        <ChatMessageMe text="Tranquilo, vai lá" />

        <ChatMessageTime time="2 DIAS ATRÁS, 09:31" />

        {/* Mensagens recebidas */}
        <ChatMessageOther text="Bom dia bb" />
        <ChatMessageOther text="Iai melhorou??" showAvatar={false} />

        {/* Áudio enviado longo */}
        <ChatAudioMe duration="4:25" />

        {/* Mensagens enviadas */}
        <ChatMessageMe text="Perdão pelo desafo" />
        <ChatMessageMe text="Mas n sei o que eu faço" />

        {/* Mensagem recebida */}
        <ChatMessageOther text="Imagina" showAvatar={false} />

        {/* Áudios recebidos */}
        <ChatAudioOther duration="0:41" showAvatar={false} />
        <ChatAudioOther duration="0:12" showAvatar={false} />

        {/* Áudio enviado */}
        <ChatAudioMe duration="0:29" />

        {/* Mensagens recebidas */}
        <ChatMessageOther text="Simm, vc sabe" showAvatar={false} />
        <ChatMessageOther 
          text="No rolo que eu tive com fulano era assim tbm" 
          blurWords={["fulano"]}
          showAvatar={false} 
        />
        <ChatMessageOther 
          text="Se apaixonar por amante é foda te entendo, texto censurado em casa" 
          blurWords={["texto censurado em casa"]}
          showAvatar={false} 
        />

        {/* Áudios enviados */}
        <ChatAudioMe duration="0:04" />
        <ChatAudioMe duration="0:11" />

        {/* Mensagens recebidas */}
        <ChatMessageOther text="kkkkkkk" showAvatar={false} />
        <ChatMessageOther text="Blz depois a gente se fala" showAvatar={false} />

      </ChatBody>

      <ChatInput />
    </div>
  );
}