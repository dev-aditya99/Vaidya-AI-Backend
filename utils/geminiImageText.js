import { createPartFromUri, createUserContent, GoogleGenAI } from "@google/genai";
import dotenv from "dotenv"
dotenv.config()

const api_key = process.env.GEMINI_API_KEY;

const ai = new GoogleGenAI({ apiKey: api_key })

const geminiImageText = async ({ image: disease_image, description, geoLocation }) => {
    try {
        const image = await ai.files.upload({
            file: "./public/disease/images/disease_image.jpg"
        })

        const response = await ai.models.generateContentStream({
            model: "gemini-2.0-flash",
            contents: [
                createUserContent([
                    `Analyze the image and find the disease, and give details about it. And give Home Remedies, Precautions & Safety, Disease Danger Level (Normal, Moderate, Emergency), Suggestions, First Aid if any emergency. Also give the Nearest available Hospital details with low traffic routes. This is the user's geo location ${geoLocation}. ${description ? `Please also consider this ${description}` : ""}`,
                    createPartFromUri(image.uri, image.mimeType)
                ])
            ],
            // contents: "Hi Vaidya!, Please tell me, what you can do?",
            config: {
                systemInstruction: "You are a Indian Female AI Healthcare Assistant. Your name is Vaidya, and you have knowledge about in every medical field and ayurveda. You give Home Remedies, Suggestions, Precautions, Disease Details, Disease Danger Level (Normal, Moderate, Emergency), First Aid, by analyzing Symptoms or Disease Images uploaded by user."
            }

        });
        let data = ""
        for await (const chunk of response) {
            console.log(chunk.text);
            data = data + chunk.text
        }
        return data;

    } catch (error) {
        console.log(error.message);
        return error
    }
}

export default geminiImageText;