## Cronograma de Execução — Plano de Implementação Completo

> Atualizado em 2026-03-25 após varredura do código e cruzamento com o briefing.
> Reorganizado em 8 fases priorizadas por dependência e valor de entrega.

---

### Legenda de Status
- [x] Concluído
- [~] Parcialmente implementado
- [ ] Não iniciado

---

### FASE 0: Fundação Concluída
_O que já está funcional no código._

- [x] Setup do ambiente de desenvolvimento e modelagem do banco de dados.
- [x] Sistema de Login e Autenticação (token-based via `autenticacao.ts`).
- [x] Categorias de pilares: Liderança, Recepção, Comercial e Financeiro.
- [x] Módulo de Aulas (Player HLS, progresso, avaliação 5 estrelas, materiais complementares).
- [x] Chatbot de IA com streaming e ações pré-definidas (`aiChat/`).
- [x] Transcrição automática de aulas via Socket.io (`gerar-transcricao`).
- [x] CRUD básico de Produtos, Assinaturas e Membros.
- [~] Dossiê do Aluno (abas Anotações + Eventos, sem timeline completa).
- [~] Dashboard com Roadmap visual (sem métricas de progresso).
- [~] Encontros ao vivo (estrutura de abas, sem integração Meet).
- [~] Controle de acesso (Assinaturas existem, sem bloqueio efetivo por permissão).

---

### FASE 1: Checkout, Pagamento e Acesso (Semana 1-2)
_Prioridade MÁXIMA — sem isso não há fluxo de entrada de alunos em produção._
_Ref. briefing: §12, §13, §14_

#### 1.1 Checkout próprio com PagarMe/Stone
- [ ] Backend: wrapper SDK PagarMe — criação de transação, suporte a cartão/boleto/PIX.
- [ ] Backend: rota `POST /api/checkout` (dados do cliente + produto + forma de pagamento).
- [ ] Backend: rota `POST /api/webhooks/pagarme` para confirmação de pagamento.
- [ ] Backend: suporte a cupons de desconto e valores variáveis.
- [ ] Frontend: State `Checkout` — página pública com formulário e identidade visual Duo Academy.
- [ ] Collections: `Pagamentos`, `Cupons`.

#### 1.2 Fluxo pós-pagamento automático
- [ ] Webhook cria `Usuario` automaticamente (se não existe).
- [ ] Webhook cria `Assinatura` vinculando usuário ao produto pago.
- [ ] Disparo de email de boas-vindas com credenciais.
- [ ] Evento Socket.io `usuario:novo` para notificar admin.
- [ ] Expandir interface `Assinatura` com campos: `status`, `dataInicio`, `dataFim`, `pagamento`.

#### 1.3 Contrato/Termo de adesão digital
- [ ] Tela pós-checkout que exibe termo de adesão simplificado.
- [ ] Coleta de CPF como assinatura digital.
- [ ] Collection: `Contratos` (usuario, cpf, data_aceite, texto_contrato).
- [ ] Fluxo: pagamento → cadastro → exibição do termo → acesso liberado.

#### 1.4 Controle de acesso efetivo por permissão
- [ ] Verificar `status` da Assinatura antes de liberar conteúdo no State `Usuario`.
- [ ] Campo `nivelAcesso` em `ProdutoOption` para filtrar por nível do usuário.
- [ ] Lógica de bloqueio: mentorias e acessos filtrados por nível (conforme briefing §10).
- [ ] Cursos "ilha" (ex: Recepção Lucrativa) como produto separado com acesso independente.

---

### FASE 2: Experiência Core do Aluno (Semana 2-3)
_Prioridade ALTA — define a proposta de valor da plataforma._
_Ref. briefing: §6, §8, §10_

#### 2.1 "Mapa do Salão Lucrativo" como porta de entrada
- [ ] Novo tipo `"mapa"` no `produto-option-factory.ts`.
- [ ] Componente `MapaSalao/` — visualização interativa com pilares como regiões clicáveis.
- [ ] Indicadores visuais: onde o aluno está, próxima aula, dor sendo resolvida.
- [ ] Substituir lista de abas como home do aluno quando produto é tipo "Mapa".

