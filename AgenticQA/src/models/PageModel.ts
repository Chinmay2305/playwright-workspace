export interface PageLink {
    text: string;
    href: string;
    visible: boolean;
}

export interface PageButton {
    text: string;
    id: string;
    visible: boolean;
}

export interface PageInput {
    name: string;
    type: string;
    placeholder: string;
    required: boolean;
}

export interface PageImage {
    src: string;
    alt: string;
}

export interface PageForm {
    action: string;
    method: string;
}

export interface PageTable {
    rows: number;
    columns: number;
}

export interface PageModel {

    // Metadata
    timestamp: string;

    title: string;

    url: string;

    buttons: PageButton[];

    links: PageLink[];

    inputs: PageInput[];

    images: PageImage[];

    forms: PageForm[];

    tables: PageTable[];

}