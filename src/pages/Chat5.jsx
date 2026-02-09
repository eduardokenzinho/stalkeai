import { useState, useEffect } from "react";
import styles from "./Chat5.module.css";

import ChatHeader from "../components/ChatComponents/ChatHeader";
import ChatBody from "../components/ChatComponents/ChatBody";
import ChatInput from "../components/ChatComponents/ChatInput";
import OldMessage from "../components/ChatComponents/OldMessage";

import ChatMessageTime from "../components/ChatComponents/ChatMessageTime";
import ChatMessageMe from "../components/ChatComponents/ChatMessageMe";
import ChatMessageOther from "../components/ChatComponents/ChatMessageOther";
import ChatMessageStory from "../components/ChatComponents/ChatMessageStory";
import ChatUnreadDivider from "../components/ChatComponents/ChatUnreadDivider";

import story1 from "../assets/chat/chat3-story1.png";
import story2 from "../assets/chat/chat3-story2.png";
import story3 from "../assets/chat/chat3-story3.png";
import storyAvatar from "../assets/chat/relacionamentoadois2.jpg";
import storyAvatar2 from "../assets/chat/Chat5.a.png";

export default function Chat5() {
  const [city, setCity] = useState("chacara");
  const [dateText, setDateText] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    async function fetchLocation() {
      try {
        const res = await fetch("https://wtfismyip.com/json", {
          signal: controller.signal,
        });
        if (!res.ok) return;
        const data = await res.json();
        if (data?.YourFuckingLocation) {
          const parts = data.YourFuckingLocation.split(",");
          setCity((parts[0] || "chacara").trim());
        }
      } catch {}
    }
    fetchLocation();

    // Calcular data 2 dias à frente
    const twoDaysAhead = new Date();
    twoDaysAhead.setDate(twoDaysAhead.getDate() + 2);
    const day = twoDaysAhead.getDate();
    const weekdays = [
      "domingo", "segunda feira", "terça feira",
      "quarta feira", "quinta feira", "sexta feira", "sábado"
    ];
    const weekday = weekdays[twoDaysAhead.getDay()];
    setDateText(`Dia ${day} ${weekday}`);
    return () => controller.abort();
  }, []);

  return (
    <div className={styles.chatPageChat5}>
      <ChatHeader />

      <ChatBody>
        {/* ===== MENSAGENS ANTIGAS (COM BLUR) ===== */}
        <OldMessage>
          <ChatMessageTime time="3 MESES ATRÁS" />
          <ChatMessageOther text="Oi" />
          <ChatMessageMe text="Oi" />
          <ChatMessageOther text="Tudo bem?" showAvatar={false} />
          <ChatMessageMe text="Tudo e vc" />
        </OldMessage>

        <OldMessage>
          <ChatMessageTime time="2 MESES ATRÁS" />
          <ChatMessageOther text="Bom dia" />
          <ChatMessageMe text="Bom dia" />
          <ChatMessageOther text="Saudades" showAvatar={false} />
          <ChatMessageMe text="Tbm" />
          <ChatMessageOther text="Vem me ver" showAvatar={false} />
        </OldMessage>

        <OldMessage>
          <ChatMessageTime time="7 SEMANAS ATRÁS" />
          <ChatMessageMe text="Oi amor" />
          <ChatMessageOther text="Oi bb" />
          <ChatMessageMe text="Tô com sdd" />
          <ChatMessageOther text="Eu tbm" showAvatar={false} />
          <ChatMessageMe text="❤️" />
        </OldMessage>

        <OldMessage>
          <ChatMessageTime time="6 SEMANAS ATRÁS" />
          <ChatMessageOther text="Bom dia amor" />
          <ChatMessageMe text="Bom dia" />
          <ChatMessageOther text="Sonhei com vc" showAvatar={false} />
          <ChatMessageMe text="Eu tbm sonhei" />
          <ChatMessageOther text="Sério?? ❤️" showAvatar={false} />
        </OldMessage>

        <OldMessage>
          <ChatMessageTime time="5 SEMANAS ATRÁS" />
          <ChatMessageOther text="Oi" />
          <ChatMessageMe text="Oi" />
          <ChatMessageOther text="Tá fazendo o que?" showAvatar={false} />
          <ChatMessageMe text="Nada" />
          <ChatMessageOther text="Vem aqui" showAvatar={false} />
          <ChatMessageMe text="Daqui a pouco" />
        </OldMessage>

        <OldMessage>
          <ChatMessageTime time="1 MÊS ATRÁS" />
          <ChatMessageMe text="Preciso falar com vc" />
          <ChatMessageOther text="Fala" />
          <ChatMessageMe text="Dps a gente conversa" />
          <ChatMessageOther text="Tá bom" showAvatar={false} />
        </OldMessage>

        <OldMessage>
          <ChatMessageTime time="3 SEMANAS ATRÁS" />
          <ChatMessageOther text="Boa noite" />
          <ChatMessageMe text="Boa noite" />
          <ChatMessageOther text="Te amo" showAvatar={false} />
          <ChatMessageMe text="Tbm" />
        </OldMessage>

        <OldMessage>
          <ChatMessageTime time="2 SEMANAS ATRÁS" />
          <ChatMessageOther text="E aí" />
          <ChatMessageMe text="Oi" />
          <ChatMessageOther text="Sumiu" showAvatar={false} />
          <ChatMessageMe text="Desculpa" />
          <ChatMessageOther text="Tá diferente" showAvatar={false} />
          <ChatMessageMe text="Não tô não" />
        </OldMessage>

        <OldMessage>
          <ChatMessageTime time="12 DIAS ATRÁS" />
          <ChatMessageOther text="Bom dia" />
          <ChatMessageMe text="Bom dia" />
          <ChatMessageOther text="Posso te ligar?" showAvatar={false} />
          <ChatMessageMe text="Agora não dá" />
        </OldMessage>

        <OldMessage>
          <ChatMessageTime time="10 DIAS ATRÁS" />
          <ChatMessageOther text="Oi amor" />
          <ChatMessageMe text="Oi" />
          <ChatMessageOther text="Tô com saudade" showAvatar={false} />
          <ChatMessageMe text="Eu sei" />
          <ChatMessageOther text="Vc não?" showAvatar={false} />
        </OldMessage>

        <OldMessage>
          <ChatMessageTime time="9 DIAS ATRÁS" />
          <ChatMessageMe text="Boa noite" />
          <ChatMessageOther text="Boa noite amor" />
          <ChatMessageOther text="Dorme bem" showAvatar={false} />
          <ChatMessageMe text="Vc tbm" />
        </OldMessage>

        <OldMessage>
          <ChatMessageTime time="1 SEMANA ATRÁS" />
          <ChatMessageOther text="Oi" />
          <ChatMessageMe text="Oi" />
          <ChatMessageOther text="Precisamos conversar" showAvatar={false} />
          <ChatMessageMe text="Sobre?" />
          <ChatMessageOther text="Sobre nós" showAvatar={false} />
        </OldMessage>

        <OldMessage>
          <ChatMessageTime time="6 DIAS ATRÁS" />
          <ChatMessageOther text="Bom dia" />
          <ChatMessageMe text="Bom dia" />
          <ChatMessageOther text="Como vc tá?" showAvatar={false} />
          <ChatMessageMe text="Bem" />
        </OldMessage>

        <OldMessage>
          <ChatMessageTime time="5 DIAS ATRÁS" />
          <ChatMessageOther text="Amor" />
          <ChatMessageMe text="Oi" />
          <ChatMessageOther text="Me responde direito" showAvatar={false} />
          <ChatMessageMe text="To respondendo" />
          <ChatMessageOther text="Não tá não" showAvatar={false} />
        </OldMessage>

        {/* ===== CONVERSA REAL (SEM BLUR) ===== */}

        <ChatMessageTime time="4 DIAS ATRÁS, 23:15" />

        {/* Mensagens enviadas - arrependimento */}
        <ChatMessageMe text="De tdas as coisas que fiz na vida e arrependi, se envolver com vc esta no topo delas" />
        <ChatMessageMe text="E pensar que quase te assumi" />

        {/* Mensagens recebidas - tentando reconectar */}
        <ChatMessageOther
          text="Por favor fulano"
          blurWords={["fulano"]}
        />
        <ChatMessageOther text="Vamos ser felizes a gente se ama" showAvatar={false} />
        <ChatMessageOther text="É um desperdício jogar fora tudo isso" showAvatar={false} />
        <ChatMessageOther
          text="Jamais eu me se sujeitaria a tudo isso se o sentimento nao tivesse no topo da minha vida."
          showAvatar={false}
        />

        <ChatMessageTime time="22 DE OUT, 14:33" />

        {/* Reels recebidos */}
        <ChatMessageStory
          storyImage={story1}
          username="relacionamenen..."
          userAvatar={storyAvatar}
        />

        <ChatMessageStory
          storyImage={story2}
          username="relacionamenen..."
          userAvatar={storyAvatar}
          showAvatar={false}
        />

        <ChatMessageTime time="3 DE NOV, 09:17" />

        {/* Mensagens recebidas */}
        <ChatMessageOther text="Oi boa tarde" />
        <ChatMessageOther text="Sei que esta evitando falar comigo" showAvatar={false} />
        <ChatMessageOther text="Mais hj faz um mês do nosso último beijo" showAvatar={false} />
        <ChatMessageOther
          text={`${dateText} devo ir pra ${city} de novo`}
          showAvatar={false}
        />

        <ChatMessageTime time="2 DIAS ATRÁS, 18:45" />

        {/* Reel recebido */}
        <ChatMessageStory
          storyImage={story3}
          username="sentimentos_div..."
          userAvatar={storyAvatar2}
        />

        <ChatMessageTime time="ONTEM, 21:22" />

        {/* Divisor de novas mensagens */}
        <ChatUnreadDivider />

        {/* Mensagens recebidas finais */}
        <ChatMessageOther
          text="Fulano???"
          blurWords={["Fulano"]}
        />
        <ChatMessageOther text="Bom dia." showAvatar={false} />
        <ChatMessageOther text="Porque não me responde mais?????" showAvatar={false} />
        <ChatMessageOther text="Estou na cidade e queria te ver" showAvatar={false} />
      </ChatBody>

      <ChatInput />
    </div>
  );
}