#### 2.2 Múltiplos espaços/ambientes
- [ ] Campo `tipo` em Produto: `'academy' | 'metodo' | 'mapa'`.
- [ ] Menu lateral exibe apenas ambientes com acesso ativo.
- [ ] Expandir lógica em `src/states/usuario/index.ts` para redirecionar por tipo de ambiente.

#### 2.3 Onboarding ao vivo obrigatório
- [ ] Collection: `Onboardings` (usuario, produto, status, data_agendamento, data_realizacao).
- [ ] Tela de bloqueio: antes de acessar conteúdo, verificar se onboarding foi concluído.
- [ ] Interface de agendamento de onboarding com horários disponíveis.
- [ ] Conteúdo do onboarding: funcionamento, regras, expectativa de execução.

#### 2.4 Ferramentas interativas: DRE e Precificação
- [ ] Novo tipo `"ferramenta"` no `produto-option-factory.ts`.
- [ ] **Ferramenta DRE:** formulário de inputs financeiros → cálculo de indicadores (margem, ponto de equilíbrio) → visualização com gráficos.
- [ ] **Ferramenta Precificação:** calculadora de precificação de serviços (custos fixos, variáveis, margem) → tabela de preços.
- [ ] Collections: `DRE_Resultados`, `Precificacao_Resultados`.
- [ ] Ferramentas acessadas dentro da plataforma, sem download (conforme briefing §11.2).

---

### FASE 3: Mentorias e Presença (Semana 3-4)
_Prioridade ALTA — pilar central do modelo de negócio._
_Ref. briefing: §7_

#### 3.1 Integração Google Meet API
- [ ] Backend: OAuth2 com conta de serviço Google.
- [ ] Criação automática de links Meet para encontros agendados.
- [ ] Endpoint `GET /api/encontros/:id/meet-link`.
- [ ] Frontend: botão "Entrar na Aula" no `src/options/encontros/`.
- [ ] Collection: expandir `Encontros` com campo `meet_link`.

#### 3.2 Sistema de presença automática
- [ ] Check-in automático via webhook/polling do Meet ou botão "Estou Presente" com janela de tempo.
- [ ] Collection: `Presencas` (usuario, encontro, data, metodo_checkin, duracao).
- [ ] Trigger no repository que atualiza métricas do aluno ao registrar presença.
- [ ] Registro automático de presença (conforme briefing §7).

#### 3.3 Histórico e listagem de mentorias
- [ ] Expandir `OptionEncontrosProduto` com aba "Histórico".
- [ ] Listar encontros passados com: data, duração, presença, gravação.
- [ ] Separar "Próximos" e "Anteriores" usando componente `Abas` existente.

#### 3.4 Relatórios de ausência + contato ativo
- [ ] Nova aba admin com filtro de alunos ausentes (sem presença nas últimas N aulas).
- [ ] Botão "Entrar em Contato" → notificação/email ao aluno.
- [ ] Collection: `Alertas` (usuario, tipo, mensagem, status, data).
- [ ] Identificar alunos em risco para contato ativo (conforme briefing §7).

---

### FASE 4: Metrificação e Dossiê Completo (Semana 4-5)
_Prioridade ALTA — base para cobrança, acompanhamento e renovação._
_Ref. briefing: §3, §4, §5_

#### 4.1 Sistema de metrificação de progresso
- [ ] Collection: `MetricasAluno` (usuario, produto, metricas, pontuacao_total).
- [ ] Métricas calculadas: aulas assistidas (%), presença ao vivo, interações com IA, resultados práticos, anotações.
- [ ] **Pontuação ponderada** (briefing §4.1): Presença peso 1, Interação peso 2, Resultado prático peso 5.
- [ ] Backend: endpoint `GET /api/metricas/:usuarioId` com agregação.
- [ ] Widget de progresso reutilizável em `src/components/organisms/`.

