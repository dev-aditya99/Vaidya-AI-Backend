import crypto from "crypto";

const createUniqueUserID = async (first_name, last_name, email) => {
    try {
        // Creating a unique string
        const currentTime = new Date().getTime();
        const uniqueString = `${first_name}${last_name}${currentTime}${email}`;

        // Generate a hash-like short string
        const hash = crypto.createHash('sha256').update(uniqueString).digest('hex');

        // Shorten the hash for user id
        const shortHash = hash.substring(0, 8); // 8 characters is a good balance for uniqueness

        // Combine VaidyaAI + first name with the hash
        const userID = "VaidyaAI_" + `${first_name}_${shortHash}`.toLowerCase();

        return userID;
    } catch (error) {
        console.error("Error During Creating a Unique User Id: ", error);
        throw new Error("Failed to create a unique User Id");
    }
};

export default createUniqueUserID;
