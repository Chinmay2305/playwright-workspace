export interface ButtonInfo {
    text: string;
    id: string;
    role: string;
    visible: boolean;
    enabled: boolean;
    locator: string;
}

export interface LinkInfo {
    text: string;
    href: string;
    visible: boolean;
}

export interface InputInfo {
    name: string;
    type: string;
    placeholder: string;
    required: boolean;
    visible: boolean;
}