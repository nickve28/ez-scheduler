export type DirectoryConfig = {
    directory_pattern: string;
    output_directory: string;
    file_pattern: string;
}

type BaseAccountConfig = {
    version: number;
    type: "Twitter" | "DeviantArt";
    api_key: string;
    api_key_secret: string;
    content_settings: unknown;
}

type DeviantArtConfig = BaseAccountConfig & {
    type: "DeviantArt";
    content_settings: {
        folders: [
            { 
                id: string;
                name: string;
            }
        ]
    }
}

type TwitterConfig = BaseAccountConfig & {
    type: "Twitter";
    content_settings: {
        caption_template: string;
        interpolations: {
            random: {
                type: "random";
                options: string[];
            }
        }
    }
}

export type AccountConfig = TwitterConfig | DeviantArtConfig




