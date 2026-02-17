import { sortieStructure, llm } from "./llm.js";
import { State } from "./state.js";

export const llm_analyse_faute = async (state: typeof State.State) => {
  const reponse = await sortieStructure.invoke([
    {
      role: "system",
      content:
        "Tu es un expert en orthographe, conjugaison et grammaire. Corrige la citation fournie.",
    },
    {
      role: "human",
      content: `Citation : ${state.citation}`,
    },
  ]);
  return {
    correction: reponse.correction,
    resultats: [reponse.correction],
  };
};

export const cherche_auteur = async (state: typeof State.State) => {
  const dernierCorrection = state.correction;
  const reponse = await sortieStructure.invoke([
    {
      role: "system",
      content:
        "Tu es un expert en littérature. Identifie l'auteur de cette citation. Réponds uniquement via le champ 'auteur'.",
    },
    {
      role: "human",
      content: dernierCorrection,
    },
  ]);
  return {
    auteur: reponse.auteur,
    resultats: [reponse.auteur],
  };
};

export const agregateur = async (state: typeof State.State) => {
  const prompt = `la citation est ${state.citation} l auteur est ${state.auteur} racontre une brève histoire sur la citation et l auteur . si la citation et l auteur n existe pas dit simplement que tu n'apas d'information sur cette citation sans rien ajouter `;
  const reponse = await llm.invoke(prompt);
  return { sortieCombine: reponse.content as string };
};
