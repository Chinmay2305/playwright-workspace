import { PageClassifier } from "./PageClassifier.js";
import { TestPlanner } from "./TestPlanner.js";
export class Planner {
    classifier = new PageClassifier();
    planner = new TestPlanner();
    plan(model) {
        const pageType = this.classifier.classify(model);
        return this.planner.generate(pageType);
    }
}
//# sourceMappingURL=Planner.js.map