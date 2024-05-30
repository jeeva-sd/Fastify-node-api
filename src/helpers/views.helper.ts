import * as fs from 'fs';
import * as path from 'path';

interface TemplateParams {
    [key: string]: string;
}

export const readHtml = (templateName: string, params?: TemplateParams) => {
    const templatePath = path.resolve(__dirname, `../views/email/${templateName}.html`);
    const baseTemplatePath = path.resolve(__dirname, `../views/email/baseTemplate.html`);

    // Read contents of the base template and specific template
    const baseTemplateContent = fs.readFileSync(baseTemplatePath, 'utf-8');
    let specificTemplateContent = fs.readFileSync(templatePath, 'utf-8');

    // Merge content by replacing a placeholder in the base template with the content of the specific template
    let mergedTemplate = baseTemplateContent.replace('{{body-content}}', specificTemplateContent);

    if (params) {
        // Replace placeholders with corresponding values
        Object.keys(params).forEach(key => {
            const regex = new RegExp(`{{${key}}}`, 'g');
            mergedTemplate = mergedTemplate.replace(regex, params[key]);
        });
    }

    return mergedTemplate;
};
