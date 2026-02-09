import styles from "./Chat4.module.css";

import ChatHeader from "../components/ChatComponents/ChatHeader";
import ChatBody from "../components/ChatComponents/ChatBody";
import ChatInput from "../components/ChatComponents/ChatInput";
import OldMessage from "../components/ChatComponents/OldMessage";

import ChatMessageTime from "../components/ChatComponents/ChatMessageTime";
import ChatMessageMe from "../components/ChatComponents/ChatMessageMe";
import ChatMessageOther from "../components/ChatComponents/ChatMessageOther";
import ChatMessageImage from "../components/ChatComponents/ChatMessageImage";
import ChatVideoCall from "../components/ChatComponents/ChatVideoCall";
import ChatVideoCallMissed from "../components/ChatComponents/ChatVideoCallMissed";

import nudeImage from "../assets/chat/chat2.nudes1.png";
import packImage1 from "../assets/chat/nudes1-chat2.jpg";
import packImage2 from "../assets/chat/pack1.1.chat2.png";
import packImage3 from "../assets/chat/fotoblur1.jpg";

export default function Chat4() {
  return (
    <div className={styles.chatPageChat4}>
      <ChatHeader />

      <ChatBody>
        {/* ===== MENSAGENS ANTIGAS (COM BLUR) ===== */}
        <OldMessage>
          <ChatMessageTime time="2 MESES ATRÁS" />
          <ChatMessageOther text="Oi" />
          <ChatMessageMe text="Oi" />
          <ChatMessageOther text="Tudo bem?" showAvatar={false} />
          <ChatMessageMe text="Tudo sim e vc" />
        </OldMessage>

        <OldMessage>
          <ChatMessageTime time="7 SEMANAS ATRÁS" />
          <ChatMessageOther text="Bom dia" />
          <ChatMessageMe text="Bom dia amor" />
          <ChatMessageOther text="Dormiu bem?" showAvatar={false} />
          <ChatMessageMe text="Dormi sim" />
          <ChatMessageOther text="Que bom ❤️" showAvatar={false} />
        </OldMessage>

        <OldMessage>
          <ChatMessageTime time="6 SEMANAS ATRÁS" />
          <ChatMessageMe text="Oi bb" />
          <ChatMessageOther text="Oi amor" />
          <ChatMessageMe text="To com sdd" />
          <ChatMessageOther text="Eu tbm" showAvatar={false} />
          <ChatMessageMe text="Vem me ver" />
          <ChatMessageOther text="Vou sim" showAvatar={false} />
        </OldMessage>

        <OldMessage>
          <ChatMessageTime time="5 SEMANAS ATRÁS" />
          <ChatMessageOther text="E aí" />
          <ChatMessageMe text="Fala" />
          <ChatMessageOther text="Sumiu hein" showAvatar={false} />
          <ChatMessageMe text="Desculpa tava trabalhando" />
          <ChatMessageOther text="Tá bom" showAvatar={false} />
        </OldMessage>

        <OldMessage>
          <ChatMessageTime time="1 MÊS ATRÁS" />
          <ChatMessageOther text="Bom dia lindeza" />
          <ChatMessageMe text="Bom dia" />
          <ChatMessageOther text="Que horas sai hj?" showAvatar={false} />
          <ChatMessageMe text="Umas 18h" />
          <ChatMessageOther text="Me busca?" showAvatar={false} />
          <ChatMessageMe text="Busco sim" />
        </OldMessage>

        <OldMessage>
          <ChatMessageTime time="3 SEMANAS ATRÁS" />
          <ChatMessageMe text="Boa noite" />
          <ChatMessageOther text="Boa noite amor" />
          <ChatMessageMe text="Sonha comigo" />
          <ChatMessageOther text="Sempre 😘" showAvatar={false} />
        </OldMessage>

        <OldMessage>
          <ChatMessageTime time="2 SEMANAS ATRÁS" />
          <ChatMessageOther text="Oi delícia" />
          <ChatMessageMe text="Oii" />
          <ChatMessageOther text="Tô morrendo de saudade" showAvatar={false} />
          <ChatMessageMe text="Eu tbm amor" />
          <ChatMessageOther text="Liga pra mim" showAvatar={false} />
          <ChatMessageMe text="Daqui a pouco" />
        </OldMessage>

        <OldMessage>
          <ChatMessageTime time="12 DIAS ATRÁS" />
          <ChatMessageOther text="Bom dia bb" />
          <ChatMessageMe text="Bom dia" />
          <ChatMessageOther text="Como foi o sono?" showAvatar={false} />
          <ChatMessageMe text="Bom" />
          <ChatMessageOther text="Sonhei com vc" showAvatar={false} />
          <ChatMessageMe text="Sério? kk" />
        </OldMessage>

        <OldMessage>
          <ChatMessageTime time="10 DIAS ATRÁS" />
          <ChatMessageMe text="Amor" />
          <ChatMessageOther text="Oi" />
          <ChatMessageMe text="Tô indo aí" />
          <ChatMessageOther text="Vem logo" showAvatar={false} />
          <ChatMessageMe text="Já tô saindo" />
        </OldMessage>

        <OldMessage>
          <ChatMessageTime time="9 DIAS ATRÁS" />
          <ChatMessageOther text="Boa noite" />
          <ChatMessageMe text="Boa noite" />
          <ChatMessageOther text="Amanhã a gente se vê?" showAvatar={false} />
          <ChatMessageMe text="Sim" />
        </OldMessage>

        <OldMessage>
          <ChatMessageTime time="1 SEMANA ATRÁS" />
          <ChatMessageOther text="Oi" />
          <ChatMessageMe text="Oi amor" />
          <ChatMessageOther text="Saudades demais" showAvatar={false} />
          <ChatMessageMe text="Tbm tô" />
          <ChatMessageOther text="❤️" showAvatar={false} />
          <ChatMessageMe text="❤️❤️" />
        </OldMessage>

        <OldMessage>
          <ChatMessageTime time="6 DIAS ATRÁS" />
          <ChatMessageMe text="Bom dia" />
          <ChatMessageOther text="Bom dia amor" />
          <ChatMessageMe text="Vai sair hj?" />
          <ChatMessageOther text="Não sei ainda" showAvatar={false} />
          <ChatMessageMe text="Avisa dps" />
        </OldMessage>

        <OldMessage>
          <ChatMessageTime time="5 DIAS ATRÁS" />
          <ChatMessageOther text="Amor vc tá aonde?" />
          <ChatMessageMe text="Em casa" />
          <ChatMessageOther text="Liga pra mim" showAvatar={false} />
          <ChatMessageMe text="Perai" />
        </OldMessage>

        <OldMessage>
          <ChatMessageTime time="4 DIAS ATRÁS" />
          <ChatMessageOther text="Boa noite bb" />
          <ChatMessageMe text="Boa noite amor" />
          <ChatMessageOther text="Te amo" showAvatar={false} />
          <ChatMessageMe text="Tbm te amo" />
        </OldMessage>

        {/* ===== CONVERSA REAL (SEM BLUR) ===== */}

        <ChatMessageTime time="3 DIAS ATRÁS, 22:47" />

        {/* Chamada de vídeo normal */}
        <ChatVideoCall duration="01:43" type="normal" />

        {/* Chamada de vídeo perdida */}
        <ChatVideoCallMissed />

        {/* Mensagens enviadas sobre internet ruim */}
        <ChatMessageMe text="Net tá ruim" />
        <ChatMessageMe text="To no 4G" />
        <ChatMessageMe text="Liga de novo" />

        {/* Segunda chamada de vídeo */}
        <ChatVideoCall duration="03:12" type="normal" />

        {/* Chamada encerrada */}
        <ChatVideoCall duration="01:55" type="ended" />

        {/* Mensagens enviadas */}
        <ChatMessageMe text="Delíciaaaaaaaaaaaa" />
        <ChatMessageMe text="🤤🤤🤤" />

        {/* Mensagem recebida */}
        <ChatMessageOther text="Olha como me deixou" />

        {/* Nude recebido (com blur e reação ❤️) */}
        <ChatMessageImage
          imageSrc={nudeImage}
          reaction="❤️"
          showAvatar={false}
        />

        {/* Mensagem recebida */}
        <ChatMessageOther text="Kkkkk" showAvatar={false} />

        {/* Mensagens enviadas */}
        <ChatMessageMe text="CARALHOOOOO" />
        <ChatMessageMe text="Delícia demais" />
        <ChatMessageMe text="❤️❤️❤️" />

        {/* Mensagem recebida */}
        <ChatMessageOther text="Manda mais sua tbm" />

        {/* Pack de nudes enviado (3 imagens com blur) */}
        <ChatMessageImage imageSrc={packImage1} isSent={true} />
        <ChatMessageImage imageSrc={packImage2} isSent={true} />
        <ChatMessageImage imageSrc={packImage3} isSent={true} reaction="😈" />

        {/* Mensagens recebidas */}
        <ChatMessageOther text="Pedi uma e mando 3" />
        <ChatMessageOther text="Por isso que te amo" showAvatar={false} />

        {/* Mensagens enviadas */}
        <ChatMessageMe text="Vou ter que sair aqui ta perigoso" />
        <ChatMessageMe
          text="Não aguento mais tá chegando"
          blurWords={["Não aguento mais"]}
        />

        {/* Mensagem recebida */}
        <ChatMessageOther text="Calma que a gente se vê logo" />

        {/* Mensagens enviadas */}
        <ChatMessageMe text="Não aguento mais" />
        <ChatMessageMe text="Não amnda mais nada blz" reaction="👍🏻" />
      </ChatBody>

      <ChatInput />
    </div>
  );
}
