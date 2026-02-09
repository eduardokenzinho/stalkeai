import React, { useState, useEffect, useRef, useCallback } from 'react';
import styles from './InstagramLogin.module.css';

const InstagramLogin = ({ username, onLoginComplete }) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState('testing'); // testing, success
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [cryptoText, setCryptoText] = useState('Quebrando criptografia da conta...');
  const [cryptoSubtext, setCryptoSubtext] = useState('Testando combinações de senha...');
  const [progress, setProgress] = useState(0);
  
  const passwordsRef = useRef([]);
  const typingInterval = useRef(null);
  const cryptoInterval = useRef(null);
  const currentIndex = useRef(0);
  const isMounted = useRef(true);
  const typingSpeed = useRef(30);

  // Gerar senhas realistas (menos tentativas)
  useEffect(() => {
    const generatePasswords = () => {
      const bases = [
        "amordeverdade", "familiaunida", "filhoquerido", "casanova",
        "viagemsonho", "praiabonita", "festaboa", "trabalhoduro",
        "faculdadevida", "namoradolindo", "casalfeliz", "vidaperfeita",
        "segredomeusso", "princesinha", "coracaoquente"
      ];

      const suffixes = [
        "2024", "2025", "321", "abc", "xyz", "0101", "1234",
        "real", "top", "vip", "gold"
      ];

      const specials = "!@#$%&*";

      const passwords = [];

      for (let i = 0; i < 3; i++) {
        const base = bases[Math.floor(Math.random() * bases.length)];
        const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
        let password = base + suffix;

        // 50% de chance de caractere especial
        if (Math.random() > 0.5) {
          password += specials[Math.floor(Math.random() * specials.length)];
        }

        passwords.push(password);
      }

      // Última senha (a correta) - também longa
      const finalPasswords = [
        "minhavida2024!real",
        "familiaUnida#2025",
        "amorEterno@forever",
        "segredoNosso$321",
        "coracaoQuente!abc"
      ];

      passwords.push(finalPasswords[Math.floor(Math.random() * finalPasswords.length)]);

      return passwords;
    };
    
    passwordsRef.current = generatePasswords();
  }, []);

  // Iniciar animação de criptografia
  useEffect(() => {
    const cryptoMessages = [
      "Criando e acessando mensagens no local storage",
      "Gerando arquivos...",
      "ATENÇÃO! USO SOMENTE ETICO",
      "Testando combinações de senha...",
      "Finalizado o carregamento das paginas geradas"
    ];

    cryptoInterval.current = setInterval(() => {
      const randomMsg = cryptoMessages[Math.floor(Math.random() * 4)];
      const randomSub = ["Testando combinações...", "Analisando padrões...", "Processando algoritmos..."][Math.floor(Math.random() * 3)];
      
      if (isMounted.current && status === 'testing') {
        setCryptoText(randomMsg);
        setCryptoSubtext(randomSub);
      }
    }, 1200);

    return () => {
      clearInterval(cryptoInterval.current);
    };
  }, [status]);
  // Simular digitação
  const simulateTyping = useCallback((text, onComplete) => {
    if (!isMounted.current) return;
    
    let typed = '';
    let index = 0;
    
    clearInterval(typingInterval.current);
    
    typingInterval.current = setInterval(() => {
      if (index < text.length && isMounted.current) {
        typed += text[index];
        setPassword('•'.repeat(typed.length));
        index++;
      } else {
        clearInterval(typingInterval.current);
        setPassword('•'.repeat(text.length));
        if (onComplete) onComplete();
      }
    }, typingSpeed.current);
  }, []);

  // Iniciar simulação de hacking
  const startHackingSimulation = useCallback(async () => {
    if (!isMounted.current) return;
    
    const totalAttempts = passwordsRef.current.length;
    
    for (let i = 0; i < totalAttempts; i++) {
      if (!isMounted.current) return;
      
      currentIndex.current = i;
      const currentPass = passwordsRef.current[i];
      const isLastAttempt = i === totalAttempts - 1;
      
      // Atualizar progresso (incrementos aleatórios para não revelar total)
      setProgress(prev => {
        const increment = 15 + Math.random() * 15;
        return Math.min(isLastAttempt ? 100 : 85, prev + increment);
      });
      
      // Digitar senha
      await new Promise(resolve => {
        simulateTyping(currentPass, resolve);
      });
      
      // Aguardar entre tentativas
      await new Promise(resolve => setTimeout(resolve, 400));

      // Se for a última senha (sucesso)
      if (isLastAttempt) {
        setStatus('success');
        setProgress(100);
        setCryptoText('Teste gerado');
        setCryptoSubtext('Acesso liberado à conta!');

        clearInterval(cryptoInterval.current);

        await new Promise(resolve => setTimeout(resolve, 300));
        setShowPassword(true);
        setPassword(currentPass);

        await new Promise(resolve => setTimeout(resolve, 400));
        setShowSuccess(true);

        // Auto-redirecionar após 7 segundos (usuário pode clicar "Entrar" antes)
        setTimeout(() => {
          if (isMounted.current) {
            onLoginComplete();
          }
        }, 7000);

        break;
      } else {
        // Senha incorreta
        setShowError(true);

        await new Promise(resolve => setTimeout(resolve, 500));
        setShowError(false);

        // Limpar senha para próxima tentativa
        setPassword('');

        // Intervalo entre tentativas
        await new Promise(resolve => setTimeout(resolve, 300));
      }
    }
  }, [onLoginComplete, simulateTyping]);

  // Efeito principal - Inicia a simulação
  useEffect(() => {
    isMounted.current = true;
    
    // Delay antes de iniciar
    const startTimer = setTimeout(() => {
      startHackingSimulation();
    }, 600);
    
    return () => {
      isMounted.current = false;
      if (typingInterval.current) clearInterval(typingInterval.current);
      if (cryptoInterval.current) clearInterval(cryptoInterval.current);
      clearTimeout(startTimer);
    };
  }, [startHackingSimulation]);
  // Formatar display da senha
  const getPasswordDisplay = () => {
    if (status === 'success' && showPassword) {
      return password;
    }
    return password;
  };

  const handleLoginClick = () => {
    if (status === 'success') {
      onLoginComplete();
    }
  };

  return (
    <div className={styles.instagramLoginScreen}>
      <div className={styles.instagramContainer}>
        
        {/* Card Principal */}
        <div className={styles.instagramCard}>
          
          {/* Logo Instagram */}
          <div className={styles.instagramLogo}>
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/2560px-Instagram_logo.svg.png" 
              alt="Instagram"
              className={styles.instaLogoImg}
            />
          </div>

          {/* Formulário */}
          <div className={styles.instagramForm}>
            
            {/* Username Input */}
            <div className={styles.formGroup}>
              <div className={styles.inputWrapper}>
                <input
                  type="text"
                  value={username}
                  readOnly
                  className={styles.formInput}
                  placeholder="Nome de usuário"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className={styles.formGroup}>
              <div className={styles.inputWrapper}>
                <input
                  type="password"
                  value={getPasswordDisplay()}
                  readOnly
                  className={`${styles.formInput} ${styles.passwordInput} ${status === 'success' ? styles.success : ''}`}
                  placeholder="Senha"
                />
                {/* Botão Mostrar só aparece após sucesso */}
                {status === 'success' && (
                  <button 
                    type="button"
                    className={styles.showPasswordBtn}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? 'Ocultar' : 'Mostrar'}
                  </button>
                )}
              </div>
              
              {/* Error Message */}
              {showError && status === 'testing' && (
                <div className={styles.errorMessage}>
                  A senha que você inseriu está incorreta.
                </div>
              )}
            </div>

            {/* Quebrando Criptografia - ESTILO DO SITE ORIGINAL */}
            {status === 'testing' && (
              <div className={styles.cryptoBreaking}>
                <div className={styles.cryptoHeader}>
                  <div className={styles.cryptoIcon}>
                    <svg className={styles.cryptoSpinner} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" 
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  </div>
                  <div className={styles.cryptoText}>
                    <p className={styles.cryptoMain}>{cryptoText}</p>
                    <p className={styles.cryptoSub}>{cryptoSubtext}</p>
                  </div>
                </div>
                
                {/* Barra de progresso */}
                <div className={styles.progressContainer}>
                  <div 
                    className={styles.progressBar} 
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                
                {/* Status */}
                <div className={styles.attemptsCounter}>
                  <span className={styles.attemptsText}>
                    Testando combinações...
                  </span>
                </div>
              </div>
            )}

            {/* Mensagem de Sucesso - ESTILO DO SITE ORIGINAL */}
            {showSuccess && (
              <div className={styles.successBreaking}>
                <div className={styles.successHeader}>
                  <div className={styles.successIcon}>
                    <svg className={styles.successCheck} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div className={styles.successText}>
                    <p className={styles.successMain}>Teste gerado com sucesso</p>
                    <p className={styles.successSub}>Acesso liberado à conta!</p>
                  </div>
                </div>
              </div>
            )}

            {/* Login Button */}
            <button 
              type="button"
              className={`${styles.loginBtn} ${status === 'success' ? styles.active : ''}`}
              disabled={status !== 'success'}
              onClick={handleLoginClick}
            >
              Entrar
            </button>

            {/* Separador OU */}
            <div className={styles.separator}>
              <div className={styles.line}></div>
              <span className={styles.or}>OU</span>
              <div className={styles.line}></div>
            </div>

            {/* Facebook Login */}
            <div className={styles.facebookLogin}>
              <svg className={styles.fbIcon} fill="#385185" viewBox="0 0 24 24">
                <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z"/>
              </svg>
              <span className={styles.fbText}>Entrar com o Facebook</span>
            </div>

            {/* Esqueceu a senha */}
            <div className={styles.forgotPassword}>
              <button type="button" className={styles.forgotLink}>Esqueceu a senha?</button>
            </div>

          </div>
        </div>

        {/* Card de cadastro */}
        <div className={styles.signupCard}>
          <p className={styles.signupText}>
            Não tem uma conta? <button type="button" className={styles.signupLink}>Cadastre-se</button>
          </p>
        </div>

      </div>
    </div>
  );
};

export default InstagramLogin;
