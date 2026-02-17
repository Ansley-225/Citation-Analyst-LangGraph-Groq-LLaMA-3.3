import { StateGraph, START, END } from "@langchain/langgraph";
import { State } from "./state.js";
import { llm_analyse_faute, cherche_auteur, agregateur } from "./noeuds.js";

const workflow = new StateGraph(State)
  .addNode("llm_analyse_faute", llm_analyse_faute)
  .addNode("cherche_auteur", cherche_auteur)
  .addNode("agregateur", agregateur)
  .addEdge(START, "llm_analyse_faute")
  .addEdge("llm_analyse_faute", "cherche_auteur")
  .addEdge("cherche_auteur", "agregateur")
  .addEdge("agregateur", END);

export const graph = workflow.compile();
//  ======== la citation a cherché =========
const resultatFinal = await graph.invoke({
  citation: "Le bonheure est l'abscence de lutte.",
});
// ==============================================

console.log("--- HISTOIRE ET AUTEUR ---");
console.log(resultatFinal.sortieCombine);

console.log("--- ÉTAPES DE TRAITEMENT ---");
console.log(resultatFinal.resultats);
