import styles from "./Chat2.module.css";

import ChatHeader from "../components/ChatComponents/ChatHeader";
import ChatBody from "../components/ChatComponents/ChatBody";
import ChatInput from "../components/ChatComponents/ChatInput";
import OldMessage from "../components/ChatComponents/OldMessage";

import ChatMessageTime from "../components/ChatComponents/ChatMessageTime";
import ChatMessageMe from "../components/ChatComponents/ChatMessageMe";
import ChatMessageOther from "../components/ChatComponents/ChatMessageOther";
import ChatMessageStory from "../components/ChatComponents/ChatMessageStory";
import ChatAudioOther from "../components/ChatComponents/ChatAudioOther";
import ChatUnreadDivider from "../components/ChatComponents/ChatUnreadDivider";

// Importar imagens dos stories
import story1 from "../assets/chat/chat5.1.png";
import storyAvatar1 from "../assets/chat/chat5.1a.png";
import story2 from "../assets/chat/chat5.2.png";
import storyAvatar2 from "../assets/chat/chat5.2a.jpg";
import story3 from "../assets/chat/chat5.3.png";
import storyAvatar3 from "../assets/chat/Chat5.a.png";
import story4 from "../assets/chat/Chat5.4.png";
import storyAvatar4 from "../assets/chat/Chat5.a.png";
import story5 from "../assets/chat/Chat5.5.png";
import storyAvatar5 from "../assets/chat/Chat5.5a.png";
import story6 from "../assets/chat/chat5.6.png";
import storyAvatar6 from "../assets/chat/Chat5.6a.png";
import story7 from "../assets/chat/Chat5.7.png";
import storyAvatar7 from "../assets/chat/chat5.7a.png";
import story8 from "../assets/chat/chat.5.8.png";
import storyAvatar8 from "../assets/chat/chat5.8a.png";

export default function Chat2() {
  return (
    <div className={styles.chatPageChat2}>
      <ChatHeader />

      <ChatBody>
        {/* ===== MENSAGENS ANTIGAS (COM BLUR) ===== */}
        <OldMessage>
          <ChatMessageTime time="1 MÊS ATRÁS" />
          <ChatMessageOther text="Oi" />
          <ChatMessageMe text="Oi" />
          <ChatMessageOther text="Tudo bem?" showAvatar={false} />
          <ChatMessageMe text="Tudo sim" />
        </OldMessage>

        <OldMessage>
          <ChatMessageTime time="3 SEMANAS ATRÁS" />
          <ChatMessageOther text="Bom dia" />
          <ChatMessageMe text="Bom dia" />
          <ChatMessageOther text="Como foi o fim de semana?" showAvatar={false} />
          <ChatMessageMe text="Foi bom" />
        </OldMessage>

        <OldMessage>
          <ChatMessageTime time="2 SEMANAS ATRÁS" />
          <ChatMessageOther text="E aí" />
          <ChatMessageMe text="Oi" />
          <ChatMessageOther text="Sumiu" showAvatar={false} />
          <ChatMessageMe text="Desculpa" />
        </OldMessage>

        <OldMessage>
          <ChatMessageTime time="10 DIAS ATRÁS" />
          <ChatMessageOther text="Bom dia amor" />
          <ChatMessageMe text="Bom dia bb" />
          <ChatMessageOther text="Dormiu bem?" showAvatar={false} />
          <ChatMessageMe text="Dormi sim" />
        </OldMessage>

        <OldMessage>
          <ChatMessageTime time="9 DIAS ATRÁS" />
          <ChatMessageOther text="Oi delícia" />
          <ChatMessageMe text="Oii" />
          <ChatMessageOther text="Saudades" showAvatar={false} />
          <ChatMessageMe text="Tbm" />
        </OldMessage>

        <OldMessage>
          <ChatMessageTime time="8 DIAS ATRÁS" />
          <ChatMessageOther text="Boa noite" />
          <ChatMessageMe text="Boa noite" />
          <ChatMessageOther text="Vai dormir?" showAvatar={false} />
          <ChatMessageMe text="Daqui a pouco" />
        </OldMessage>

        <OldMessage>
          <ChatMessageTime time="1 SEMANA ATRÁS" />
          <ChatMessageOther text="Bom dia" />
          <ChatMessageMe text="Bom dia" />
          <ChatMessageOther text="Que faz?" showAvatar={false} />
          <ChatMessageMe text="Nada" />
        </OldMessage>

        <OldMessage>
          <ChatMessageTime time="6 DIAS ATRÁS" />
          <ChatMessageOther text="E aí bb" />
          <ChatMessageMe text="Oi" />
          <ChatMessageOther text="Vem aqui" showAvatar={false} />
          <ChatMessageMe text="Daqui a pouco" />
        </OldMessage>

        <OldMessage>
          <ChatMessageTime time="5 DIAS ATRÁS, 09:15" />
          <ChatMessageOther text="Bom dia lindeza" />
          <ChatMessageMe text="Bom dia amor" />
          <ChatMessageOther text="Como foi o sono?" showAvatar={false} />
          <ChatMessageMe text="Bom" />
        </OldMessage>

        <OldMessage>
          <ChatMessageTime time="4 DIAS ATRÁS, 22:00" />
          <ChatMessageOther text="Oi" />
          <ChatMessageMe text="Oi amor" />
          <ChatMessageOther text="Tá fazendo o que?" showAvatar={false} />
          <ChatMessageMe text="Assistindo série" />
          <ChatMessageOther text="Qual?" showAvatar={false} />
          <ChatMessageMe text="Uma de suspense" />
        </OldMessage>

        {/* ===== CONVERSA REAL (SEM BLUR) ===== */}
        
        <ChatMessageStory
          storyImage={story1}
          username="tinhooficial"
          userAvatar={storyAvatar1}
          reaction="😂"
        />

        <ChatMessageTime time="25 DE NOV, 15:22" />

        <ChatMessageStory
          storyImage={story2}
          username="ikarozets"
          userAvatar={storyAvatar2}
          showAvatar={false}
        />

        <ChatMessageTime time="27 DE NOV, 20:15" />

        <ChatMessageStory
          storyImage={story3}
          username="tettrem"
          userAvatar={storyAvatar3}
          reaction="🥲"
          showAvatar={false}
        />

        <ChatMessageMe text="Esse achei triste" />

        <ChatMessageTime time="29 DE NOV, 14:08" />

        <ChatMessageStory
          storyImage={story5}
          username="signodaputaria"
          userAvatar={storyAvatar5}
          isSent={true}
        />

        <ChatMessageStory
          storyImage={story4}
          username="tettrem"
          userAvatar={storyAvatar4}
          showAvatar={false}
        />

        <ChatMessageTime time="ONTEM, 18:45" />

        <ChatMessageStory
          storyImage={story6}
          username="safadodesejo"
          userAvatar={storyAvatar6}
          isSent={true}
          reaction="😂"
        />

        <ChatMessageMe text="kkkkkkkkkkkk" />

        <ChatAudioOther 
          duration="0:23" 
          reaction="😂"
          showAvatar={false}
        />

        <ChatMessageTime time="ONTEM 22:11" />

        <ChatMessageStory
          storyImage={story7}
          username="morimura"
          userAvatar={storyAvatar7}
          showAvatar={false}
        />

        <ChatUnreadDivider />

        <ChatMessageTime time="HOJE, 16:32" />

        <ChatMessageStory
          storyImage={story8}
          username="jonas.milgrau"
          userAvatar={storyAvatar8}
          showAvatar={false}
        />

      </ChatBody>

      <ChatInput />
    </div>
  );
}