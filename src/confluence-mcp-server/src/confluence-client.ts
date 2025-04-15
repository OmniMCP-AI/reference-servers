import createClient, { Client } from "openapi-fetch";
import type { paths } from '../src/client.js'

export type ConfluenceClientOptions = {
  confluenceUrl: string;
  apiToken: string;
  email: string;
};

export class ConfluenceClient {
  private client: Client<paths>;

  constructor(
    options: ConfluenceClientOptions,
  ) {
    this.client = createClient<paths>({
      baseUrl: options.confluenceUrl,
      headers: {
        'Authorization': `Basic ${Buffer.from(`${options.email}:${options.apiToken}`).toString('base64')}`,
        'Content-Type': 'application/json',
      },
    })
  }

  async getPage(pageId: string): Promise<string> {
    const response = await this.client.GET('/pages/{id}', {
      params: {
        path: {
          id: Number(pageId),
        },
        query: {
          "body-format": "view"
        }
      }
    });

    if (response.error) {
      throw new Error(`Failed to get page: ${response.error}`);
    }

    return response.data?.body?.view?.value || "";
  }

  async getPages(): Promise<paths["/pages"]["get"]["responses"][200]["content"]["application/json"]['results']> {
    const response = await this.client.GET('/pages');

    if (response.error) {
      throw new Error(`Failed to get pages: ${response.error}`);
    }

    return response.data?.results || [];
  }

  async getPagesInSpace(spaceId: string, query: {
    title?: string,
  }): Promise<paths["/spaces/{id}/pages"]["get"]["responses"][200]["content"]["application/json"]['results']> {
    const response = await this.client.GET('/spaces/{id}/pages', {
      params: {
        path: {
          id: Number(spaceId),
        },
        query: {
          title: query.title,
          limit: 10,
        }
      },
    })

    if (response.error) {
      throw new Error(`Failed to get pages in space: ${response.error}`);
    }

    return response.data?.results || [];
  }

  async getSpaces({
    spaceKeys,
  }: {
    spaceKeys?: string[];
  }): Promise<paths["/spaces"]["get"]["responses"][200]["content"]["application/json"]['results']> {
    const response = await this.client.GET('/spaces', {
      params: {
        query: {
          keys: spaceKeys,
        }
      }
    });
    if (response.error) {
      throw new Error(`Failed to get spaces: ${response.error}`);
    }
    return response.data?.results || [];
  }

  async createPage(body: {
    title: string;
    content: string;
    parentId: string;
    spaceId: string;
  }): Promise<paths["/pages"]["post"]["responses"][200]["content"]["application/json"]['id']> {
    const response = await this.client.POST(`/pages`, {
      body: {
        status: 'current',
        spaceId: body.spaceId,
        title: body.title,
        parentId: body.parentId,
        body: {
          representation: "storage",
          value: body.content,
        }
      }
    });

    if (response.error) {
      throw new Error(`Failed to create page: ${response.error}`);
    }

    return response.data?.id || "";
  }
}