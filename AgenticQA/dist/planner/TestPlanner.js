export class TestPlanner {
    generate(pageType) {
        switch (pageType) {
            case "Login":
                return [
                    {
                        id: "LOGIN_001",
                        title: "Verify valid login",
                        description: "Verify that a user can login using valid credentials.",
                        priority: "Critical",
                        category: "Authentication"
                    },
                    {
                        id: "LOGIN_002",
                        title: "Verify invalid password",
                        description: "Verify error message for invalid password.",
                        priority: "High",
                        category: "Authentication"
                    },
                    {
                        id: "LOGIN_003",
                        title: "Verify blank username",
                        description: "Verify validation when username is blank.",
                        priority: "High",
                        category: "Validation"
                    }
                ];
            default:
                return [
                    {
                        id: "GEN_001",
                        title: "General Smoke Test",
                        description: "Verify page loads successfully.",
                        priority: "Medium",
                        category: "Smoke"
                    }
                ];
        }
    }
}
//# sourceMappingURL=TestPlanner.js.map