import { createUserContent, GoogleGenAI } from "@google/genai";
import dotenv from "dotenv"
dotenv.config()

const api_key = process.env.GEMINI_API_KEY;

const ai = new GoogleGenAI({ apiKey: api_key })

const geminiFirstAid = async ({ diseaseData, geoLocation }) => {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash",
            contents: [
                createUserContent([
                    `Analyze the provided symptoms or disease and give the First Aid and if any emergency then give the Nearest available Hospital details with low traffic routes. These are the symptoms ${diseaseData} and this is user's geo location ${geoLocation}`,
                ])
            ],
            config: {
                systemInstruction: "You are a Indian Female AI Healthcare Assistant. Your name is Vaidya, and you have knowledge about in every medical field and ayurveda. You give Home Remedies, Suggestions, Precautions, Disease Details, Disease Danger Level (Normal, Moderate, Emergency), First Aid, by analyzing Provided Symptoms or Disease Images uploaded by user."
            }

        });

        return response.text;

    } catch (error) {
        console.log(error.message);
        return error
    }
}

export default geminiFirstAid;