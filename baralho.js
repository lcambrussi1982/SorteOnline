// leituras por carta (Passado, Presente, Futuro)
const leiturasPorCarta = {
  "O Cavaleiro": {
    passado: "Período recente marcado por movimento e impulsos: você tomou iniciativas, recebeu notícias ou estimulou mudanças.",
    presente: "Mensagens e oportunidades chegam rápido; aja com prontidão e clareza para aproveitar o ritmo.",
    futuro: "Mudanças velozes e convites; um avanço concreto se materializa se você mantiver foco e direção."
  },
  "O Trevo": {
    passado: "Pequenos golpes de sorte aliviaram tensões e abriram portas rápidas.",
    presente: "Uma chance breve aparece; atenção e agilidade para não deixá-la passar.",
    futuro: "Ganhos rápidos e alívios momentâneos, desde que você capture o timing certo."
  },
  "O Navio": {
    passado: "Transição/viagem, saudade ou abertura de horizontes iniciada no passado.",
    presente: "Movimento em curso: negociações, deslocamentos ou expansão estão ganhando tração.",
    futuro: "Mudança significativa/viagem; novos cenários trazem crescimento e experiências ricas."
  },
  "A Casa": {
    passado: "Bases familiares e rotinas deram sustentação às suas escolhas.",
    presente: "Foco em segurança, estabilidade e estrutura emocional.",
    futuro: "Estabilização sólida; possibilidade de conquista patrimonial ou fortalecimento do lar."
  },
  "A Árvore": {
    passado: "Raízes e hábitos de longo prazo moldaram sua vitalidade atual.",
    presente: "Crescimento lento e consistente; cuide da saúde e do equilíbrio.",
    futuro: "Consolidação e maturidade; frutos chegam com paciência e constância."
  },
  "As Nuvens": {
    passado: "Fase nebulosa gerou dúvidas e ambivalências.",
    presente: "Incertezas passageiras; adie decisões críticas até a visão clarear.",
    futuro: "A neblina se dissipa; entendimento e direção ficam nítidos."
  },
  "A Serpente": {
    passado: "Sedução, ciúmes ou jogos estratégicos influenciaram escolhas.",
    presente: "Aja com cautela; avalie intenções ocultas e evite impulsos reativos.",
    futuro: "Supera armadilhas via estratégia; transmutação pessoal fortalece seu caminho."
  },
  "O Caixão": {
    passado: "Encerramentos necessários abriram espaço interno.",
    presente: "Transição de luto/desapego; feche ciclos com consciência.",
    futuro: "Renascimento: nova fase mais alinhada e leve desponta."
  },
  "O Buquê": {
    passado: "Reconhecimentos e pequenas alegrias nutriram sua autoestima.",
    presente: "Convites, elogios e encontros agradáveis elevam a vibração.",
    futuro: "Celebrações e gratidão atraem conexões e oportunidades doces."
  },
  "A Foice": {
    passado: "Cortes recentes afastaram excessos ou vínculos tóxicos.",
    presente: "Decisão rápida e precisa é necessária; priorize o que faz bem.",
    futuro: "Ruptura libertadora conduz a um terreno mais saudável."
  },
  "O Chicote": {
    passado: "Discussões recorrentes e padrões repetitivos exigiram energia.",
    presente: "Confronte o ciclo e imponha limites com disciplina.",
    futuro: "Rompendo a repetição, surge domínio emocional e clareza."
  },
  "Os Pássaros": {
    passado: "Agitação mental e conversas intensas influenciaram seu estado.",
    presente: "Diálogo aberto; negociações e alinhamentos pedem paciência.",
    futuro: "Após a conversa certa, um acordo traz alívio e foco."
  },
  "A Criança": {
    passado: "Começos ingênuos plantaram sementes valiosas.",
    presente: "Novidade/fase inicial que pede curiosidade e cuidado.",
    futuro: "Projeto amadurece; alegria e aprendizado geram crescimento."
  },
  "A Raposa": {
    passado: "Esperteza/auto-proteção o ajudou, mas gerou desconfianças.",
    presente: "Cheque detalhes e interesses; não assine nada sem revisar.",
    futuro: "Evita armadilhas e sai por cima com estratégia limpa."
  },
  "O Urso": {
    passado: "Autoridade/controle marcaram relações e decisões.",
    presente: "Afirme limites; cuide de finanças e do seu poder pessoal.",
    futuro: "Liderança sólida e autonomia financeira ganham corpo."
  },
  "A Estrela": {
    passado: "Visões e fé guiaram passos em momentos críticos.",
    presente: "Proteção espiritual e clareza de propósito iluminam o caminho.",
    futuro: "Reconhecimento e alinhamento com sua vocação/sonho."
  },
  "A Cegonha": {
    passado: "Mudanças iniciadas criaram um impulso renovador.",
    presente: "Transição positiva: ajustes que melhoram o cenário.",
    futuro: "Boas novidades/chegadas; ciclo novo com prosperidade."
  },
  "O Cachorro": {
    passado: "Lealdade e amizade deram suporte essencial.",
    presente: "Conte com aliados fiéis; cooperação é chave.",
    futuro: "Parceria confiável se fortalece e traz estabilidade."
  },
  "A Torre": {
    passado: "Isolamento/rigidez institucional moldaram decisões.",
    presente: "Autonomia e limites; cuidado com distanciamento excessivo.",
    futuro: "Estrutura interna forte sem se fechar ao mundo."
  },
  "O Jardim": {
    passado: "Exposição social e eventos criaram conexões.",
    presente: "Networking e visibilidade; circule e se apresente.",
    futuro: "Reconhecimento público e oportunidades em comunidade."
  },
  "A Montanha": {
    passado: "Bloqueios testaram sua resiliência.",
    presente: "Obstáculo exige estratégia e perseverança.",
    futuro: "Superação gradual; a recompensa vem após o cume."
  },
  "Os Caminhos": {
    passado: "Uma decisão passada ainda repercute.",
    presente: "Escolha pede coragem e alinhamento com valores.",
    futuro: "Novo rumo se consolida; consequências positivas do posicionamento."
  },
  "Os Ratos": {
    passado: "Desgastes silenciosos drenaram energia/recursos.",
    presente: "Atenção a perdas, estresse e pequenas falhas.",
    futuro: "Contendo vazamentos, a recuperação material e emocional acontece."
  },
  "O Coração": {
    passado: "Afetos intensos moldaram sua visão do amor.",
    presente: "Romance, empatia e calor emocional em alta.",
    futuro: "Laços se aprofundam; escolha que nutre o coração."
  },
  "O Anel": {
    passado: "Compromissos/alianças definiram trajetórias.",
    presente: "Acordo, parceria ou renovação de votos.",
    futuro: "Contrato/aliança duradoura com responsabilidades claras."
  },
  "O Livro": {
    passado: "Segredos/estudos guardados sustentam seu saber.",
    presente: "Pesquisa e reserva; informação ainda velada.",
    futuro: "Revelação abre caminho e esclarece decisões."
  },
  "A Carta": {
    passado: "Mensagem/documento anterior impactou o rumo.",
    presente: "Notícia chegando; formalizações e recados objetivos.",
    futuro: "Assinaturas/contratos; comunicação oficial favorável."
  },
  "O Homem": {
    passado: "Figura masculina influenciou eventos e escolhas.",
    presente: "Atuação masculina/objetiva em foco agora.",
    futuro: "Ação pragmática; iniciativa direta determina resultados."
  },
  "A Mulher": {
    passado: "Presença feminina/intuicional foi determinante.",
    presente: "Sensibilidade e escuta ativa orientam passos.",
    futuro: "Acolhimento e intuição guiam decisões maduras."
  },
  "Os Lírios": {
    passado: "Busca por paz e maturidade emocional.",
    presente: "Harmonia e diplomacia favorecem acordos.",
    futuro: "Relações mais maduras; serenidade estável."
  },
  "O Sol": {
    passado: "Conquistas e clareza fortaleceram sua confiança.",
    presente: "Sucesso e vitalidade; tudo tende a dar certo.",
    futuro: "Vitória plena e reconhecimento; caminho iluminado."
  },
  "A Lua": {
    passado: "Fases emocionais intensas e sonhos orientaram você.",
    presente: "Intuição aguçada e possível reconhecimento.",
    futuro: "Ciclo favorável de prestígio e inspiração criativa."
  },
  "A Chave": {
    passado: "Aprendizados abriram portas antes fechadas.",
    presente: "Solução ao alcance; responda com segurança.",
    futuro: "Desbloqueio definitivo; oportunidade liberada."
  },
  "Os Peixes": {
    passado: "Fluxo financeiro/afetivo influiu nas escolhas.",
    presente: "Negócios e recursos em movimento; gerencie bem.",
    futuro: "Prosperidade crescente com boa gestão e troca justa."
  },
  "A Âncora": {
    passado: "Estabilidade (ou estagnação) garantiu segurança.",
    presente: "Firmeza e compromisso; manter posição é sábio.",
    futuro: "Segurança de longo prazo; base confiável para expandir."
  },
  "A Cruz": {
    passado: "Provas kármicas e sacrifícios trouxeram lições.",
    presente: "Peso e sentido; resiliência espiritual é necessária.",
    futuro: "Alívio e propósito após a travessia da prova."
  }
};


// injeta leituras no array existente, sem alterar sua estrutura base
baralho.forEach(c => {
  const l = leiturasPorCarta[c.nome];
  if (l) c.leituras = l;
});


function mostrarResultado() {
  const posicoes = ["passado", "presente", "futuro"];
  resultado.innerHTML = "<h3>Sua Leitura:</h3>";

  cartasEscolhidas.forEach((carta, index) => {
    const pos = posicoes[index] || "presente";
    const texto = carta.leituras?.[pos] || carta.significado || "";
    const tituloPos = pos.charAt(0).toUpperCase() + pos.slice(1);

    resultado.innerHTML += `
      <p><strong>${tituloPos} — ${carta.nome}:</strong> ${texto}</p>
    `;
  });
}
