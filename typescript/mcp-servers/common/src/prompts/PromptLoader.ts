import { readFileSync } from 'fs';
import { parse } from 'yaml';
import { resolve } from 'path';

interface PromptTemplate {
  title: string;
  description: string;
  user_message: string;
}

interface PromptConfig {
  [key: string]: PromptTemplate;
}

export class PromptLoader {
  private static instances: Map<string, PromptLoader> = new Map();
  private prompts: PromptConfig;

  private constructor(yamlPath: string) {
    const fileContents = readFileSync(yamlPath, 'utf8');
    this.prompts = parse(fileContents);
  }

  /**
   * Get a PromptLoader instance for the specified YAML file.
   * @param yamlFilePath - Absolute or relative path to the YAML prompts file
   * @returns PromptLoader instance
   */
  static getInstance(yamlFilePath: string): PromptLoader {
    const resolvedPath = resolve(yamlFilePath);
    
    if (!PromptLoader.instances.has(resolvedPath)) {
      PromptLoader.instances.set(resolvedPath, new PromptLoader(resolvedPath));
    }
    return PromptLoader.instances.get(resolvedPath)!;
  }

  getPrompt(key: string): PromptTemplate {
    const prompt = this.prompts[key];
    if (!prompt) {
      throw new Error(`Prompt template '${key}' not found`);
    }
    return prompt;
  }

  renderMessage(template: string, variables: Record<string, string>): string {
    return template.replace(/\{\{(\w+)\}\}/g, (_, key) => variables[key] || '');
  }
}