#### 4.2 Dossiê completo do aluno (Diário de Bordo)
- [ ] Expandir dossiê existente (`dossie.ts`) com novas abas.
- [ ] **Situação Inicial:** formulário com faturamento ao entrar, nº funcionários, etc.
- [ ] **Timeline:** cronologia completa de todas as atividades (aulas, presenças, ferramentas, anotações).
- [ ] **Evolução:** gráfico de faturamento/indicadores ao longo do tempo.
- [ ] **Métricas:** dashboard com pontuação, progresso e ranking.
- [ ] Collections: `DiarioBordo`, `Evolucoes`, `Atividades`.
- [ ] Base para argumentação em casos de cancelamento ou renovação (briefing §3.3).

#### 4.3 Dashboard com métricas por trilha
- [ ] Barra de progresso por etapa no `RoadmapDiagram`.
- [ ] Componente `DashboardProgress/`: progresso geral (%), próxima aula recomendada, dias sem atividade, pontuação total.
- [ ] Superar limitação atual de apenas % de conclusão (briefing §3.2).

---

### FASE 5: Inteligência Artificial Avançada (Semana 5-6)
_Prioridade MÉDIA-ALTA — diferencial competitivo._
_Ref. briefing: §11_

#### 5.1 Algoritmo de extração de dores via IA
- [ ] Backend: serviço que recebe transcrição da chamada de venda.
- [ ] Uso de LLM para extrair: dores principais, pilares relacionados, nível de urgência.
- [ ] Endpoint: `POST /api/ai/extrair-dores`.
- [ ] Collection: `DoresExtraidas` (usuario, dores[], pilares_relacionados[]).

#### 5.2 Geração automática de trilha personalizada
- [ ] Algoritmo que mapeia dores → aulas/módulos específicos via relações Pilar → Módulo → Aula.
- [ ] Ordenação por prioridade baseada nas dores extraídas.
- [ ] Collection: `TrilhasPersonalizadas` (usuario, dores_base, etapas[], status).
- [ ] Interface "Sua Trilha Personalizada" como nova Option.

#### 5.3 Interface "Adicionar Trilha"
- [ ] Catálogo de trilhas pré-configuradas por pilar.
- [ ] Botão "Adicionar à Minha Jornada".
- [ ] Navegação entre trilhas ativas do aluno.

#### 5.4 RAG — Busca inteligente no conteúdo das aulas
- [ ] Backend: indexar transcrições de aulas em vector store (embeddings).
- [ ] Endpoint: `POST /api/ai/busca` com semantic search.
- [ ] Retornar trechos relevantes com link para momento exato da aula.
- [ ] Integrar no chatbot existente: modo "buscar no conteúdo" com cards de aula clicáveis.

---

### FASE 6: Gamificação e Engajamento (Semana 6-7)
_Prioridade MÉDIA — aumenta retenção._
_Ref. briefing: §4.2_

#### 6.1 Ranking e gamificação
- [ ] Collections: `Medalhas`, `MedalhasAluno`, `Niveis`.
- [ ] Leaderboard: ranking baseado em execução e resultado, não horas assistidas (briefing §4.2).
- [ ] Medalhas com critérios automáticos (triggers no repository).
- [ ] Componentes: `Ranking/` (leaderboard) e `Medalhas/` (vitrine de conquistas).
- [ ] Nova Option "Ranking" no produto.

#### 6.2 Sistema de níveis
- [ ] Progressão: Iniciante → Aprendiz → Praticante → Expert → Mestre.
- [ ] Visual no perfil do aluno e no ranking.
- [ ] Premiações consideram: evolução real, transformação do negócio, aumento de faturamento (briefing §4.2).

---

### FASE 7: Ferramentas Operacionais (Semana 7-8)
_Prioridade MÉDIA-BAIXA — otimização operacional._
_Ref. briefing: §13_

#### 7.1 Extensão de navegador para consultores
- [ ] Chrome Extension: inserir valor personalizado → gerar link de checkout validado.
- [ ] Backend: endpoint `POST /api/admin/gerar-link-checkout`.
- [ ] Autenticação via token de admin.

