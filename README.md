# Ritmo

Primeira versão funcional para comparar a experiência de um app de musculação do casal.

## Experimentar

Abra `index.html` no navegador do computador. Não é necessário instalar dependências. O arquivo `ritmo.html` entregue separadamente contém a mesma interface e os mesmos fluxos.

Os planos A, B e C são exemplos editáveis, não uma prescrição individual. Os perfis, registros e treinos ficam somente no navegador utilizado. Eles não são compartilhados entre celulares. A troca de perfis é demonstrativa, sem autenticação.

## O que funciona

- Temas escuro, claro e do sistema.
- Dois perfis com nomes editáveis e históricos separados.
- Criação, edição, exclusão e duplicação de planos entre perfis.
- Dias da semana e reordenação dos exercícios.
- Registro por série de carga, repetições e observações.
- Recuperação do treino em andamento após recarregar.
- Cronômetro baseado em horário absoluto, pausa e extensão do descanso.
- Histórico imutável em relação a alterações posteriores nos planos.
- Última carga por exercício e pessoa.
- Resumo semanal calculado com registros reais, sem progresso inventado.
- Exportação dos dados em JSON.

## Hospedagem na Vercel

Este projeto é estático e não precisa de build. Coloque os arquivos desta pasta na raiz de um repositório GitHub e importe esse repositório na Vercel, usando o preset Other, sem comando de build e diretório de saída raiz (`.`). O arquivo `vercel.json` contém a configuração complementar. Nenhuma conta ou serviço foi conectado nesta entrega.

Para prévia local por HTTP: `python3 -m http.server 3000` nesta pasta. O aplicativo também abre diretamente como arquivo, mas instalação PWA e service worker precisam de hospedagem HTTPS.

O manifesto, os ícones e o service worker estão incluídos. Depois de hospedar, abra o endereço no Safari do iPhone e use Compartilhar → Adicionar à Tela de Início. Não foi realizado teste em um dispositivo iPhone físico. O cronômetro recalcula o tempo ao voltar ao aplicativo; não promete alertas sonoros nem execução contínua com a tela bloqueada.

## Próxima etapa: Supabase

A integração com Supabase ainda não está implementada. Antes de usar em dois aparelhos: autenticação individual, espaço compartilhado do casal, tabelas de membros/planos/exercícios/sessões/séries e RLS limitando acesso ao casal. As permissões devem ser garantidas no banco; a troca de perfil desta demonstração não é um mecanismo de segurança.

A camada local está concentrada nas funções `load`, `save` e no objeto `state`. Migrar para repositórios de dados assíncronos na integração, preservando os snapshots do histórico. Nunca inserir a chave service_role no frontend.

## Dados e limitações

Limpar os dados do navegador apaga os registros. A exportação JSON permite guardar uma cópia; esta versão não inclui importador. A duração mede o tempo entre iniciar e finalizar a sessão, incluindo pausas e tempo com o aplicativo fechado. Fontes externas são opcionais; na ausência de internet são usadas fontes do sistema.

Implementação em HTML, CSS e JavaScript nativos, sem dependências de execução. Nome e identidade visual provisórios.
