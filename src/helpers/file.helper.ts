import path from "path";
import fs from "fs";

export const saveFile = (filename: string, buffer: Buffer): string => {
    const folderPath = path.join(__dirname, '../uploads'); // Folder where files will be saved
    if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true }); // Create the folder if it doesn't exist
    }
    console.log(folderPath, 'folderPath');
    const filePath = path.join(folderPath, filename);
    fs.writeFileSync(filePath, buffer); // Write the file to the server

    return filename;
};