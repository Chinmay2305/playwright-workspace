import type { PageModel } from "../models/PageModel.js";
import { PageClassifier } from "./PageClassifier.js";
import { TestPlanner } from "./TestPlanner.js";
import type { TestIdea } from "./TestIdea.js";

export class Planner {

    private readonly classifier =
        new PageClassifier();

    private readonly planner =
        new TestPlanner();

    plan(model: PageModel): TestIdea[] {

        const pageType =
            this.classifier.classify(model);

        return this.planner.generate(pageType);

    }

}