#### 7.2 Pagamentos variáveis avançados
- [ ] Suporte a: parcelamento, boleto com vencimento customizado, PIX.
- [ ] Admin pode criar condições especiais por aluno.
- [ ] Integração com financeiro para boletos e validação (briefing §13).

---

### FASE 8: Refino, QA e Lançamento (Semana 8-9)
_Foco: Estabilidade, testes e deploy._

- [ ] Refino de UI/UX (CSS, animações, responsividade).
- [ ] Configurar suite de testes E2E (Playwright ou Cypress).
- [ ] Testes do fluxo crítico: checkout → cadastro → onboarding → aula → presença.
- [ ] Ajustes de bugs e otimização de performance.
- [ ] Configurar CI/CD (GitHub Actions).
- [ ] Deploy e lançamento oficial.
- [ ] Treinamento de uso da plataforma e homologação final.

---

### Novas Collections Necessárias

| Collection | Fase | Campos Principais |
|---|---|---|
| `Pagamentos` | 1.1 | usuario, produto, valor, status, metodo, gateway_id |
| `Cupons` | 1.1 | codigo, percentual, ativo, validade |
| `Contratos` | 1.3 | usuario, cpf, data_aceite, texto_contrato |
| `Onboardings` | 2.3 | usuario, produto, status, data_realizacao |
| `DRE_Resultados` | 2.4 | usuario, dados_financeiros, indicadores |
| `Precificacao_Resultados` | 2.4 | usuario, custos, margens, tabela_precos |
| `Presencas` | 3.2 | usuario, encontro, data, metodo_checkin |
| `Alertas` | 3.4 | usuario, tipo, mensagem, status |
| `MetricasAluno` | 4.1 | usuario, produto, metricas, pontuacao_total |
| `DiarioBordo` | 4.2 | usuario, situacao_inicial, data_entrada |
| `Evolucoes` | 4.2 | usuario, faturamento, data, observacoes |
| `Atividades` | 4.2 | usuario, tipo, descricao, data, pontos |
| `DoresExtraidas` | 5.1 | usuario, dores[], pilares_relacionados[] |
| `TrilhasPersonalizadas` | 5.2 | usuario, dores_base, etapas[], status |
| `Medalhas` | 6.1 | titulo, criterio, pontos, icon |
| `MedalhasAluno` | 6.1 | usuario, medalha, data_conquista |
| `Niveis` | 6.2 | nome, pontos_minimos, beneficios |

---

### Riscos e Mitigações

1. **Socket.io só aceita admin** — `server.js` rejeita conexões de não-admin. Para presença em tempo real, criar namespace separado para alunos.
2. **`produto-option-factory.ts` como gargalo** — todo novo tipo de conteúdo passa pelo `switch` deste arquivo. Considerar refatorar para registro dinâmico antes de adicionar muitos tipos.
3. **Sem testes** — qualquer refatoração é arriscada. Iniciar testes E2E em paralelo com a Fase 1.
4. **IndexedDB versioning** — muitas collections novas exigem cuidado com upgrades sequenciais em browsers reais.
5. **Repository com `any`** — métodos usam `any` extensivamente, o que pode causar bugs silenciosos. Adicionar generics progressivamente.

---

### Arquivos Críticos para Implementação

| Arquivo | Razão |
|---|---|
| `src/options/produto-option-factory.ts` | Gateway para toda nova funcionalidade do aluno (cada novo tipo passa pelo switch) |
| `server.js` | Backend principal — novas rotas (checkout, webhooks, métricas, AI) |
| `src/states/usuario/index.ts` | Ponto de entrada do aluno — controle de acesso, onboarding, redirecionamento |
| `src/features/assinatura/featureInterface.ts` | Interface que precisa ser expandida (status, datas, pagamento) |
| `src/repository/sync.ts` | Sincronização que precisa suportar novas collections |
| `src/repository/IndexedDB/config.ts` | Registro de novas stores do IndexedDB |
