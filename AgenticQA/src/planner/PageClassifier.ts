import type { PageModel } from "../models/PageModel.js";

export type PageType =
    | "Login"
    | "Dashboard"
    | "Form"
    | "Search"
    | "Table"
    | "Unknown";

export class PageClassifier {

    classify(model: PageModel): PageType {

        const hasPassword = model.inputs.some(
            input => input.type === "password"
        );

        if (
            hasPassword &&
            model.inputs.length >= 2 &&
            model.buttons.length >= 1
        ) {
            return "Login";
        }

        if (
            model.forms.length > 0 &&
            model.inputs.length > 2
        ) {
            return "Form";
        }

        if (
            model.tables.length > 0
        ) {
            return "Table";
        }

        return "Unknown";
    }

}