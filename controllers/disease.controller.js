import geminiFirstAid from "../utils/geminiFirstAid.js";
import geminiImageText from "../utils/geminiImageText.js";
import geminiSymptomsToDisease from "../utils/geminiSymptomsToDisease.js";

export const scanDisease = async (req, res) => {
    try {
        // distructing the files from req.files 
        const { image } = req.files;

        // distructing the data from req.body 
        const { description, geoLocation } = req.body;

        // if image not 
        if (!image) {
            return res.status(400).json({ error: "Image Unavailable" })
        }

        const imageName = "disease_image.jpg"

        // define an destination 
        const destination = "./public/disease/images/" + imageName;

        image.mv(
            destination,
            async (error) => {
                if (error) {
                    rej({
                        msg: "Unable to create product due to image can't uploading!",
                        status: 0
                    })
                    return res.status(400).json({ error: "Unable to upload image" })
                } else {
                    const response = await geminiImageText(destination, description, geoLocation)
                    res.status(201).json({ response })
                }
            }
        )

    } catch (error) {
        console.error("Error in scanDisease : ", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

// symptoms analyzer 
export const symptomsAnalyzer = async (req, res) => {
    try {
        // distructing the data from req.body 
        const { symptomsData, geoLocation } = req.body;

        if (symptomsData) {
            const response = await geminiSymptomsToDisease({ symptomsData, geoLocation })
            res.status(201).json({ response })
        } else {
            res.status(201).json({ error: "No Symptoms Provided" })
        }

    } catch (error) {
        console.error("Error in symptomsAnalyzer : ", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

// find first aid 
export const findFirstAid = async (req, res) => {
    try {
        // distructing the data from req.body 
        const { diseaseData, geoLocation } = req.body;

        if (diseaseData) {
            const response = await geminiFirstAid({ diseaseData, geoLocation })
            res.status(201).json({ response })
        } else {
            res.status(201).json({ error: "No Symptoms Provided" })
        }

    } catch (error) {
        console.error("Error in symptomsAnalyzer : ", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}